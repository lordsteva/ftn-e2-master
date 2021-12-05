import { gql, useQuery } from '@apollo/client';
import { Product } from '@team21/types'

const query = gql`
    query UseGetProductById($id: uuid!) {
        products(where: {id: {_eq: $id}}) {
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

type UseProductByIdReturn = {
  products: Product[];
};

export default (id?: string) =>
  useQuery<UseProductByIdReturn>(query, { variables: { id } });
