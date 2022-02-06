import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation addAccount {
    insert_account_one(object: {}) {
      number
      merchantId
      merchantPass
    }
  }
`;

const addAccount = async (): Promise<{
  number: string;
  merchantId: string;
  merchantPass: string;
}> => {
  const res = await graphqlAdminClient.mutate({ mutation });
  return res.data.insert_account_one.number;
};

export default addAccount;
