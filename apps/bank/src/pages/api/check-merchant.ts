import getMerchant from '../../graphql/backend/getMerchant';
export default async function handler(req, res) {
  const { merchantId, merchantPass } = JSON.parse(req.body);
  const exists = await getMerchant({ merchantId, merchantPass });
  if (!exists) res.status(404).json({});
  else res.status(200).json({});
}
