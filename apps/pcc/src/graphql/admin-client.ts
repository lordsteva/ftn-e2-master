import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: `${process.env.HGE_ENDPOINT}/v1/graphql`,
  fetch,
  headers: {
    [process.env.HASURA_ADMIN_SECRET_HEADER_NAME]: process.env.HGE_ADMIN_SECRET,
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
