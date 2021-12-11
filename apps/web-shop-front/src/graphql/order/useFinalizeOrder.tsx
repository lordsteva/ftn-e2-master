import { gql, useMutation } from '@apollo/client';
const mutation = gql`
  mutation FinalizeOrder($payment_intent_id: String!) {
    finalizeOrder(data: { payment_intent_id: $payment_intent_id }) {
      ok
    }
  }
`;
export default () => useMutation(mutation);
