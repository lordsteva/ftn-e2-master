import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation UpdateSubscrtipionPaymentIntent($id: uuid!, $payment_intent_id: uuid!) {
    update_subscriptions_by_pk(
      pk_columns: { id: $id }
      _set: { payment_intent_id: $payment_intent_id }
    ) {
      id
    }
  }
`;

const updateSubscriptionPaymentIntent = async (variables: {
  id: string;
  payment_intent_id: string;
}): Promise<{ id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_subscriptions_by_pk;
};

export default updateSubscriptionPaymentIntent;
