import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation updateOrder($acquirer_order_id: uuid!, $status: String!) {
    update_order_by_pk(
      pk_columns: { acquirer_order_id: $acquirer_order_id }
      _set: { status: $status }
    ) {
      status
    }
  }
`;

const updateOrder = async (variables: {
  acquirer_order_id: string;
  status: string;
}): Promise<string> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_order_by_pk.status;
};

export default updateOrder;
