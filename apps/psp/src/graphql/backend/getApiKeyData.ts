import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetApiKeyData($api_key: uuid!) {
    api_keys(where: { api_key: { _eq: $api_key } }) {
      active
      api_key
      api_secret
    }
  }
`;

const getApiKeyData = async (
  apiKey: string,
): Promise<{ active: boolean; api_key: string; api_secret: string }> => {
  const res = await graphqlAdminClient.query({ query, variables: { api_key: apiKey } });
  console.log(res);
  return res.data.api_keys?.[0];
};

export default getApiKeyData;
