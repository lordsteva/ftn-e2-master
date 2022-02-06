import { gql, useQuery } from '@apollo/client';

export const query = gql`
  query getPaymentMethods($api_key: uuid!) {
    api_keys_by_pk(api_key: $api_key) {
      api_provider_links {
        payment_provider {
          base_url
          active
          logo
          name
          subscription
        }
      }
    }
  }
`;

export default (api_key: string) => useQuery(query, { variables: { api_key } });
