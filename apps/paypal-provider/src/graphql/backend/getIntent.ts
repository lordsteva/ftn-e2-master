import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetIntent($id: uuid!) {
    one_time_payment_links_by_pk(id: $id) {
      amount
      currency
    }
  }
`;

const getIntent = async (variables: {
  id: string;
}): Promise<{
  amount: number;
  currency: string;
}> => {
  const res = await graphqlAdminClient.query({ query, variables });
  return res.data.one_time_payment_links_by_pk;
};

export default getIntent;
