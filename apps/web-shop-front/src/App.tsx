import { ApolloProvider } from '@apollo/client';
import { Navbar } from '@team21/ui-components';
import React from 'react';
import AppRouter from './AppRouter';
import createApolloClient from './graphql/clients';
import { BrowserRouter } from 'react-router-dom';

const routes = [
  {name:'Home', path:'/'},
  {name:'Categories', path:'/categories'},
  {name:'Login', path:'/login'},
  {name:'Register', path:'/register'},
]

function App() {
  return (
    <ApolloProvider client={createApolloClient()}>
      <BrowserRouter>
        <Navbar links={routes}/>
        <AppRouter />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
