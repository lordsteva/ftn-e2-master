import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetApiLinkMetadata($payment_provider_id: uuid!, $api_key_id: uuid!) {
    api_provider_link_by_pk(api_key_id: $api_key_id, payment_provider_id: $payment_provider_id) {
      metadata
    }
  }
`;

const getApiLinkMetadata = async (variables: {
  api_key_id: string;
  payment_provider_id: string;
}): Promise<string> => {
  const res = await graphqlAdminClient.query({ query, variables });
  return res.data.api_provider_link_by_pk?.metadata;
};

export default getApiLinkMetadata;
