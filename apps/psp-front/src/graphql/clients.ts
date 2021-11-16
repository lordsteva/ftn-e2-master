import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = (authToken?: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.REACT_APP_HGE_ENDPOINT}/v1/graphql`,
      headers: authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {},
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
