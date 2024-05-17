// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../Redux/actions/authActions";

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     let loading = useSelector((state) => state.auth.loading);
//     const auth = useSelector((state) => state.auth.user);
//     console.log("auth", auth);
//     const [selectedUserType, setSelectedUserType] = useState(null);
//     const [user, setUser] = useState({
//         name: "",
//         password: "",
//     });
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (auth) {
//             if (auth.admin?.position === 1) {
//                 navigate('/app/dashboard');
//             } else if (auth.company?.position === 2) {
//                 navigate('/app/dashboard');
//             } else if (auth.pm?.position === 3) {
//                 navigate('/app/dashboard');
//             }
//         } else {
//             // Handle the case when user data is not available in localStorage
//         }
//     }, [auth]);

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };

//     const handleOnSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedUserType) {
//             toast.error("Please select user type.");
//             return;
//         }
//         try {
//             const loginDetails = {
//                 "name": user.name,
//                 "password": user.password
//             };
//             dispatch(loginUser({ loginDetails, selectedUserType }));

//             // dispatch(login(loginDetails, selectedUserType));
//         } catch (error) {
//             console.error("Error:", error);
//             setError("An error occurred during the login. Please try again later.");
//         }
//     };

//     const handleButtonClick = (buttonName) => {
//         setSelectedUserType(buttonName);
//     };

//     return (
//         <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
//             <div className="col-lg-4 col-md-6 col-sm-8 border rounded p-4 bg-white shadow-lg">
//                 <h1 className="font-weight-bold text-center mb-4">Login</h1>
//                 <form onSubmit={handleOnSubmit}>
//                     {error && <div className="alert alert-danger text-center">{error}</div>}
//                     <div className="mb-3">
//                         <label className="form-label font-weight-bold">Email Address</label>
//                         <input
//                             type="name"
//                             name="name"
//                             className="form-control"
//                             placeholder="Enter name"
//                             value={user.name}
//                             onChange={handleOnChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label font-weight-bold">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             className="form-control"
//                             placeholder="Password"
//                             value={user.password}
//                             onChange={handleOnChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary btn-block mb-3" disabled={loading}>
//                         {loading ? "Loading..." : "Login"}
//                     </button>
//                 </form>
//                 {/* <div className="d-flex justify-content-center">
//                     <button className={`btn btn-${selectedUserType === 'admin' ? 'danger' : 'secondary'} shadow mx-1`} onClick={() => handleButtonClick('admin')}>Admin</button>
//                     <button className={`btn btn-${selectedUserType === 'company' ? 'danger' : 'secondary'} shadow mx-1`} onClick={() => handleButtonClick('company')}>Company</button>
//                     <button className={`btn btn-${selectedUserType === 'pm' ? 'danger' : 'secondary'} shadow mx-1`} onClick={() => handleButtonClick('pm')}>Pm</button>
//                 </div> */}

//                 <div className="d-flex justify-content-center">
//                     <button className={`btn btn-${selectedUserType === 'admin' ? 'outline-danger' : 'outline-secondary'} shadow mx-1`} onClick={() => handleButtonClick('admin')}><b>Admin</b></button>
//                     <button className={`btn btn-${selectedUserType === 'company' ? 'outline-danger' : 'outline-secondary'} shadow mx-1`} onClick={() => handleButtonClick('company')}><b>Company</b></button>
//                     <button className={`btn btn-${selectedUserType === 'pm' ? 'outline-danger' : 'outline-secondary'} shadow mx-1`} onClick={() => handleButtonClick('pm')}><b>Pm</b></button>
//                 </div>
//                 <div className="mt-3 text-center">
//                     <Link to="/" className="text-primary">Home</Link>
//                 </div>
//             </div>
//         </div>
//     );

// };

// export default Login;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/actions/authActions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedUserType, setSelectedUserType] = useState("");
    const [user, setUser] = useState({
        name: "",
        password: "",
    });
    const [error, setError] = useState("");
    const loading = useSelector((state) => state.auth.loading);
    const auth = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (auth) {
            
            // switch (true) {
            //     case (auth.admin?.position === 1):
            //         navigate('/app/dashboard');
            //         break;
            //     case (auth.company?.position === 2):
            //         navigate('/app/dashboard');
            //         break;
            //     case (auth.pm?.position === 3):
            //         navigate('/app/dashboard');
            //         break;
            //     default:
            //         // Handle the case when user data is not available in localStorage
            //         break;
            // }
        }
    }, [auth, navigate]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserType) {
            toast.error("Please select user type.");
            return;
        }
        try {
            const loginDetails = {
                "name": user.name,
                "password": user.password
            };
            dispatch(loginUser({ loginDetails, selectedUserType }));
            navigate('/app/dashboard');
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred during the login. Please try again later.");
        }
    };

    const handleButtonClick = (buttonName) => {
        setSelectedUserType(buttonName);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="col-lg-4 col-md-6 col-sm-8 border rounded p-4 bg-white shadow-lg">
                <h1 className="font-weight-bold text-center mb-4">Login</h1>
                <form onSubmit={handleOnSubmit}>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label font-weight-bold">username</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter name"
                            value={user.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label font-weight-bold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <Form.Select value={selectedUserType} onChange={(e) => handleButtonClick(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="admin">Admin</option>
                        <option value="company">Company</option>
                        <option value="pm">PM</option>
                    </Form.Select>
                    <br />
                    <button type="submit" className="btn btn-primary btn-block mb-3" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <Link to="/" className="text-primary">Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
