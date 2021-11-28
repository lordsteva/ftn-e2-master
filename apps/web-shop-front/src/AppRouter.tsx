import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

const AppRouter: FC<Record<string, never>> = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="invoices" element={<div />} />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
