import { gql, useQuery } from '@apollo/client';

export const query = gql`
  query GetApiKeyByPk($api_key: uuid!) {
    api_keys_by_pk(api_key: $api_key) {
      user_id
      api_provider_links {
        payment_provider {
          base_url
          logo
          id
          name
        }
      }
    }
    payment_providers(where: { active: { _eq: true } }) {
      base_url
      id
      logo
      name
    }
  }
`;

export default (api_key: string) =>
  useQuery<{
    payment_providers: { base_url: string; logo: string; name: string; id: string }[];
    api_keys_by_pk: {
      user_id: string;
      api_provider_links: {
        payment_provider: { base_url: string; logo: string; name: string; id: string };
      }[];
    };
  }>(query, {
    variables: { api_key },
  });
