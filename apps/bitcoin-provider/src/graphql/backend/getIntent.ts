import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetIntent($id: uuid!) {
    payment_intents_by_pk(id: $id) {
      amount
      currency
      success_url
      fail_url
    }
  }
`;

const getIntent = async (variables: {
  id: string;
}): Promise<{
  amount: number;
  currency: string;
  success_url: string;
  fail_url: string;
}> => {
  const res = await graphqlAdminClient.query({ query, variables });
  return res.data.payment_intents_by_pk;
};

export default getIntent;
