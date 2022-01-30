import config from 'config/constants';
import upsertApiProviderLink from 'graphql/backend/upsertApiProviderLink';
import logger from 'logger/logger';

export default async function handler(req, res) {
  const { merchantId, merchantPass, bankId, api_key_id } = JSON.parse(req.body);
  const metadata = JSON.stringify({ merchantId, merchantPass, bankId });
  // TODO check with a bank
  await upsertApiProviderLink({
    metadata,
    api_key_id,
    payment_provider_id: config.APP_ID,
  });
  logger.info(`Upadated client info for merchantId ${merchantId}`);
  res.status(200).json({ api_key_id });
}
