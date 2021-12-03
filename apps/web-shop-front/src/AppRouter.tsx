import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Categories from './pages/Categories'
import Category from "./pages/Category"
import Product from "./pages/Product"

const AppRouter: FC<Record<string, never>> = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/category" element={<Category />} />
    <Route path="/product" element={<Product />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="invoices" element={<div />} />
  </Routes>
);
export default AppRouter;
