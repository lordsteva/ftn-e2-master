import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation MyMutation2($cart_id: uuid!, $product_id: uuid!, $quantity: Int!) {
    insert_cart_item_one(object: {cart_id: $cart_id, product_id: $product_id, quantity: 0}, on_conflict: {constraint: cart_item_product_id_cart_id_key, update_columns: []}) {
      id
    }
    update_cart_item(where: {_and: {cart_id: {_eq: $cart_id}, product_id: {_eq: $product_id}}}, _inc: {quantity: $quantity}) {
      affected_rows
    }
  }
`;

export default () => useMutation(mutation);
