import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation updateExternalOrderId($id: uuid!, $external_id: String) {
    update_orders_by_pk(pk_columns: { id: $id }, _set: { external_id: $external_id }) {
      id
    }
  }
`;

const updateExternalOrderId = async (variables: {
  id: string;
  external_id: string;
}): Promise<boolean> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  const { id } = res?.data?.update_orders_by_pk;
  return !!id;
};

export default updateExternalOrderId;
