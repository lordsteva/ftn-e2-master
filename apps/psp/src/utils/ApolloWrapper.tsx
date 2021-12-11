import { ApolloProvider } from '@apollo/client';
import { Button } from '@team21/ui-components';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import createApolloClient from '../graphql/frontend/clients';
import { useUser } from '../state/state';
import { getUserFromToken } from './tokenUtils';

function ApolloWrapper({ Component, pageProps }) {
  const [{ token }, dispatch] = useUser();
  const [apolloClient, setApolloClient] = useState(createApolloClient());
  useEffect(() => {
    const tokenFromLs = localStorage.getItem('token');
    const user = getUserFromToken(tokenFromLs);
    dispatch({ type: 'SET_TOKEN', payload: tokenFromLs });
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  useEffect(() => {
    setApolloClient(createApolloClient(token));
  }, [token]);

  const router = useRouter();
  const logout = useCallback(() => {
    dispatch?.({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    router.push('/login');
  }, [dispatch]);

  return (
    <ApolloProvider client={apolloClient}>
      {token && (
        <div className="absolute top-0 right-0 transform scale-95">
          <Button onClick={logout} title="Logout" />
        </div>
      )}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default ApolloWrapper;
