import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation updateOrder(
    $acquirer_order_id: uuid!
    $status: String!
    $issuer_order_id: uuid!
    $issuer_order_timestamp: String!
  ) {
    update_order_by_pk(
      pk_columns: { acquirer_order_id: $acquirer_order_id }
      _set: {
        status: $status
        issuer_order_id: $issuer_order_id
        issuer_order_timestamp: $issuer_order_timestamp
      }
    ) {
      status
    }
  }
`;

const updateIssuerOrder = async (variables: {
  acquirer_order_id: string;
  status: string;
  issuer_order_id: string;
  issuer_order_timestamp: string;
}): Promise<string> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.update_order_by_pk;
};

export default updateIssuerOrder;
