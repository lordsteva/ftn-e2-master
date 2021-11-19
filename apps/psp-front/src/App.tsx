import { ApolloProvider } from '@apollo/client';
import React from 'react';
import Component from './Component';
import createApolloClient from './graphql/clients';

function App() {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component />
    </ApolloProvider>
  );
}

export default App;
