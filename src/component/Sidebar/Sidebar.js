import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../Images/logo.png';
import UserImg from '../../Images/user_img.jpg';
import { AiOutlineDashboard, AiOutlineCustomerService, AiOutlineBank, AiOutlineFilter } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import { TbDiscount2, TbFileInvoice } from "react-icons/tb";
import { MdOutlinePayment, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoMdClose, IoMdCloudCircle, IoMdMenu } from 'react-icons/io';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/actions/authActions';
import { MdCasino } from "react-icons/md";
import Logo from '../Logo/Logo';
import { CgProfile } from 'react-icons/cg';

function Sidebar(props) {
  const auth = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState();
  // const auth = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   if (auth) {
  //     setUserData(auth);
  //   }
  // }, [auth]);
  let [isShowBank, setShowBank] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = () => {
    localStorage.clear()
    navigate("/")
  };
  const userType = JSON.parse(localStorage.getItem("user")).data.userType

  return (
    <>
      <section className={`sideWidth ${props.open ? 'block' : 'hidden'}`}>
        <div className={`sideMain ${props.open ? 'block' : 'hidden'}`}
          onClick={() => props.setOpen(false)}>
          <div className='sideMenu'>
            <div className={`menuMicon ${props.open ? 'block' : 'hidden'}`}>
              <IoMdClose className="" size={25} onClick={() => props.setOpen(false)} />
            </div>
            <div className='logo mb-3'>
              {/* <img src={logo} height="55" width="150" /> */}
              <Logo width='100px' height="100px" />
            </div>
            <div className='acOpen'>
              <span>{auth?.user?.userType}</span>
              {/* <p>{auth.admin.name}</p> */}
            </div>
            {auth  && (
              <ul className='menuHScroll'>
                <li>
                  <Link to='/app/dashboard' className='menuBtn'>
                    <AiOutlineDashboard className='menuIcon' />
                    Dashboard
                  </Link>
                </li>
            
                 {userType==="superadmin" && <li>
                  <Link to='/app/company' className='menuBtn'>
                    <AiOutlineBank className='menuIcon' />
                    Company List
                  </Link>
                </li>}
                {userType==="superadmin" && <li>
                  <Link to='/app/casinolist' className='menuBtn'>
                    <MdCasino className='menuIcon' />
                    Casino List
                  </Link>
                </li>}
                <li>
                  <Link to='/app/tl' className='menuBtn'>
                    <LuUser2 className='menuIcon' />
                    TL
                  </Link>
                </li>
                 {/*<li>
                  <Link to='/app/employee' className='menuBtn'>
                    <LuUser2 className='menuIcon' />
                    Employee
                  </Link>
                </li>

                <li>
                  <Link to='/app/leads' className='menuBtn'>
                    <AiOutlineFilter className='menuIcon' />
                    Leads
                  </Link>
                </li>
                <li>
                  <Link to='/app/profile' className='menuBtn'>
                    <AiOutlineDashboard className='menuIcon' />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to='/app/project' className='menuBtn'>
                    <AiOutlineDashboard className='menuIcon' />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to='' className='menuBtn'>
                    <TbFileInvoice className='menuIcon' />
                    Invoices
                  </Link>
                </li>
                <li>
                  <Link to='/app/account' className='menuBtn'>
                    <MdOutlinePayment className='menuIcon' />
                   
                    Account
                  </Link>
                </li>
                <li>
                  <Link to='' className='menuBtn'>
                    <MdOutlineProductionQuantityLimits className='menuIcon' />
                    Products
                  </Link>
                </li> */}
              </ul>
            )}
            <div className="m-t-auto  profile-bar ">
              <div className="bg-light-accent d-flex align-items-center justify-content-between  rounded">
                {/* <img src={UserImg} width="40" className="rounded-circle" /> */}
                <CgProfile size={30} />
                <div className="userDet">
                  {/* <h5 className="mat-subtitle-2 f-w-600">{userData?.name}</h5>
                  <span className='f-s-12'>{userData?.userType}</span> */}
                  Logout User
                </div>
                <div className="m-l-auto">
                  <a className="d-flex justify-content-center mdc-icon-button mat-mdc-icon-button mat-unthemed mat-mdc-button-base" >
                    <RiLogoutCircleRLine className='cursor-pointer' href="" onClick={() => userLogout()} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sidebar