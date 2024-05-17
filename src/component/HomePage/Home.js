import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineLockOpen } from "react-icons/md";
import { toast } from "react-toastify";
import { loginUser } from "../../Redux/actions/authActions";
import Logo from "../Logo/Logo";


const Home = () => {
    // const navigate = useNavigate();
    // const auth = useSelector((state) => state.auth.user);

    // useEffect(() => {
    //     if (auth) {
    //         if (auth.admin?.position === 1) {
    //             navigate('/app/dashboard');
    //         } else if (auth.company?.position === 2) {
    //             navigate('/app/dashboard');
    //         } else if (auth.pm?.position === 3) {
    //             navigate('/app/dashboard');
    //         }
    //     } else {
    //         // Handle the case when user data is not available in localStorage
    //     }
    // }, [navigate]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [selectedUserType, setSelectedUserType] = useState("");
    const [user, setUser] = useState({
        name: "",
        password: "",
    });
    const [error, setError] = useState("");
    const loading = useSelector((state) => state.auth.loading);
    const auth = useSelector((state) => state.auth.user);
    const user1 = localStorage.getItem('token');
    useEffect(() => {
        if (user1) {
           return navigate('/app/dashboard');
        } else {
           return navigate('/');
        }
    }, [auth, navigate]);



    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // if (!selectedUserType) {
        //     toast.error("Please select user type.");
        //     return;
        // }
        try {
            const loginDetails = {
                "username": user.name,
                "password": user.password
            };
            dispatch(loginUser({ loginDetails }));
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred during the login. Please try again later.");
        }
    };

    // const handleButtonClick = (buttonName) => {
    //     setSelectedUserType(buttonName);
    // };



    return (
        <div>
            {/* <img src={leadHome} alt="Cover Image" className="w-100" />
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="btn btn-primary me-2" onClick={() => navigate("/register")}>Admin Register</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
            <section className="homeMainView">
                <div className="leftSection">
                    <div className="dataView">
                        {/* <img src={logo} alt="IDURAR ERP CRM" height="70" width="220" /> */}
                        <Logo width='100px' height="100px" />
                        <div className="homeHead">
                            <h3>Manage Your Company With :</h3>
                        </div>
                        <ul className="list-checked">
                            <li className="list-checked-item">
                                <IoCheckmarkDoneOutline size={20} /><p>All In One Tool</p>
                            </li>
                            <li className="list-checked-item">
                                <IoCheckmarkDoneOutline size={20} /><p>Easily Add And Manage Your Services</p>
                            </li>
                            <li className="list-checked-item">
                                <IoCheckmarkDoneOutline size={20} /><p>All In One Tool</p>
                            </li>
                            <li className="list-checked-item">
                                <IoCheckmarkDoneOutline size={20} /><p>Easily Add And Manage Your Services</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rightSection">
                    <div className="dataView">
                        <div className="logoImg">
                            {/* <img src={logo} alt="IDURAR ERP CRM" height="70" width="220" /> */}
                            <Logo width='200px' height="200px" />
                        </div>
                        <h1 className="font-weight-bold text-center mb-4">Login</h1>
                        <form onSubmit={handleOnSubmit} >
                            <div className="mb-3">
                                <label className="form-label font-weight-bold">Email Address</label>
                                <div className="d-flex align-center">
                                    <div className="input-group">
                                        <div className="input-group-text"><LuUser2 size={20} /></div>
                                        <input type="text" name="name" className="form-control" id="autoSizingInputGroup" placeholder="Email"
                                            value={user.name}
                                            onChange={handleOnChange}
                                        // required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label font-weight-bold">Password</label>
                                <div className="d-flex align-center">
                                    <div className="input-group">
                                        <div className="input-group-text"><MdOutlineLockOpen size={20} /></div>
                                        <input type="password" name="password" className="form-control" id="autoSizingInputGroup" placeholder="Password"
                                            value={user.password}
                                            onChange={handleOnChange}
                                        // required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="mb-3">
                                <label className="form-label font-weight-bold"></label>
                                <div className="d-flex align-center">
                                    <div className="input-group">
                                        <Form.Select value={selectedUserType} onChange={(e) => handleButtonClick(e.target.value)}>
                                            <option value="">Select Type</option>
                                            <option value="admin">Admin</option>
                                            <option value="company">Company</option>
                                            <option value="pm">PM</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div> */}

                            <div className="bottomForm">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1" />
                                    <label className="form-check-label" for="gridCheck1">
                                        Remember Me
                                    </label>
                                </div>
                                <div className="forgotTxt">
                                    <p>Forgot Password</p>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-3" disabled={loading}>
                                {loading ? "Loading..." : "Login"}
                            </button>
                            <div className="registeT"><p>Or <a onClick={() => navigate("/register")}>Registor Now <i className="text-primary small">only Admin</i></a></p></div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Home;
