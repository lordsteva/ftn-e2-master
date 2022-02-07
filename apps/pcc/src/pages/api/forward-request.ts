//044 -> 036608
//050 -> 558773
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../../aesUtils';
import upsertTransaction from '../../graphql/insertTransaction';

const banks = { '03660': 'https://192.168.43.74:1111', '58773': 'https://192.168.43.74:1112' };
export default async function handler(req, res) {
  const {
    card: { pan },
  } = JSON.parse(req.body);

  const bankId = pan.substring(1, 6);

  const bankUrl = banks[bankId];
  const id = uuidv4();
  await upsertTransaction({ id, transaction_data: await encrypt(req.body) });
  console.log(req.body);
  if (!bankUrl) {
    res.status(500).json({});
    return;
  }
  try {
    const response = await fetch(`${bankUrl}/api/check-issuer`, {
      method: 'POST',
      body: req.body,
    });
    const resData = await response.json();
    console.log(resData);
    await upsertTransaction({ id, transaction_data: JSON.stringify(resData) });
    res.status(200).json({ ...resData });
  } catch (e) {
    console.log(e);
  }
}
