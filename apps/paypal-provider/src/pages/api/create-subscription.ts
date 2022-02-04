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

  const { currency, amount } = await getIntent({ id: intent });

  const productBody = {
    name: 'name',
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

  const planBody = {
    product_id: id,
    name: 'plan',
    billing_cycles: [
      {
        frequency: {
          interval_unit: 'YEAR',
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        pricing_scheme: {
          fixed_price: {
            value: '10',
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

  console.log(planId);

  logger.info(`Created PayPal product : ${id} for payment: ${intent}`);
  const { id: orderId } = await insertOrder({
    external_id: id,
    payment_intent_id: intent,
    payment_provider_id: config.APP_ID,
    state: status,
    metadata: JSON.stringify({
      currency_code: currency,
      value: amount.toString(),
    }),
  });

  logger.info(`Added order ${orderId} for payment intent: ${intent}`);

  res.status(200).json({ id: id });
}
