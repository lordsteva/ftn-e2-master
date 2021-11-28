import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation InsertOneTimeLink(
    $amount: numeric!
    $api_key: String!
    $created_at: timestamptz!
    $currency: String!
    $id: uuid!
    $signature: String!
  ) {
    insert_one_time_payment_links_one(
      object: {
        amount: $amount
        api_key: $api_key
        created_at: $created_at
        currency: $currency
        id: $id
        signature: $signature
      }
    ) {
      id
    }
  }
`;

const insertOneTimeLink = async (variables: {
  amount: number;
  api_key: string;
  created_at: string;
  currency: string;
  id: string;
  signature: string;
}): Promise<{ active: boolean; api_key: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_one_time_payment_links_one;
};

export default insertOneTimeLink;
