import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetPaymentIntentInfo($id: uuid!) {
    payment_intents_by_pk(id: $id) {
      api_key
      success_url
      fail_url
      error_url
      amount
      currency
    }
  }
`;

const getPaymentIntentInfo = async (variables: {
  id: string;
}): Promise<{
  apiKey: string | undefined;
  success_url: string | undefined;
  error_url: string;
  fail_url: string | undefined;
  amount: number;
  currency: string;
}> => {
  const res = await graphqlAdminClient.query({ query, variables });
  const { api_key, success_url, fail_url, amount, error_url, currency } =
    res.data.payment_intents_by_pk;
  return { apiKey: api_key, success_url, error_url, fail_url, amount, currency };
};

export default getPaymentIntentInfo;
