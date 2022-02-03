import config from 'config/constants';
import upsertApiProviderLink from 'graphql/backend/upsertApiProviderLink';
import logger from '../../logger/logger';

export default async function handler(req, res) {
  const { coingateToken, api_key_id } = JSON.parse(req.body);
  const metadata = JSON.stringify({ coingateToken });
  await upsertApiProviderLink({
    metadata,
    api_key_id,
    payment_provider_id: config.APP_ID,
  });
  logger.info(`Upadated client info for coingateToken ${coingateToken}`);
  res.status(200).json({ api_key_id });
}
