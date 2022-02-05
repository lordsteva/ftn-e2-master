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
      affected_rows
    }
  }
`;

const updateOrder = async (variables: {
  payment_provider_id: string;
  external_id: String;
  state: String;
}): Promise<void> => {
  await graphqlAdminClient.mutate({ mutation, variables });
};

export default updateOrder;
