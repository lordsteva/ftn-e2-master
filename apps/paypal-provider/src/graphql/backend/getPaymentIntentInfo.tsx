import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query GetPaymentIntentInfo($id: uuid!) {
    payment_intents_by_pk(id: $id) {
      api_key
      success_url
      fail_url
      amount
      error_url
      currency
    }
  }
`;

const getPaymentIntentInfo = async (variables: {
  id: string;
}): Promise<{
  apiKey: string | undefined;
  success_url: string | undefined;
  fail_url: string | undefined;
  amount: number;
  error_url: string;
  currency: string;
}> => {
  const res = await graphqlAdminClient.query({ query, variables });
  const { api_key, success_url, fail_url, amount, error_url, currency } =
    res.data.payment_intents_by_pk;
  return { apiKey: api_key, success_url, fail_url, amount, currency, error_url };
};

export default getPaymentIntentInfo;
