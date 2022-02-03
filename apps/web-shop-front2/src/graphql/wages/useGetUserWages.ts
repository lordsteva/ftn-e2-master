import { gql, useQuery } from '@apollo/client';
import { Wage } from "@team21/types"

const query = gql`
    query useGetUserWages($user_id: uuid!, $limit: Int!, $offset: Int!) {
        wages(limit: $limit, offset: $offset, where: {user_id: {_eq: $user_id}}) {
            id
            first_name
            last_name
            amount
            recipient_first_name
            recipient_last_name
            created_at
            status
        }
        wages_aggregate {
            aggregate {
                count
            }
        }
    }
`;

type useGetUserWages = {
    wages: Wage[];
    wages_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export default (user_id?: string, limit?: number, offset?: number) =>
  useQuery<useGetUserWages>(query, { variables: { user_id, limit, offset }, fetchPolicy:'no-cache'  });
