import config from 'config/constants';
import getIntent from '../../graphql/backend/getIntent';
import getPaymentClientMetadata from '../../graphql/backend/getPaymentClientMetadata';

export default async function handler(req, res) {
  const tokenUrl = `${config.PAY_PAL_BASE_URL}/v1/oauth2/token`;
  const { clientId, apiKey, intent } = JSON.parse(req.body);
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

  const { currency, amount } = await getIntent({ id: intent });

  const ppIntentBody = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toString(),
        },
        redirect_urls: {
          return_url: 'https://example.com/return',
          cancel_url: 'https://example.com/cancel',
        },
      },
    ],
  };
  const intentUrl = `${config.PAY_PAL_BASE_URL}/v2/checkout/orders`;
  const headersIntent = new Headers();
  headersIntent.set('Authorization', `Bearer ${access_token}`);
  headersIntent.set('Content-Type', 'application/json');

  const ppIntent = await fetch(intentUrl, {
    method: 'post',
    headers: headersIntent,
    body: JSON.stringify(ppIntentBody),
  });

  const createdIntet = await ppIntent.json();

  //TODO add to hasura

  res.status(200).json({ id: createdIntet.id });
}