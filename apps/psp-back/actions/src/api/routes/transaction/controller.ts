import getApiKeyData from '@src/graphql/getApiKeyData';
import insertPaymentIntent from '@src/graphql/insertPaymentIntent';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../../logger/logger';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  const { data } = req.body.input;
  const { api_key, api_secret, amount, currency, success_url, fail_url } = data;

  logger.info(`Creating payment intent with api key:  ${api_key}`);
  const apiKeyData = await getApiKeyData(api_key);

  if (!apiKeyData || !apiKeyData.active || api_secret !== apiKeyData.api_secret) {
    logger.error(`Invalid api key:  ${api_key}`);
    return res.status(400).json({
      message: 'Invalid API key or secret',
    });
  }
  const transactionData = {
    api_key,
    amount,
    currency,
    id: uuidv4(),
    created_at: new Date().toISOString(),
    success_url,
    fail_url,
  };

  await insertPaymentIntent(transactionData);
  logger.info(`Succesfully created payment intent ${transactionData.id} with api key:  ${api_key}`);
  return res.json({
    link: transactionData.id,
  });
}
