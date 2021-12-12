import config from 'config/constants';
import getPaymentClientMetadata from 'graphql/backend/getPaymentClientMetadata';
import updateOrder from 'graphql/backend/updateOrder';
import logger from '../../logger/logger';

export default async function handler(req, res) {
  const tokenUrl = `${config.PAY_PAL_BASE_URL}/v1/oauth2/token`;
  const { orderID, apiKey, clientId } = JSON.parse(req.body);
  const metadata = await getPaymentClientMetadata({ api_key: apiKey, app_id: config.APP_ID });
  const { clientSecret } = JSON.parse(metadata ?? '{}');
  const headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
  logger.info(`Getting authorization token for client ${clientId}`);
  const payPalresponse = await fetch(tokenUrl, {
    method: 'post',
    headers,
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });
  const { access_token } = await payPalresponse.json();

  const captureUrl = `${config.PAY_PAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`;
  const headersIntent = new Headers();
  headersIntent.set('Authorization', `Bearer ${access_token}`);
  headersIntent.set('Content-Type', 'application/json');
  logger.info(`Sending capture request for ${clientId} and PayPal order ${orderID}`);

  const ppIntent = await fetch(captureUrl, {
    method: 'post',
    headers: headersIntent,
  });

  const { id, status } = await ppIntent.json();
  logger.info(`New status for PayPal order ${orderID} is ${status}`);

  await updateOrder({ state: status, external_id: id, payment_provider_id: config.APP_ID });
  logger.info('New status saved');

  res.status(200).json({});
}
