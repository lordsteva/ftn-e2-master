import { Request, Response } from 'express';
import config from '../../../config/constants';
import generatePaymentintent from '../../../graphql/generatePaymentintent';
import getOrderStatusFromPSP from '../../../graphql/getOrderStatusFromPSP';
import updateOrderPaymentIntent from '../../../graphql/updateOrderPaymentIntent';
import updateOrderStatus from '../../../graphql/updateOrderStatus';

export const createPaymentIntent = async (req: Request, resp: Response) => {
  // TODO use provided data
  const { amount, currency, order_id } = req.body.input.data;
  // TODO: update urls, move to constants
  const success_url = 'http://localhost:3001/success';
  const fail_url = 'http://localhost:3001/fail';
  const { link } = await generatePaymentintent({
    amount: `${amount}`,
    currency: 'USD',
    api_key: config.PSP_API_KEY,
    api_secret: config.PSP_API_SERET,
    fail_url,
    success_url,
  });

  await updateOrderPaymentIntent({ id: order_id, payment_intent_id: link });

  return resp.json({
    link,
  });
};

export const finalizePaymentIntent = async (req: Request, resp: Response) => {
  const { payment_intent_id } = req.body.input.data;

  const { state } = await getOrderStatusFromPSP({ payment_intent_id });

  await updateOrderStatus({ payment_intent_id, status: state });

  return resp.json({
    ok: true,
  });
};
