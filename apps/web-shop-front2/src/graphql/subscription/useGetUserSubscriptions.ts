import { gql, useQuery } from '@apollo/client';
import { Subscription } from "@team21/types"

const query = gql`
    query useGetUserWages($user_id: uuid!, $limit: Int!, $offset: Int!) {
        subscriptions(limit: $limit, offset: $offset, where: {user_id: {_eq: $user_id}}) {
            id
            created_at
            status
            product {
                id
                course_cost
                course_last
                course_plan  
            }
        }
        subscriptions_aggregate {
            aggregate {
                count
            }
        }
    }
`;

type useGetUserSubscriptions = {
    subscriptions: Subscription[];
    subscriptions_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export default (user_id?: string, limit?: number, offset?: number) =>
  useQuery<useGetUserSubscriptions>(query, { variables: { user_id, limit, offset }, fetchPolicy:'no-cache'  });
