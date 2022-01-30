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
import Orders from './pages/Orders'
import { useUser } from './state/state';
import PrivateRoute from './components/PrivateRoute';

const AppRouter: FC<Record<string, never>> = () => {
  const [{ token }] = useUser();
  const [apolloClient, setApolloClient] = useState(createApolloClient());
  const [loggedIn, setLoggedIn] = useState(token)

  useEffect(() => {
    setApolloClient(createApolloClient(token));
    setLoggedIn(token)
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
          <Route path="/product" element={<PrivateRoute loggedIn={loggedIn} path="/login"> <ProductPage /> </PrivateRoute> } />
          <Route path="/checkout" element={<PrivateRoute loggedIn={loggedIn} path="/login"> <CheckoutPage /> </PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute loggedIn={loggedIn} path="/login"> <ShoppingCart /> </PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute loggedIn={loggedIn} path="/login"> <Orders /> </PrivateRoute>} />
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
