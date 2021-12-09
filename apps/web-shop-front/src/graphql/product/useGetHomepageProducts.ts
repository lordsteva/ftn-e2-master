import { gql, useQuery } from '@apollo/client';
import { Product } from '@team21/types'

const query = gql`
    query UseGetHomepageProducts($limit: Int!) {
        products(order_by: {price: desc}, limit: $limit) {
          id
          image
          name
          price
          description
          quantity
          category_id
        }
    }
`;

type UseGetHomepageProducts = {
  products: Product[];
};

export default (limit?: number) =>
  useQuery<UseGetHomepageProducts>(query, { variables: { limit }, fetchPolicy:'no-cache'});
