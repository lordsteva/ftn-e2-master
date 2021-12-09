import { ApolloProvider } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import createApolloClient from './graphql/clients';
import { useUser } from './state/state';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Categories from './pages/Categories'
import Category from "./pages/Category"
import Product from "./pages/Product"
import ShoppingCart from './pages/ShoppingCart'
import Navigation from './Navigation';
import CheckoutPage from './pages/CheckoutPage';

const AppRouter: FC<Record<string, never>> = () => {
  const [{ token }] = useUser();
  const [apolloClient, setApolloClient] = useState(createApolloClient());

  useEffect(() => {
    setApolloClient(createApolloClient(token));
  }, [token]);
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category" element={<Category />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="invoices" element={<div />} />
        </Routes>
      </BrowserRouter>{' '}
    </ApolloProvider>
  );
};

export default AppRouter;
