import { gql } from '@apollo/client';
import pspClient from './psp-client';

const query = gql`
  query GetOrderStatus($payment_intent_id: uuid!) {
    orders(where: { payment_intent_id: { _eq: $payment_intent_id } }) {
      state
    }
  }
`;

const getOrderStatusFromPSP = async (variables: {
  payment_intent_id: string;
}): Promise<{ state: string }> => {
  console.log(process.env);
  const res = await pspClient.query({ query, variables });
  return res.data.orders?.[0];
};

export default getOrderStatusFromPSP;
