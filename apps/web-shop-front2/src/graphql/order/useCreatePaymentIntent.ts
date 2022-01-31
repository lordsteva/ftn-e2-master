import { gql, useMutation } from '@apollo/client';
const mutation = gql`
  mutation CreatePaymentIntent($amount: Float!, $currency: String = "USD", $order_id: uuid!) {
    createPaymentIntent(data: { amount: $amount, currency: $currency, order_id: $order_id }) {
      link
    }
  }
`;
export default () => useMutation(mutation);
