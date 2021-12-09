import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation MyMutation ($id: uuid!) {
    delete_cart_item(where: {id: {_eq: $id}}) {
        affected_rows
    }
  }
`;

export default () => useMutation(mutation);
