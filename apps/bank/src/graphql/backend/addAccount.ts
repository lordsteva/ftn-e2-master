import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation addAccount {
    insert_account_one(object: {}) {
      number
    }
  }
`;

const addAccount = async (): Promise<string> => {
  const res = await graphqlAdminClient.mutate({ mutation });
  return res.data.insert_account_one.number;
};

export default addAccount;
