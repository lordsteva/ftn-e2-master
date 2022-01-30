import createOrder from '../../graphql/backend/createOrder';
import getAccountByCard from '../../graphql/backend/getAccountByCard';
import getPayment from '../../graphql/backend/getPayment';
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
  card = { ...card, holder: card.holder.toUpperCase() };
  const account = await getAccountByCard(card);

  const payment = await getPayment({ payment_id: data.paymentId });

  const orderId = await createOrder({
    payment_id: data.paymentId,
    acquirer_order_timestamp: Date.now().toLocaleString(),
  });

  if (account) {
    if (account.available > payment.amount) {
      const available = account.available - payment.amount;
      const reserved = account.reserved + payment.amount;
      await updateAccount({ available, reserved, number: account.number });
      await updateOrder({ acquirer_order_id: orderId, status: 'COMLPETED' });
      res.status(200).json({ status: 'COMLPETED' });
    } else {
      await updateOrder({ acquirer_order_id: orderId, status: 'FAILED' });
      res.status(200).json({ status: 'FAILED' });
    }
  } else {
    // TODO contact PCC
    // TODO update order status based on PCC response  (save to db: status, issuer id, issuer timestamp)
    // TODO return to the frontend: status

    // change status to 200 if everytnihg ok (200, COMPLETED returned from PCC)
    // 500 if an error occurs (throw 500 from PCC)
    //200 and status FAILED if there is not enough money (return 200 and FAILED from PCC)
    res.status(500).json({});
  }
}
