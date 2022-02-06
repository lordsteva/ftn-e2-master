import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation createOrder(
    $acquirer_order_timestamp: String!
    $issuer_order_id: uuid!
    $issuer_order_timestamp: String!
    $acquirer_order_id: uuid!
    $status: String!
  ) {
    insert_order(
      objects: {
        acquirer_order_timestamp: $acquirer_order_timestamp
        issuer_order_id: $issuer_order_id
        issuer_order_timestamp: $issuer_order_timestamp
        acquirer_order_id: $acquirer_order_id
        status: $status
      }
    ) {
      returning {
        acquirer_order_id
      }
    }
  }
`;

const createOrderIssuer = async (variables: {
  acquirer_order_timestamp: string;
  issuer_order_id: string;
  issuer_order_timestamp: string;
  acquirer_order_id: string;
  status: string;
}): Promise<string> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_order.returning[0].acquirer_order_id;
};

export default createOrderIssuer;
