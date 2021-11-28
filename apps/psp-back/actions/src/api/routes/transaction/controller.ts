import getApiKeyData from '@src/graphql/getApiKeyData';
import insertOneTimeLink from '@src/graphql/insertOneTimeLink';
import { createHash, createPrivateKey, createSign } from 'crypto';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  const { data } = req.body.input;
  const { api_key, api_secret, amount, currency } = data;

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
  };
  const hash = createHash('md5').update(JSON.stringify(transactionData)).digest('hex');
  const sign = createSign('RSA-SHA256');

  sign.write(hash);
  sign.end();

  //TODO move somewhere else
  const signature = sign.sign(
    createPrivateKey({
      format: 'pem',
      key: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHDktDZNA+u3HaqxR75AUP7bRupcld5S343paHA4gN53kF5uv7DH
tdv7uFm9jERuMizwxZ2jg2IdbVpLa9YkIom0dsn2o/Ov2YoYuktg9qQt0x9hGz2k
g7rxV8fMlZoW/Dmtdl+aYS0z77SDQB1kXrKdzYJ0fpvm4pyHJOKIMy0xAgMBAAEC
gYAWcgI6gZlz9hZZ56Fh/BuecC5rTjkl2MhFyNBQ74r/sDnt7IsENNC9ihCfFwaa
XGZxdPV1YBsxGLSzLSeljc2n245NkpOhmLuTyQjehcnWvx5Bv5gDL0TBm8Pp5k4O
DSOVNd93LR95QTmBp/7XLR34g9bv91CgsyBhChmmqvaOoQJBALXh2QPbFvaEYrno
B5yx47HZ+tiYtmHPvxJ4xwUW1ToO/iYlXJtmIS1VQIOVKP84+H/DvdlelHJ2AjHg
1S6XOFUCQQCe5d1Sy5v/67fNie7rC2lZzpwRfkTyTw9Pk1RaaoaPA5V7rBMOQNNZ
p9/Uv8HnOiC3sC5/h3NSS7/3nWQ3hG1tAkAklV7PNbwyrYImHpOZYvaHiW65Lk5Q
8jZegsiVL3iICwf3qEAuSaaWtbUaQmBSpaTmHfsLw8hcFXxvh+eZTXVZAkEAhp5R
8spDYP9wGfeI7aMeXxKW0I88lFj8rLsyFOP5GgK8SymOf13WcTezf0fyXBa4D0d5
LVwxDIDWo065z/smxQJAZQbnYO+2o5H2fUPLRbe5vw8xQtjlOYVqZ1uOg+HwVjNG
xfyXg4a3ACAcuGK+gmiDea0NEa86MP3uVnQhud+uzg==
-----END RSA PRIVATE KEY-----`.replace(/\\n/gm, '\n'),
    }),

    'hex',
  );
  await insertOneTimeLink({ ...transactionData, signature });
  return res.json({
    link: transactionData.id,
  });
}
