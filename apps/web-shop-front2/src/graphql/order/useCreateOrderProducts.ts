import { gql, useMutation } from '@apollo/client';
const mutation = gql`
  mutation InsertOrderProducts($cart_id: uuid!, $objects: [order_products_insert_input!]!) {
    insert_order_products(objects: $objects) {
      affected_rows
    }
    delete_cart_item(where: { cart_id: { _eq: $cart_id } }) {
      affected_rows
    }
  }
`;
export default () => useMutation(mutation);
