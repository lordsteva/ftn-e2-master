import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import createApolloClient from '../graphql/frontend/clients';
import '../index.css';
import { UserProvider, useUser } from '../state/state';
import { getUserFromToken } from '../utils/tokenUtils';

function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <ApolloWrapper Component={Component} pageProps={pageProps}></ApolloWrapper>
    </UserProvider>
  );
}

function ApolloWrapper({ Component, pageProps }) {
  const [{ token }, dispatch] = useUser();
  const [apolloClient, setApolloClient] = useState(createApolloClient());
  useEffect(() => {
    setApolloClient(createApolloClient(token));
    const tokenFromLs = localStorage.getItem('token');
    const user = getUserFromToken(tokenFromLs);
    dispatch({ type: 'SET_TOKEN', payload: token });
    dispatch({ type: 'SET_USER', payload: user });
  }, [token]);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
