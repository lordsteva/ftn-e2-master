import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation Registration($fullName: String!, $email: String!, $password: String!) {
    registration(fullName: $fullName, email: $email, password: $password) {
      id
    }
  }
`;

export default () => useMutation(mutation);
