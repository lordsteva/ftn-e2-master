import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Component from './Component';
import ChoosePaymentProvider from './pages/ChoosePaymentProvider';

const AppRouter: FC<Record<string, never>> = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Component />} />
      <Route path="/choose-provider/:appId/:link" element={<ChoosePaymentProvider />} />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
