import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LoginForm from '../auth/LoginForm';
import AdminDashboard from '../admindashboard/AdminDashboard';
import AddSale from '../admindashboard/AddSale';

function AdminRouter() {
  const location = useLocation();

  // Check if the current path is the Admin Dashboard
  const isAdminDashboard = location.pathname === '/admin';
  const isAddSale = location.pathname === '/add-sale'

  return (
    <div>
      {!isAdminDashboard && !isAddSale && <Header />}
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-sale" element={<AddSale/>} />
      </Routes>
      {!isAdminDashboard && !isAddSale && <Footer />}
    </div>
  );
}

export default AdminRouter;
