import { ApolloProvider } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import createApolloClient from './graphql/clients';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { useUser } from './state/state';

const AppRouter: FC<Record<string, never>> = () => {
  const [{ token }] = useUser();
  const [apolloClient, setApolloClient] = useState(createApolloClient());
  useEffect(() => {
    setApolloClient(createApolloClient(token));
  }, [token]);
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="invoices" element={<div />} />
        </Routes>
      </BrowserRouter>{' '}
    </ApolloProvider>
  );
};
export default AppRouter;
