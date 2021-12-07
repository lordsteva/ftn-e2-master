import { gql } from '@apollo/client';
import graphqlAdminClient from '../admin-client';

const mutation = gql`
  mutation MyMutation($user_id: uuid!, $product_id: uuid!, $quantity: Int!) {
    insert_cart_item_one(object: {user_id: $user_id, product_id: $product_id, quantity: $quantity}) {
        id
    }
  }
`;

const insertCartItem = async (variables: {
  user_id: string;
  product_id: string;
  quantity: number;
}): Promise<{ id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_cart_item_one;
};

export default insertCartItem;
