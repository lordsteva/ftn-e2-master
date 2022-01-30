import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation createPayment($payment: payment_insert_input!) {
    insert_payment_one(object: $payment) {
      payment_id
    }
  }
`;

const createPayment = async (variables: { payment: any }): Promise<boolean> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_payment_one.payment_id;
};

export default createPayment;
