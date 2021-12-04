import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation UpsertLink($payment_provider_id: uuid!, $api_key_id: uuid!, $metadata: String!) {
    insert_api_provider_link_one(
      object: {
        api_key_id: $api_key_id
        metadata: $metadata
        payment_provider_id: $payment_provider_id
      }
      on_conflict: { constraint: api_provider_link_pkey, update_columns: metadata }
    ) {
      metadata
      api_key_id
      payment_provider_id
    }
  }
`;

const upsertApiProviderLink = async (variables: {
  metadata: string;
  api_key_id: string;
  payment_provider_id: string;
}): Promise<{
  metadata: string;
  api_key_id: string;
  payment_provider_id: string;
}> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res?.data?.insert_api_provider_link_one;
};

export default upsertApiProviderLink;
