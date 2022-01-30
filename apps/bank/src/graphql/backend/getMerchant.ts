import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query getMerchant($merchantId: uuid!, $merchantPass: uuid!) {
    account(
      where: { _and: { merchantId: { _eq: $merchantId }, merchantPass: { _eq: $merchantPass } } }
    ) {
      merchantId
      merchantPass
    }
  }
`;

const getMerchant = async (variables: {
  merchantId: string;
  merchantPass: string;
}): Promise<boolean> => {
  const res = await graphqlAdminClient.query({ query, variables });
  return !!res.data?.account?.[0];
};

export default getMerchant;
