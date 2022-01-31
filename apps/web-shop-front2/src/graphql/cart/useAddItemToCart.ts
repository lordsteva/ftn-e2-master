import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation MyMutation2($cart_id: uuid!, $product_id: uuid!) {
    insert_cart_item_one(object: {cart_id: $cart_id, product_id: $product_id}, on_conflict: {constraint: cart_item_product_id_cart_id_key, update_columns: []}) {
      id
    }
  }
`;

export default () => useMutation(mutation);
