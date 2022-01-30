import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import getApiKeyData from '../../../graphql/backend/getApiKeyData';
import insertPaymentIntent from '../../../graphql/backend/insertPaymentIntent';
import logger from '../../../logger/logger';

export default async (req: Request, res: Response): Promise<Response> => {
  const { data } = req.body.input;
  const { api_key, api_secret, amount, currency, success_url, fail_url, error_url } = data;

  logger.info(`Creating payment intent with api key:  ${api_key}`);
  const apiKeyData = await getApiKeyData(api_key);

  if (!apiKeyData || !apiKeyData.active || api_secret !== apiKeyData.api_secret) {
    logger.error(`Invalid api key:  ${api_key}`);
    return res.status(400).json({
      message: 'Invalid API key or secret',
    });
  }
  const id = uuidv4();
  const transactionData = {
    api_key,
    amount,
    currency,
    id,
    created_at: new Date().toISOString(),
    success_url: `${success_url}?payment_intent_id=${id}`,
    fail_url: `${fail_url}?payment_intent_id=${id}`,
    error_url: `${error_url}?payment_intent_id=${id}`,
  };

  await insertPaymentIntent(transactionData);
  logger.info(`Succesfully created payment intent ${transactionData.id} with api key:  ${api_key}`);
  return res.json({
    link: transactionData.id,
  });
};
