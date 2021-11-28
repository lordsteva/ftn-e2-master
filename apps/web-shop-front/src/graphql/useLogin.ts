import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

export default () => useMutation(mutation);
