import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query getPayment($payment_id: uuid!) {
    payment_by_pk(payment_id: $payment_id) {
      amount
      error_url
      failed_url
      success_url
      merchant_order_id
    }
  }
`;

const getPayment = async (variables: {
  payment_id: string;
}): Promise<{
  amount: number;
  error_url: string;
  failed_url: string;
  success_url: string;
  merchant_order_id: string;
}> => {
  const res = await graphqlAdminClient.query({ query, variables });
  return res.data?.payment_by_pk;
};

export default getPayment;
