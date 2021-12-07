import { gql, useQuery } from '@apollo/client';
import { Product } from '@team21/types'

const query = gql`
    query UseGetCartProducts($cart_id: uuid!) {
        cart_item(where: {cart_id: {_eq: $cart_id}}) {
            id
            quantity
            product {
              id
              image
              name
              price
            }
        }
    }
`;

type UseGetCartProductsReturn = {
  cart_item: {
    id: string;
    quantity: number;
    product: Product;
  }[];
};

export default (cart_id?: string) =>
  useQuery<UseGetCartProductsReturn>(query, { variables: { cart_id} });
