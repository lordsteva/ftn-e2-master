import crypto from 'crypto';
import { encrypt } from '../../aesUtils';
import createOrder from '../../graphql/backend/createOrder';
import getAccountByCard from '../../graphql/backend/getAccountByCard';
import getPayment from '../../graphql/backend/getPayment';
import updateAccount from '../../graphql/backend/updateAccount';
import updateIssuerOrder from '../../graphql/backend/updateIssuerOrder';
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
  const vardOrig = { ...card, pan: pan };
  card = {
    ...card,
    holder: await encrypt(card.holder.toUpperCase()),
    pan: await encrypt(pan),
    expire: await encrypt(card.expire),
    ccv: crypto.createHash('sha256').update(card.ccv.toString()).digest('hex'),
  };
  const payment = await getPayment({ payment_id: data.paymentId });
  const acquirer_order_timestamp = Date.now().toLocaleString().replace(',', '');
  const orderId = await createOrder({
    payment_id: data.paymentId,
    acquirer_order_timestamp,
  });
  console.log(process.env.BANK_CARD_ID, pan.substring(1, 6));

  if (pan.substring(1, 6) === process.env.BANK_CARD_ID) {
    const account = await getAccountByCard(card);
    if (!account) {
      res.status(500).json({});
      return;
    }
    if (account.available >= payment.amount) {
      const available = account.available - payment.amount;
      const reserved = account.reserved + payment.amount;
      await updateAccount({ available, reserved, number: account.number });
      const resp = await updateOrder({ acquirer_order_id: orderId, status: 'COMPLETED' });
      //TODO ttransfer money
      res.status(200).json(resp);
    } else {
      const resp = await updateOrder({ acquirer_order_id: orderId, status: 'FAILED' });
      res.status(200).json(resp);
    }
  } else {
    try {
      const resp = await fetch(`${process.env.PCC_BASE_ADDRESS}/api/forward-request`, {
        method: 'POST',
        body: JSON.stringify({
          card: vardOrig,
          acquirer_order_timestamp,
          acquirer_order_id: orderId,
          amount: payment.amount,
        }),
      });
      const rrr = await resp.json();
      const { status, issuer_order_timestamp, issuer_order_id } = rrr;

      await updateIssuerOrder({
        acquirer_order_id: orderId,
        status,
        issuer_order_timestamp,
        issuer_order_id,
      });
      if (status === 'COMPLETED') {
        //transferm oney TODO
      }
      res.status(200).json(rrr);
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  }
}
