import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';
import config from '../config/constants';

const httpLink = new HttpLink({
  uri: `${config.HGE_ENDPOINT}/v1/graphql`,
  fetch,
  headers: {
    [config.HASURA_ADMIN_SECRET_HEADER_NAME]: config.HGE_ADMIN_SECRET,
  },
});

const graphqlAdminClient = new ApolloClient({
  // typeDefs,
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default graphqlAdminClient;
