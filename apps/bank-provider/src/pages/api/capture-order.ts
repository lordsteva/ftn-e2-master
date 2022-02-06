import config from 'config/constants';
import updateOrder from 'graphql/backend/updateOrder';
import logger from '../../logger/logger';

export default async function handler(req, res) {
  const { status, paymentId, merchantOrderId } = JSON.parse(req.body);

  //TODO litit to CREATED orders
  const urls = await updateOrder({
    state: status,
    external_id: paymentId,
    payment_provider_id: config.APP_ID,
  });
  logger.info(`New status ${status} saved for order ${merchantOrderId}`);
  let url = urls.success_url;
  if (status === 'ERROR') {
    url = urls.error_url;
  }
  if (status === 'FAILED') {
    url = urls.fail_url;
  }
  res.status(200).json({ url });
}
