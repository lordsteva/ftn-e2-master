import { gql, useQuery } from '@apollo/client';
import { Order } from "@team21/types"

const query = gql`
    query useGetUserOrders($user_id: uuid!, $limit: Int!, $offset: Int!) {
        orders(where: {user_id: {_eq: $user_id}}, limit: $limit, offset: $offset) {
            id
            created_at
            status
            total_price
            address
            city
            country
            phone
            zip_code
            orderProducts {
                product_id,
                price,
                product {
                    name
                    image
                }
            }
        }
        orders_aggregate(where: {user_id: {_eq: $user_id}}) {
            aggregate {
              count
            }
        }
    }
`;

type useGetUserOrders = {
    orders: Order[];
    orders_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export default (user_id?: string, limit?: number, offset?: number) =>
  useQuery<useGetUserOrders>(query, { variables: { user_id, limit, offset } });
