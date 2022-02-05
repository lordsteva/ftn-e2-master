import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetMetadata($api_key: uuid!, $app_id: uuid!) {
    api_provider_link(
      where: { _and: { api_key_id: { _eq: $api_key }, payment_provider_id: { _eq: $app_id } } }
    ) {
      metadata
    }
  }
`;

const getPaymentClientMetadata = async (variables: {
  api_key: string;
  app_id: string;
}): Promise<string | undefined> => {
  const res = await graphqlAdminClient.query({ query, variables });
  return res.data.api_provider_link?.[0]?.metadata;
};

export default getPaymentClientMetadata;
