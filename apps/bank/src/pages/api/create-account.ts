import cardGen from 'card-number-generator';
import crypto from 'crypto';
import { encrypt } from '../../aesUtils';
import addAccount from '../../graphql/backend/addAccount';
import addCard from '../../graphql/backend/addCard';

export default async function handler(_, res) {
  const card = await cardGen({ bank_code: process.env.BANK_ID });
  const ccv = Math.floor(100 + Math.random() * 899);
  const { number, merchantId, merchantPass } = await addAccount();

  const ccvhash = crypto.createHash('sha256').update(ccv.toString()).digest('hex');

  const encrypted = await encrypt(card);

  // const decipher = crypto.createDecipher(algorithm, Securitykey);
  // const orig = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

  await addCard({
    account_number: number,
    ccv: ccvhash,
    pan: encrypted,
    expire: await encrypt('01/27'),
    holder: await encrypt('A A'),
  });
  res.status(200).json({
    account_number: number,
    ccv: ccv.toString(),
    pan: card,
    expire: '01/27',
    holder: 'A A',
    merchantId,
    merchantPass,
  });
}

// PCC
//044 -> 036606
//050 -> 558773
