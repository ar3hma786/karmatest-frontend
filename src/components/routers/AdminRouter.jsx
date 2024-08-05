import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import LoginForm from '../auth/LoginForm'
import AdminDashboard from '../admindashboard/AdminDashboard'
import { Route, Routes } from 'react-router-dom'


function AdminRouter() {
  return (
    <div>
        <Header/>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer/>
    </div>
  )
}

export default AdminRouter