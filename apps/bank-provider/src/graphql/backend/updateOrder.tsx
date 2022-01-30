import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation UpdateOrder($payment_provider_id: uuid!, $external_id: String!, $state: String!) {
    update_orders(
      where: {
        _and: {
          payment_provider_id: { _eq: $payment_provider_id }
          external_id: { _eq: $external_id }
        }
      }
      _set: { state: $state }
    ) {
      returning {
        payment_intent {
          error_url
          fail_url
          success_url
        }
      }
    }
  }
`;

const updateOrder = async (variables: {
  payment_provider_id: string;
  external_id: String;
  state: String;
}): Promise<{ success_url: string; error_url: string; fail_url: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_orders.returning[0].payment_intent;
};

export default updateOrder;
