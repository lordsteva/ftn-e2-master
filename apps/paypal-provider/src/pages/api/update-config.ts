import config from 'config/constants';
import upsertApiProviderLink from 'graphql/backend/upsertApiProviderLink';

export default async function handler(req, res) {
  const { clientId, clientSecret, api_key_id } = JSON.parse(req.body);
  const metadata = JSON.stringify({ clientId, clientSecret });
  await upsertApiProviderLink({
    metadata,
    api_key_id,
    payment_provider_id: config.APP_ID,
  });

  res.status(200).json({ api_key_id });
}
