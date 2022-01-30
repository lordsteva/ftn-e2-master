import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation updateAccount($number: Int!, $available: numeric, $reserved: numeric) {
    update_account_by_pk(
      pk_columns: { number: $number }
      _set: { available: $available, reserved: $reserved }
    ) {
      number
      reserved
      available
    }
  }
`;

const updateAccount = async (variables: {
  available: number;
  number: number;
  reserved: number;
}): Promise<{ available: number; number: number; reserved: number }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_account_by_pk;
};

export default updateAccount;
