import React from 'react';
import AppRouter from './AppRouter';
import { UserProvider } from './state/state';

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
