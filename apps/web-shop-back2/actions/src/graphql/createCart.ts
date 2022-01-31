import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation createCart($user_id: uuid!) {
    insert_cart_one(object: { user_id: $user_id }) {
      id
    }
  }
`;

const createCart = async (variables: {
  user_id: string;
}): Promise<{ id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_cart_one;
};

export default createCart;
