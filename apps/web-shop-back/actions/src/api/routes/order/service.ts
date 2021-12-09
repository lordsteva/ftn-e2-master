import { Request, Response } from 'express';
import config from '../../../config/constants';
import generatePaymentintent from '../../../graphql/generatePaymentintent';

export const createPaymentIntent = async (req: Request, resp: Response) => {
  // TODO use provided data

  const { amount, currency } = req.body;
  // TODO: update urls, move to constants
  const fail_url = '';
  const success_url = '';
  const { link } = await generatePaymentintent({
    amount: '100',
    currency: 'USD',
    api_key: config.PSP_API_KEY,
    api_secret: config.PSP_API_SERET,
    fail_url,
    success_url,
  });
  return resp.json({
    link,
  });
};
