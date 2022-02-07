import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation createOrder($acquirer_order_timestamp: String!, $payment_id: uuid!) {
    insert_order(
      objects: { acquirer_order_timestamp: $acquirer_order_timestamp, payment_id: $payment_id }
    ) {
      returning {
        acquirer_order_id
      }
    }
  }
`;

const createOrder = async (variables: {
  acquirer_order_timestamp: string;
  payment_id: string;
}): Promise<string> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_order.returning[0].acquirer_order_id;
};

export default createOrder;
