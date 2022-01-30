import { gql, useQuery } from '@apollo/client';

export const query = gql`
  query GetUsers($data: RandInput!) {
    rand(data: $data) {
      answer
    }
  }
`;

export default (text: string) => useQuery(query, { variables: { data: { text } } });
