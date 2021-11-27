import React, { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const AppRouter: FC<Record<string, never>> = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product/{id}" element={<div />} />
      <Route path="invoices" element={<div />} />
    </Routes>
  </HashRouter>
);
export default AppRouter;
