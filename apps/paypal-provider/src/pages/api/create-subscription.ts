import config from 'config/constants';
import getIntent from 'graphql/backend/getIntent';
import getPaymentClientMetadata from 'graphql/backend/getPaymentClientMetadata';
import insertOrder from 'graphql/backend/insertOrder';
import logger from '../../logger/logger';

export default async function handler(req, res) {
  const tokenUrl = `${config.PAY_PAL_BASE_URL}/v1/oauth2/token`;
  const { clientId, apiKey, intent } = JSON.parse(req.body);
  const metadata = await getPaymentClientMetadata({ api_key: apiKey, app_id: config.APP_ID });
  const { clientSecret } = JSON.parse(metadata ?? '{}');
  const headersAuth = new Headers();
  headersAuth.set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
  logger.info(`Getting authorization token for client ${clientId}`);

  const payPalresponse = await fetch(tokenUrl, {
    method: 'post',
    headers: headersAuth,
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });
  const { access_token } = await payPalresponse.json();

  const { currency, amount, unit, duration } = await getIntent({ id: intent });

  const productBody = {
    name: 'Course',
    type: 'DIGITAL',
  };
  const productUrl = `${config.PAY_PAL_BASE_URL}/v1/catalogs/products`;
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${access_token}`);
  headers.set('Content-Type', 'application/json');

  const product = await fetch(productUrl, {
    method: 'post',
    headers,
    body: JSON.stringify(productBody),
  });

  const { id } = await product.json();
  logger.info(`Created PayPal product : ${id} for payment: ${intent}`);

  const planBody = {
    product_id: id,
    name: 'plan',
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: {
        value: '0',
        currency_code: 'USD',
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 1,
    },
    billing_cycles: [
      {
        frequency: {
          interval_unit: unit,
          interval_count: 1,
        },
        total_cycles: duration,
        tenure_type: 'REGULAR',
        sequence: 1,
        pricing_scheme: {
          fixed_price: {
            value: amount,
            currency_code: 'USD',
          },
        },
      },
    ],
  };
  const planUrl = `${config.PAY_PAL_BASE_URL}/v1/billing/plans`;

  const plan = await fetch(planUrl, {
    method: 'post',
    headers,
    body: JSON.stringify(planBody),
  });

  const { id: planId } = await plan.json();

  logger.info(`Created PayPal plan : ${id} for payment: ${intent}`);

  const subUrl = `${config.PAY_PAL_BASE_URL}/v1/billing/subscriptions
  `;

  const sub = await fetch(subUrl, {
    method: 'post',
    headers,
    body: JSON.stringify({
      plan_id: planId,
    }),
  });
  const sRes = await sub.json();
  logger.info(`Created PayPal subscription : ${sRes.id} for payment: ${intent}`);

  const { id: orderId } = await insertOrder({
    external_id: id,
    payment_intent_id: intent,
    payment_provider_id: config.APP_ID,
    state: sRes.status,
    metadata: JSON.stringify({
      currency_code: currency,
      value: amount.toString(),
    }),
  });

  logger.info(`Added order ${orderId} for payment intent: ${intent}`);

  res.status(200).json({ id: sRes.id });
}
