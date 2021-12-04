import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      password
      id
    }
  }
`;

const getUser = async (variables: { email: string }): Promise<{ password: string; id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.users?.[0];
};

export default getUser;
