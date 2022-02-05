import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation MyMutation($transaction_data: String, $id: uuid) {
    insert_transactions_one(
      object: { transaction_data: $transaction_data, id: $id }
      on_conflict: { constraint: transactions_pkey, update_columns: transaction_data }
    ) {
      id
    }
  }
`;

const insertTransaction = async (variables: {
  transaction_data: string;
  id?: string;
}): Promise<string> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_transactions_one.id;
};

export default insertTransaction;
