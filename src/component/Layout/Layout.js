import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
// import Dashboard from '../AdminLayout/AdminDashboard';
import './Layout.css';
import '../../App.css';
import Company from '../../pages/Company';
import Pm from '../../pages/Pm';
import Leads from '../../pages/Leads';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';
// import PmDashboard from '../PmLayout/PmDashboard';
import { fetchUsers } from '../../Redux/actions/usersActions';
import Profile from '../../pages/Profile';
import Project from '../../pages/Project';
import Employee from '../../pages/Employee';
import Account from '../../pages/Account';
import Tl from '../../pages/Tl';
import AccountStatement from '../../pages/AccountStatement';
import Report from '../../pages/Report';
import Payment from '../../pages/Payment';
import CasinoPlayer from '../../pages/CasinoPlayer';


function Layout() {
  const [open, setOpen] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/");
  //   }
  // }, [auth]);
  if (!auth) {
    navigate("/");
  }

  // useEffect(() => {
  //   if (auth) {
  //     let type = '';
  //     if (auth?.admin) type = "admin";
  //     else if (auth?.company) type = "company";
  //     else if (auth?.pm) type = "pm";

  //     dispatch(fetchUsers({ type }));
  //     setApiCalled(true);
  //   }
  // }, [auth]);

  return (
    <section className='mainView'>
      <div className='leftView'>
        <Sidebar open={open} setOpen={setOpen} />
      </div>
      <div className='rightView'>
        <Header setOpen={setOpen} open={open} />
        <Routes>
          {auth  && (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/company' element={<Company  />} />
              <Route path='/pm' element={<Pm  />} />
              <Route path='/tl' element={<Tl  />} />
              <Route path='/leads' element={<Leads  />} />
              <Route path='/profile' element={<Profile  />} />
              <Route path='/project' element={<Project  />} />
              <Route path='/employee' element={<Employee  />} />
              <Route path='/casinoPlayer' element={<CasinoPlayer />} />
            </>
          )}
          {auth?.user && auth.user.position === 2 && (
            <>
              <Route path='/dashboard' element={<Dashboard  />} />
              <Route path='/pm' element={<Pm  />} />
              <Route path='/tl' element={<Tl  />} />
              <Route path='/leads' element={<Leads  />} />
              <Route path='/profile' element={<Profile  />} />
              <Route path='/project' element={<Project  />} />
              <Route path='/employee' element={<Employee  />} />
              <Route path='/account' element={<Account  />} />
              <Route path='/accountstatement' element={<AccountStatement  />} />
              <Route path='/report' element={<Report  />} />
              <Route path='/payment' element={<Payment  />} />

            </>
          )}
          {auth?.user && auth.user.position === 3 && (
            <>
              <Route path='/dashboard' element={<Dashboard  />} />
              <Route path='/tl' element={<Tl  />} />
              <Route path='/leads' element={<Leads  />} />
              <Route path='/profile' element={<Profile  />} />

            </>
          )}
          {auth?.user && auth.user.position === 4 && (
            <>
              <Route path='/dashboard' element={<Dashboard  />} />
              <Route path='/tl' element={<Tl  />} />
              <Route path='/leads' element={<Leads  />} />
              <Route path='/profile' element={<Profile  />} />
            </>
          )}
        </Routes>
      </div>
    </section>
  );
}

export default Layout;
