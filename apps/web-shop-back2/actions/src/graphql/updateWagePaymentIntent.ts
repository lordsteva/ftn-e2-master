import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation UpdateWagePaymentIntent($id: uuid!, $payment_intent_id: uuid!) {
    update_wages_by_pk(pk_columns: { id: $id }, _set: { payment_intent_id: $payment_intent_id }) {
      id
    }
  }
`;

const updateWagePaymentIntent = async (variables: {
  id: string;
  payment_intent_id: string;
}): Promise<{ id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_orders_by_pk;
};

export default updateWagePaymentIntent;
