import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation addCard(
    $account_number: Int!
    $ccv: String!
    $expire: String!
    $pan: String!
    $holder: String!
  ) {
    insert_card(
      objects: {
        account_number: $account_number
        ccv: $ccv
        expire: $expire
        pan: $pan
        holder: $holder
      }
    ) {
      affected_rows
    }
  }
`;

const addCard = async (variables: {
  account_number: string;
  ccv: string;
  expire: string;
  holder: string;
  pan: string;
}) => {
  await graphqlAdminClient.mutate({ mutation, variables });
};

export default addCard;
