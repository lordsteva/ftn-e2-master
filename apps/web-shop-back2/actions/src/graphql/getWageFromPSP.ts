import { gql } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';
import config from '../config/constants';

const httpLink = new HttpLink({
  uri: `${config.PSP_ENDPOINT}/v1/graphql`,
  fetch,
  headers: {
    [config.PSP_KEY_HEADER]: config.API_KEY_WAGE,
    [config.PSP_SECRET_HEADER]: config.API_SECRET_WAGE,
  },
});

const pspClient = new ApolloClient({
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

const query = gql`
  query GetOrderStatus($payment_intent_id: uuid!) {
    orders(where: { payment_intent_id: { _eq: $payment_intent_id } }) {
      state
    }
  }
`;

const getWageFromPSP = async (variables: {
  payment_intent_id: string;
}): Promise<{ state: string }> => {
  const res = await pspClient.query({ query, variables });
  return res.data.orders?.[0];
};

export default getWageFromPSP;
