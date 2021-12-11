import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation UpdateOrderStatus($payment_intent_id: uuid!, $status: String!) {
    update_orders(
      where: { payment_intent_id: { _eq: $payment_intent_id } }
      _set: { status: $status }
    ) {
      affected_rows
    }
  }
`;

const updateOrderStatus = async (variables: {
  status: string;
  payment_intent_id: string;
}): Promise<{ affected_rows: number }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_orders;
};

export default updateOrderStatus;
