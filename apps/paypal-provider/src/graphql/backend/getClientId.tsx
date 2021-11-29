import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetClientId($id: uuid!) {
    one_time_payment_links_by_pk(id: $id) {
      api_key
      apiKeyByApiKey {
        api_provider_links {
          metadata
        }
      }
    }
  }
`;

const getClientId = async (variables: {
  id: string;
}): Promise<{ apiKey: string | undefined; metadata: string | undefined }> => {
  const res = await graphqlAdminClient.query({ query, variables });
  const apiKey = res.data.one_time_payment_links_by_pk?.api_key;
  const metadata =
    res.data.one_time_payment_links_by_pk?.apiKeyByApiKey?.api_provider_links?.[0].metadata;
  return { apiKey, metadata };
};

export default getClientId;
