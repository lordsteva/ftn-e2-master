import { gql, useQuery } from '@apollo/client';

const query = gql`
  query UseGetProducts($limit: Int = 10, $offset: Int = 0) {
    products_aggregate {
      aggregate {
        count
      }
    }
    products(limit: $limit, offset: $offset) {
      description
      id
      image
      name
      price
      quantity
      product_category {
        name
      }
    }
  }
`;

type UseGetProductsReturn = {
  products_aggregate: {
    aggregate: {
      count: number;
    };
  };
  products: {
    description: string;
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    product_category: {
      name: string;
    };
  }[];
};

export default (limit?: number, offset?: number) =>
  useQuery<UseGetProductsReturn>(query, { variables: { limit, offset } });
