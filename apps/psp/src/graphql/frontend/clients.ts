import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import constants from '../../config/constants';

const createApolloClient = (authToken?: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${constants.HGE_ENDPOINT.replace('reverseproxy-psp', 'localhost')}/v1/graphql`,
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
