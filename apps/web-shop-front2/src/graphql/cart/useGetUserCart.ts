import { gql, useQuery } from '@apollo/client';

const query = gql`
    query UseGetUserCart($user_id: uuid!) {
        cart(where: {user_id: {_eq: $user_id}}) {
            id
        }
    }
`;

type UseGetUserCartReturn = {
  cart: {id: string}[];
};

export default (user_id?: string) =>
  useQuery<UseGetUserCartReturn>(query, { variables: { user_id} });
