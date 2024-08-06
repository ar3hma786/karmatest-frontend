import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LoginForm from '../auth/LoginForm';
import AdminDashboard from '../admindashboard/AdminDashboard';

function AdminRouter() {
  const location = useLocation();

  // Check if the current path is the Admin Dashboard
  const isAdminDashboard = location.pathname === '/admin';

  return (
    <div>
      {!isAdminDashboard && <Header />}
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminDashboard && <Footer />}
    </div>
  );
}

export default AdminRouter;
