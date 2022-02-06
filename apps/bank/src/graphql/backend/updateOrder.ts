import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation updateOrder($acquirer_order_id: uuid!, $status: String!) {
    update_order_by_pk(
      pk_columns: { acquirer_order_id: $acquirer_order_id }
      _set: { status: $status }
    ) {
      status
      acquirer_order_timestamp
      acquirer_order_id
      issuer_order_id
      issuer_order_timestamp
    }
  }
`;

const updateOrder = async (variables: {
  acquirer_order_id: string;
  status: string;
}): Promise<{
  status: string;
  acquirer_order_timestamp: string;
  acquirer_order_id: string;
  issuer_order_id: string;
  issuer_order_timestamp: string;
}> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_order_by_pk;
};

export default updateOrder;
