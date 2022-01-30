import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const mutation = gql`
  mutation MyMutation($email: String!, $password: String!, $fullName: String!) {
    insert_users_one(object: { email: $email, password: $password, full_name: $fullName }) {
      id
    }
  }
`;

const insertUser = async (variables: {
  fullName: number;
  email: string;
  password: string;
}): Promise<{ id: string }> => {
  const res = await graphqlAdminClient.mutate({ mutation, variables });
  return res.data.insert_users_one;
};

export default insertUser;
