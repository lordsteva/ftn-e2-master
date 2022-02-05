import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation UpdateOrderStatus($payment_intent_id: uuid!, $status: String!) {
    update_orders(
      where: { payment_intent_id: { _eq: $payment_intent_id } }
      _set: { status: $status }
    ) {
      returning {
        id
      }
    }

    update_subscriptions(
      where: { payment_intent_id: { _eq: $payment_intent_id } }
      _set: { status: $status }
    ) {
      returning {
        id
      }
    }

    update_wages(
      where: { payment_intent_id: { _eq: $payment_intent_id } }
      _set: { status: $status }
    ) {
      returning {
        id
      }
    }
  }
`;

const updateOrderStatus = async (variables: {
  status: string;
  payment_intent_id: string;
}): Promise<{ id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return (
    res.data.update_orders?.returning?.[0] ??
    res.data.update_subscriptions?.returning?.[0] ??
    res.data.update_wages?.returning?.[0]
  );
};

export default updateOrderStatus;
