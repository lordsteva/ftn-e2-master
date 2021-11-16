import { gql, useQuery } from '@apollo/client';

export const query = gql`
  query MyQuery($limit: Int = 10) {
    user(limit: $limit) {
      username
    }
  }
`;

export default () => useQuery(query);
