import { v4 as uuidv4 } from 'uuid';
import createOrderIssuer from '../../graphql/backend/createOrderIssuer';
import getAccountByCard from '../../graphql/backend/getAccountByCard';
import updateAccount from '../../graphql/backend/updateAccount';
import updateOrder from '../../graphql/backend/updateOrder';

type Card = {
  holder: string;
  ccv: string;
  pan: string;
  expire: string;
};

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  let { card }: { card: Card } = data;
  const pan = card.pan.replace('-', '');
  card = { ...card, holder: card.holder.toUpperCase(), pan };

  if (pan.substring(1, 7) === process.env.BANK_CARD_ID) {
    const account = await getAccountByCard(card);
    if (!account) {
      res.status(500).json({});
      return;
    }
    await createOrderIssuer({
      acquirer_order_timestamp: data.acquirer_order_timestamp,
      acquirer_order_id: data.acquirer_order_id,
      issuer_order_timestamp: Date.now().toLocaleString(),
      issuer_order_id: uuidv4(),
      status: 'CREATED',
    });

    if (account.available > data.amount) {
      const available = account.available - data.amount;
      const reserved = account.reserved + data.amount;
      await updateAccount({ available, reserved, number: account.number });
      const resp = await updateOrder({
        acquirer_order_id: data.acquirer_order_id,
        status: 'COMPLETED',
      });
      res.status(200).json(resp);
    } else {
      const resp = await updateOrder({
        acquirer_order_id: data.acquirer_order_id,
        status: 'FAILED',
      });
      res.status(200).json(resp);
    }
  } else {
    res.status(500).json({});
  }
}
