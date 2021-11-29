import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation InsertOneTimeLink(
    $amount: numeric!
    $api_key: uuid!
    $created_at: timestamptz!
    $currency: String!
    $id: uuid!
    $success_url: String!
    $fail_url: String!
  ) {
    insert_one_time_payment_links_one(
      object: {
        amount: $amount
        api_key: $api_key
        created_at: $created_at
        currency: $currency
        id: $id
        success_url: $success_url
        fail_url: $fail_url
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
  success_url: string;
  fail_url: string;
}): Promise<{ active: boolean; api_key: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_one_time_payment_links_one;
};

export default insertOneTimeLink;
