import { gql, useMutation } from '@apollo/client';

export const mutation = gql`
  mutation DeleteApiProviderLink($payment_provider_id: uuid!, $api_key_id: uuid!) {
    delete_api_provider_link_by_pk(
      api_key_id: $api_key_id
      payment_provider_id: $payment_provider_id
    ) {
      api_key_id
      payment_provider_id
    }
  }
`;

export default () =>
  useMutation<{
    payment_provider_id: string;
    api_key_id: string;
  }>(mutation);
