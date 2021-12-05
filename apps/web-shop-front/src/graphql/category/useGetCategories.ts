import { gql, useQuery } from '@apollo/client';
import { Category } from '@team21/types'

const query = gql`
    query UseGetCategories ($limit: Int!, $offset: Int! ) {
        product_categories_aggregate {
          aggregate {
            count
          }
        }
        product_categories(limit: $limit, offset: $offset ) {
            id
            name
            image
        }
    }
`;

type UseGetCategoriesReturn = {
  product_categories_aggregate: {
    aggregate: {
      count: number;
    };
  };
  product_categories: Category[];
};

export default (limit?: number, offset?: number) =>
  useQuery<UseGetCategoriesReturn>(query, { variables: { limit, offset } });
