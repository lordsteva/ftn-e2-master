import { gql, useQuery } from '@apollo/client';

export const query = gql`
  query GetApiKeysByUser($user_id: uuid!) {
    api_keys(where: { user_id: { _eq: $user_id } }) {
      api_key
      api_secret
      active
      api_provider_links {
        payment_provider {
          logo
          name
        }
      }
    }
  }
`;

export default (user_id: string) =>
  useQuery<{
    api_keys: {
      api_key: string;
      api_secret: string;
      active: boolean;
      api_provider_links: { payment_provider: { logo: string; name: string } }[];
    }[];
  }>(query, { variables: { user_id }, fetchPolicy: 'no-cache' });
