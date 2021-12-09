import { ApolloProvider } from '@apollo/client';
import React from 'react';
import createApolloClient from '../graphql/frontend/clients';
import '../index.css';

function App({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
