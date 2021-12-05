import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Component from './Component';
import ApiKeysOverview from './pages/ApiKeysOverview';
import ChoosePaymentProvider from './pages/ChoosePaymentProvider';
import ConfigureApiKey from './pages/ConfigureApiKey';

const AppRouter: FC<Record<string, never>> = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Component />} />
      <Route path="/choose-provider/:apiKey/:link" element={<ChoosePaymentProvider />} />

      <Route path="/api-keys" element={<ApiKeysOverview />} />
      <Route path="/api-keys/:apiKey" element={<ConfigureApiKey />} />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
