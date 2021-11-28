import { ApolloProvider } from '@apollo/client';
import React from 'react';
import AppRouter from './AppRouter';
import createApolloClient from './graphql/clients';

function App() {
  return (
    <ApolloProvider client={createApolloClient()}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
