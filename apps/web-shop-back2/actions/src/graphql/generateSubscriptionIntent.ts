import { gql } from '@apollo/client';
import pspClient from './psp-client';

const mutation = gql`
  mutation CreatePaymentIntent(
    $amount: String!
    $api_key: String!
    $fail_url: String!
    $success_url: String!
    $currency: String!
    $error_url: String!
    $api_secret: String!
  ) {
    createPaymentIntent(
      data: {
        amount: $amount
        api_key: $api_key
        api_secret: $api_secret
        currency: $currency
        success_url: $success_url
        fail_url: $fail_url
        error_url: $error_url
      }
    ) {
      link
    }
  }
`;

const generatePaymentintent = async (variables: {
  amount: string;
  api_key: string;
  api_secret: string;
  currency: string;
  success_url: string;
  fail_url: string;
  error_url: string;
}): Promise<{ link: string }> => {
  const res = await pspClient.mutate({ mutation, variables });

  return res.data.createPaymentIntent;
};

export default generatePaymentintent;
