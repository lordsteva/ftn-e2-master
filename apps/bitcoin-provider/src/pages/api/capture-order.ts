import config from 'config/constants';
import updateOrder from '../../graphql/backend/updateOrder';
import logger from '../../logger/logger';

export default async function handler(req, res) {
  await updateOrder({
    state: req.body.status,
    external_id: req.body.id,
    payment_provider_id: config.APP_ID,
  });
  logger.info(`Updated CoinGate order : ${req.body.id} to: ${req.body.status}`);
  res.status(200).json({});
}
