import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      password
      id
      cart{
        id
      }
    }
  }
`;

// eslint-disable-next-line max-len
const getUser = async (variables: { email: string }): Promise<{ password: string; id: string, cart: {id: string} }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.users?.[0];
};

export default getUser;
