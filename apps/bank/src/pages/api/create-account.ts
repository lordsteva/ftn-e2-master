import cardGen from 'card-number-generator';
import addAccount from '../../graphql/backend/addAccount';
import addCard from '../../graphql/backend/addCard';

export default async function handler(_, res) {
  const card = await cardGen({ bank_code: process.env.BANK_ID });
  const ccv = Math.floor(100 + Math.random() * 899);
  const number = await addAccount();
  await addCard({
    account_number: number,
    ccv: ccv.toString(),
    pan: card,
    expire: '01/27',
    holder: 'A A',
  });
  res.status(200).json({
    account_number: number,
    ccv: ccv.toString(),
    pan: card,
    expire: '01/27',
    holder: 'A A',
  });
}

// PCC
//044 -> 036606
//050 -> 558773
