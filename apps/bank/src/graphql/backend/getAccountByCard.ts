import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query getAccountByCard($ccv: String!, $holder: String!, $pan: String!, $expire: String!) {
    card(
      where: {
        ccv: { _eq: $ccv }
        holder: { _eq: $holder }
        pan: { _eq: $pan }
        expire: { _eq: $expire }
      }
    ) {
      account {
        available
        reserved
        number
      }
    }
  }
`;

const getAccountByCard = async (
  variables: {
    ccv: string;
    holder: string;
    pan: string;
    expire: string;
  } | null,
): Promise<{ available: number; reserved: number; number: number }> => {
  const res = await graphqlAdminClient.query({ query, variables });

  return res.data?.card?.[0].account || null;
};

export default getAccountByCard;
