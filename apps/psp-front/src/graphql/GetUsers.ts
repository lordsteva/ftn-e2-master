import gql from 'graphql-tag';
import createApolloClient from './clients';

const query = gql`query 
`;

const getUsers = async () => {
  const res = createApolloClient().query(query);
};
