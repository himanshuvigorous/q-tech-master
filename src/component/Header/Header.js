import React, { useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa";
import './Header.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineCustomerService } from "react-icons/ai";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserImg from '../../Images/user_img.jpg';
import { IoMdMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [side, setSide] = useState(false)
    const [userData, setUserData] = useState();
    const auth = useSelector((state) => state.auth.user);
    let { setOpen } = props;

    const openSide = () => {
        setSide(true);
    }

    const userLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    let pathname = location?.pathname?.split('/').pop().replace(/^\w/, c => c.toUpperCase());

    return (
        <div className="headerMain">
            <div className='container-fluid'>
                <div className="row align-items-center">
                    <div className="col-md-6 col-2 d-flex align-items-center">
                        <div className='mobileMenu'>
                            <IoMdMenu className="" size={25} onClick={() => props.setOpen(prevOpen => !prevOpen)} />
                        </div>
                        <div className='headHeading'>
                            <h3> {pathname}</h3>
                        </div>
                    </div>
                    <div className="col-md-6 col-10 d-flex justify-content-end align-items-center gap-3">

                        <div className="ml-2 bell-icon">
                            <FaBell />
                        </div>
                        <div className="rounded-circle overflow-hidden">
                            <Dropdown>
                                <Dropdown.Toggle variant="" className='dropBTn d-flex align-items-center' id="dropdown-basic">
                                    <img src={UserImg} alt="Profile" className="img-fluid profile rounded-circle" />
                                    {/* <div className='userDet pr-0'>
                                        <h5 className="mat-subtitle-2 f-w-600">{auth?.user.name}</h5>
                                        <span className='f-s-12'>{auth?.user.userType}</span>
                                    </div> */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='headerMenuModal'>
                                    <Dropdown.Item >
                                        <div className='headMDflex'>
                                            <img src={UserImg} alt="Profile" className="img-fluid profile rounded-circle" />
                                            <div className='headUserDetail'>
                                                <p>{auth?.user?.name}</p>
                                                <span>{auth?.user?.email}</span>
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item >{auth?.user.name}</Dropdown.Item> */}
                                    <Dropdown.Item ><Link to="profile"><FaRegUser size={11} className='mr-3' /> Profile</Link></Dropdown.Item>
                                    <Dropdown.Item href="#/action-2"><FaRegUser size={11} className='mr-3' /> Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3"><FaRegUser size={11} className='mr-3' /> Something else</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => userLogout()}><IoMdLogOut size={14} className='mr-3' /> Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header