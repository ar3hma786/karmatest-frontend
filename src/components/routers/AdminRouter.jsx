import React from 'react';
import { Route, Routes, useLocation, matchPath } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LoginForm from '../auth/LoginForm';
import AdminDashboard from '../admindashboard/AdminDashboard';
import AddSale from '../admindashboard/AddSale';
import EditSale from '../admindashboard/EditSale';

function AdminRouter() {
  const location = useLocation();

  const adminPaths = ['/admin', '/add-sale', '/update-sale/:saleId'];

 
  const isAdminPage = adminPaths.some((path) => matchPath({ path, end: true }, location.pathname));

  return (
    <div>
      {!isAdminPage && <Header />}
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-sale" element={<AddSale />} />
        <Route path="/update-sale/:saleId" element={<EditSale />} /> {/* Include saleId as a parameter */}
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default AdminRouter;
