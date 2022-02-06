import { Request, Response } from 'express';
import config from '../../../config/constants';
import generatePaymentintent from '../../../graphql/generatePaymentintent';
import getOrderStatusFromPSP from '../../../graphql/getOrderStatusFromPSP';
import updateOrderPaymentIntent from '../../../graphql/updateOrderPaymentIntent';
import updateOrderStatus from '../../../graphql/updateOrderStatus';
import logger from '../../../logger/logger';

export const createPaymentIntent = async (req: Request, resp: Response) => {
  // TODO use provided data
  const { amount, currency, order_id } = req.body.input.data;
  // TODO: update urls, move to constants
  const success_url = 'https://localhost:3001/success';
  const fail_url = 'https://localhost:3001/fail';
  const error_url = 'https://localhost:3001/error';

  logger.info(`Creating payment intent for order: ${order_id}`);
  const { link } = await generatePaymentintent({
    amount: `${amount}`,
    currency: 'USD',
    api_key: config.PSP_API_KEY,
    api_secret: config.PSP_API_SERET,
    fail_url,
    error_url,
    success_url,
  });

  await updateOrderPaymentIntent({ id: order_id, payment_intent_id: link });
  logger.info(`Setting payment intent for order: ${order_id} to ${link}`);

  return resp.json({
    link,
  });
};

export const finalizePaymentIntent = async (req: Request, resp: Response) => {
  const { payment_intent_id } = req.body.input.data;

  const { state } = await getOrderStatusFromPSP({ payment_intent_id });

  const { id } = await updateOrderStatus({ payment_intent_id, status: state });
  logger.info(`Setting order status for order: ${id} to ${state}`);

  return resp.json({
    ok: true,
  });
};
