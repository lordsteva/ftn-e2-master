import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation AddItemToCart($user_id: uuid!, $product_id: uuid!, $quantity: Int!) {
    addItem(user_id: $user_id, product_id: $product_id, quantity: $quantity) {
      id
    }
  }
`;

export default () => useMutation(mutation);
