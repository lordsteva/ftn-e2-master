
import { gql, useMutation } from '@apollo/client';
const mutation = gql`
    mutation MyMutation($order_id: uuid!, $price: numeric!, $product_id: uuid!, $quantity: Int!) {
        insert_order_products(objects: {order_id: $order_id, price: $price, product_id: $product_id, quantity: $quantity}) {
            affected_rows
        }
    }
`;
export default () => useMutation(mutation);
