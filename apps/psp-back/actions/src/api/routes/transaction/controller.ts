import getApiKeyData from '@src/graphql/getApiKeyData';
import insertPaymentIntent from '@src/graphql/insertPaymentIntent';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  const { data } = req.body.input;
  const { api_key, api_secret, amount, currency, success_url, fail_url } = data;

  const apiKeyData = await getApiKeyData(api_key);

  console.log(apiKeyData);
  if (!apiKeyData || !apiKeyData.active || api_secret !== apiKeyData.api_secret) {
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
  return res.json({
    link: transactionData.id,
  });
}
