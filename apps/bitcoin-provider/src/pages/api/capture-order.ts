import config from 'config/constants';
import updateOrder from '../../graphql/backend/updateOrder';

export default async function handler(req, res) {
  await updateOrder({
    state: req.body.status,
    external_id: req.body.id,
    payment_provider_id: config.APP_ID,
  });

  res.status(200).json({});
}
