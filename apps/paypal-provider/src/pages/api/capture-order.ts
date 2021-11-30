import config from 'config/constants';
import getPaymentClientMetadata from '../../graphql/backend/getPaymentClientMetadata';

export default async function handler(req, res) {
  const tokenUrl = `${config.PAY_PAL_BASE_URL}/v1/oauth2/token`;
  const { orderID, apiKey, clientId } = JSON.parse(req.body);
  const metadata = await getPaymentClientMetadata({ api_key: apiKey, app_id: config.APP_ID });
  const { clientSecret } = JSON.parse(metadata ?? '{}');
  const headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
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

  const ppIntent = await fetch(captureUrl, {
    method: 'post',
    headers: headersIntent,
  });

  const captured = await ppIntent.json();
  console.log(captured);
  // //TODO add to hasura

  res.status(200).json({});
}
