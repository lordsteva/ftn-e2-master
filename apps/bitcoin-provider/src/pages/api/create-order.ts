import config from 'config/constants';
import getIntent from 'graphql/backend/getIntent';
import getPaymentClientMetadata from 'graphql/backend/getPaymentClientMetadata';
import insertOrder from 'graphql/backend/insertOrder';
import updateExternalOrderId from 'graphql/backend/updateExternalOrderId';
import logger from '../../logger/logger';

export default async function handler(req, res) {
  const { apiKey, intent } = JSON.parse(req.body);
  const { amount, currency, success_url, fail_url } = await getIntent({
    id: intent,
  });
  const metadata = await getPaymentClientMetadata({ api_key: apiKey, app_id: config.APP_ID });
  const { coingateToken } = JSON.parse(metadata ?? '{}');
  const headers = new Headers();
  headers.set('Authorization', `Token ${coingateToken}`);
  headers.set('Content-Type', 'application/json');
  const { id: orderId } = await insertOrder({
    external_id: null,
    payment_intent_id: intent,
    payment_provider_id: config.APP_ID,
    state: 'CREATED',
    metadata: JSON.stringify({
      currency_code: currency,
      value: amount.toString(),
    }),
  });

  logger.info(`Added order : ${orderId} for payment: ${intent}`);

  const coingateresponse = await fetch(
    'https://api-sandbox.coingate.com/v2/orders',

    {
      method: 'post',
      headers,
      body: JSON.stringify({
        order_id: orderId,
        price_amount: amount,
        price_currency: 'USD',
        receive_currency: 'BTC',
        callback_url: `${process.env.NGROK}/api/capture-order`,
        cancel_url: `${fail_url}`,
        success_url: `${success_url}`,
      }),
    },
  );

  const coingateresponseJson = await coingateresponse.json();
  await updateExternalOrderId({ external_id: coingateresponseJson.id.toString(), id: orderId });
  logger.info(
    `Created CoinGate order : ${coingateresponseJson.id.toString()} for payment: ${intent}`,
  );

  res.status(200).json({ url: coingateresponseJson.payment_url });
}
