import { gql, useQuery } from '@apollo/client';

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
            orderProducts {
                product {
                    id
                    name
                    price
                    image
                    quantity
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
    orders: {
        id: string;
        created_at: string;
        status: string;
        total_price: number;
        address: string;
        city: string;
        country: string;
        phone: string;
        orderProducts: {
            id: string;
            name: string;
            price: string;
            image: string;
            quantity: number;
        }[]
    }[];
    orders_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export default (user_id?: string, limit?: number, offset?: number) =>
  useQuery<useGetUserOrders>(query, { variables: { user_id, limit, offset } });
