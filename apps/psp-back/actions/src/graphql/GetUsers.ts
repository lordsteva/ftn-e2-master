import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql``;

const getUsers = async (username: string) => {
  const res = await graphqlAdminClient.query(query);
};

export default getUsers;
