import config from '../../config/constants';
import createPayment from '../../graphql/backend/createPayment';
import getMerchant from '../../graphql/backend/getMerchant';

type paymentIntent = {
  merchant_id: string;
  merchant_pass: string;
  amount: number;
  merchant_order_id: string;
  merchant_timestamp: string;
  success_url: string;
  failed_url: string;
  error_url: string;
};

export default async function handler(req, res) {
  const intent: paymentIntent = JSON.parse(req.body);
  const exists = await getMerchant({
    merchantId: intent.merchant_id,
    merchantPass: intent.merchant_pass,
  });
  if (!exists) {
    res.status(404).json({});
  } else {
    const id = await createPayment({ payment: intent });
    console.log(id);
    res.status(200).json({ payment_id: id, payment_url: `${config.HOST_ADDRESS}/pay/${id}` });
  }
}
