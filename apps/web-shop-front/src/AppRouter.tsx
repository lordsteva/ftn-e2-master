import { ApolloProvider } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import createApolloClient from './graphql/clients';
import Navigation from './Navigation';
import Categories from './pages/Categories';
import Category from './pages/Category';
import CheckoutPage from './pages/CheckoutPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import PaymentMessage, { PaymenntMessageType } from './pages/PaymentMessage';
import ProductPage from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage';
import ShoppingCart from './pages/ShoppingCart';
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
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category" element={<Category />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route
            path="/success"
            element={
              <PaymentMessage title="Payment successfull" type={PaymenntMessageType.SUCCESS} />
            }
          />
          <Route
            path="/fail"
            element={<PaymentMessage title="Payment failed" type={PaymenntMessageType.FAIL} />}
          />
          <Route
            path="/error"
            element={<PaymentMessage title="Payment error" type={PaymenntMessageType.ERROR} />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default AppRouter;
