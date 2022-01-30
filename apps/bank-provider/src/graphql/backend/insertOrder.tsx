import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation InsertOrder(
    $state: String!
    $payment_provider_id: uuid!
    $payment_intent_id: uuid!
    $metadata: String!
    $external_id: String
  ) {
    insert_orders_one(
      object: {
        external_id: $external_id
        metadata: $metadata
        payment_intent_id: $payment_intent_id
        payment_provider_id: $payment_provider_id
        state: $state
      }
    ) {
      id
    }
  }
`;

const insertOrder = async (variables: {
  state: string;
  payment_provider_id: string;
  payment_intent_id: string;
  metadata: string;
  external_id: string;
}): Promise<{
  id: string | undefined;
}> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  const { id } = res?.data?.insert_orders_one;
  return { id };
};

export default insertOrder;
