import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
// import Dashboard from './component/AdminLayout/AdminDashboard';
// import CompanyDashboard from './component/CompanyLayout/CompanyDashboard';
// import ClientDashboard from './component/ClientLayout/ClientDashboard';
import Home from './component/HomePage/Home';
// import { NoPageFound } from './component/NoPageFound/NoPageFound';
// import CompanyAllClientsLeads from './component/LeadsPage/CompanyAllClientsLeads';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Layout from './component/Layout/Layout';
import Company from './pages/Company';


function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app/*" element={<PrivateRoute element={<Layout />} />} />
        {/* <Route path="/company" element={<PrivateRoute element={<Company />} />} /> */}
      </Routes>
    </React.Fragment>
  );
}
export default App;
