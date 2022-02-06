import { Request, Response } from 'express';
import config from '../../../config/constants';
import generatePaymentintent from '../../../graphql/generatePaymentintent';
import getOrderStatusFromPSP from '../../../graphql/getOrderStatusFromPSP';
import getWageFromPSP from '../../../graphql/getWageFromPSP';
import updateOrderPaymentIntent from '../../../graphql/updateOrderPaymentIntent';
import updateOrderStatus from '../../../graphql/updateOrderStatus';
import updateSubscriptionPaymentIntent from '../../../graphql/updateSubscriptionPaymentIntent';
import updateWagePaymentIntent from '../../../graphql/updateWagePaymentIntent';
import logger from '../../../logger/logger';

export const createPaymentIntent = async (req: Request, resp: Response) => {
  // TODO use provided data
  const { amount, currency, order_id, duration, unit } = req.body.input.data;
  // TODO: update urls, move to constants
  const success_url = 'https://localhost:3002/success';
  const fail_url = 'https://localhost:3002/fail';
  const error_url = 'https://localhost:3002/error';
  logger.info(`Creating payment intent for ${duration ? 'subscription' : 'order'}: ${order_id}`);
  const { link } = await generatePaymentintent({
    amount: `${amount}`,
    currency: 'USD',
    api_key: config.PSP_API_KEY,
    api_secret: config.PSP_API_SERET,
    fail_url,
    success_url,
    error_url,
    duration,
    unit,
  });

  if (duration) {
    await updateSubscriptionPaymentIntent({ id: order_id, payment_intent_id: link });
    logger.info(`Setting subscription intent for order: ${order_id} to ${link}`);
  } else {
    await updateOrderPaymentIntent({ id: order_id, payment_intent_id: link });
    logger.info(`Setting payment intent for order: ${order_id} to ${link}`);
  }
  return resp.json({
    link,
  });
};

export const finalizePaymentIntent = async (req: Request, resp: Response) => {
  const { payment_intent_id } = req.body.input.data;
  let state;

  state = (await getOrderStatusFromPSP({ payment_intent_id }))?.state;
  if (!state) state = (await getWageFromPSP({ payment_intent_id })).state;
  console.log(state);
  const { id } = await updateOrderStatus({ payment_intent_id, status: state });
  logger.info(`Setting order status for order: ${id} to ${state}`);

  return resp.json({
    ok: true,
  });
};

export const createWageIntent = async (req: Request, resp: Response) => {
  // TODO use provided data
  const { amount, currency, order_id } = req.body.input.data;
  // TODO: update urls, move to constants
  const success_url = 'https://localhost:3002/success';
  const fail_url = 'https://localhost:3002/fail';
  const error_url = 'https://localhost:3002/error';

  logger.info(`Creating for wage: ${order_id}`);
  const { link } = await generatePaymentintent({
    amount: `${amount}`,
    currency: 'USD',
    api_key: config.API_KEY_WAGE,
    api_secret: config.API_SECRET_WAGE,
    fail_url,
    success_url,
    error_url,
  });

  await updateWagePaymentIntent({ id: order_id, payment_intent_id: link });
  logger.info(`Setting wage intent for order: ${order_id} to ${link}`);

  return resp.json({
    link,
  });
};
