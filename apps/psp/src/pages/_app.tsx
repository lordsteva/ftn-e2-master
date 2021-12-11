import React from 'react';
import '../index.css';
import { UserProvider } from '../state/state';
import ApolloWrapper from '../utils/ApolloWrapper';

function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <ApolloWrapper Component={Component} pageProps={pageProps}></ApolloWrapper>
    </UserProvider>
  );
}

export default App;
