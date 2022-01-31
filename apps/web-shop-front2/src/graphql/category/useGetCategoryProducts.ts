import { gql, useQuery } from '@apollo/client';
import { Product } from '@team21/types';

const query = gql`
  query UseGetCategoryProducts($category_id: uuid!, $limit: Int!, $offset: Int!) {
    products(where: {category_id: {_eq: $category_id}}, limit: $limit, offset: $offset) {
      id
      image
      name
      price
      description
      category_id
      place
      date_start
      date_end
    }
    products_aggregate(where: {category_id: {_eq: $category_id}}) {
      aggregate {
        count
      }
    }
  }
`;

type UseGetCategoryProductsReturn = {
  products: Product[];
  products_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export default (category_id: string, limit?: number, offset?: number) =>
  useQuery<UseGetCategoryProductsReturn>(query, { variables: {category_id, limit, offset }, fetchPolicy:'no-cache' });
