import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetClientId($id: uuid!) {
    payment_intents_by_pk(id: $id) {
      api_key
      success_url
      fail_url
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
}): Promise<{
  apiKey: string | undefined;
  metadata: string | undefined;
  success_url: string | undefined;
  fail_url: string | undefined;
}> => {
  const res = await graphqlAdminClient.query({ query, variables });
  const { api_key, success_url, fail_url } = res.data.payment_intents_by_pk;
  const metadata = res.data.payment_intents_by_pk?.apiKeyByApiKey?.api_provider_links?.[0].metadata;
  return { apiKey: api_key, metadata, success_url, fail_url };
};

export default getClientId;
