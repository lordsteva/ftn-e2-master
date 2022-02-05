import { gql, useMutation } from '@apollo/client';
const mutation = gql`
  mutation CreateWageIntent($amount: numeric!, $currency: String = "USD", $order_id: uuid!) {
    createWageIntent(data: { amount: $amount, currency: $currency, order_id: $order_id }) {
      link
    }
  }
`;
export default () => useMutation(mutation);
