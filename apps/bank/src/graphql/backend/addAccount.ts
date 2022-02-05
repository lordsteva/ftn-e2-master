import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation addAccount {
    insert_account_one(object: {}) {
      number
      merchant_id
      merchant_pass
    }
  }
`;

const addAccount = async (): Promise<{
  number: string;
  merchant_id: string;
  merchant_pass: string;
}> => {
  const res = await graphqlAdminClient.mutate({ mutation });
  return res.data.insert_account_one.number;
};

export default addAccount;
