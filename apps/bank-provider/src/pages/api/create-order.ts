import config from '../../config/constants';
import getBankBaseUrl from '../../graphql/backend/getBankBaseUrl';
import getPaymentClientMetadata from '../../graphql/backend/getPaymentClientMetadata';
import getPaymentIntentInfo from '../../graphql/backend/getPaymentIntentInfo';
import insertOrder from '../../graphql/backend/insertOrder';
import updateExternalOrderId from '../../graphql/backend/updateExternalOrderId';
import logger from '../../logger/logger';

type paymentIntent = {
  merchant_id: string;
  merchant_pass: string;
  amount: number;
  merchant_order_id: string;
  merchant_timestamp: string;
  success_url: string;
  failed_url: string;
  error_url: string;
};

export default async function handler(req, res) {
  const { intent } = JSON.parse(req.body);
  const { apiKey, success_url, fail_url, error_url, amount, currency } = await getPaymentIntentInfo(
    {
      id: intent,
    },
  );
  const metadata = await getPaymentClientMetadata({ api_key: apiKey, app_id: config.APP_ID });

  const { merchantId, merchantPass, bankId } = JSON.parse(metadata ?? '{}');
  const bankBaseUrl = await getBankBaseUrl(bankId);

  //TODO update order id and url

  const { id: orderId } = await insertOrder({
    external_id: null,
    payment_intent_id: intent,
    payment_provider_id: config.APP_ID,
    state: 'CREATED',
    metadata: JSON.stringify({
      currency_code: currency,
      value: amount.toString(),
    }),
  });
  logger.info(`Added order ${orderId} for payment intent: ${intent}`);

  const payment: paymentIntent = {
    merchant_id: merchantId,
    merchant_pass: merchantPass,
    amount,
    merchant_order_id: orderId,
    merchant_timestamp: Date.now().toLocaleString(),
    success_url: `http://localhost:1235/payment/capture/${orderId}/`,
    failed_url: `http://localhost:1235/payment/capture/${orderId}/`,
    error_url: `http://localhost:1235/payment/capture/${orderId}/`,
  };

  const resp = await fetch(`${bankBaseUrl}/api/create-payment`, {
    method: 'post',
    body: JSON.stringify(payment),
  });

  const data = await resp.json();
  logger.info(`Created bank payment: ${data.payment_id} for payment: ${intent}`);
  await updateExternalOrderId({ external_id: data.payment_id, id: orderId });
  logger.info(`Updated order external id to: ${data.payment_id} for order: ${orderId}`);

  res.status(200).json({ url: data.payment_url });
}
