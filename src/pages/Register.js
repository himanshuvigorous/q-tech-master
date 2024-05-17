import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { httpPost } from "../Helper/Helper";
import logo from "../Images/logo.png";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineLockOpen } from "react-icons/md";
function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const auth = useSelector((state) => state.auth);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const loginDetails = {
                "name": user.name,
                "email": user.email,
                "mobile": user.mobile,
                "password": user.password,
                "cpassword": user.cpassword
            };
            const response = await httpPost('api/admin/createAdmin', loginDetails);
            if (response) {
                setUser({
                    name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    cpassword: ""
                });
                navigate("/");
                toast.success(response.message)
            } else {
                setError("Registration failed. Please check your details.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred during registration. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="homeMainView">
            <div className="leftSection">
                <div className="dataView">
                    <img src={logo} alt="IDURAR ERP CRM" height="70" width="220" />
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
                        <img src={logo} alt="IDURAR ERP CRM" height="70" width="220" />
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        {error && <div className="alert alert-danger text-center">{error}</div>}
                        <h1 className="font-weight-bold text-center mb-4">Admin Register</h1>
                        <div className="mb-3">
                            <label className="form-label font-weight-bold">Full Name:</label>
                            <input type="text" name="name" className="form-control" placeholder="Enter Name" value={user.name} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-weight-bold">Email:</label>
                            <input type="email" name="email" className="form-control" placeholder="Enter Email" value={user.email} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-weight-bold">Mobile:</label>
                            <input type="text" name="mobile" className="form-control" placeholder="Enter Mobile" value={user.mobile} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-weight-bold">Password:</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter Password" value={user.password} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-weight-bold">Confirm Password:</label>
                            <input type="password" name="cpassword" className="form-control" placeholder="Confirm Password" value={user.cpassword} onChange={handleOnChange} required />
                        </div>
                        {loading ? (
                            <button className="btn btn-primary btn-block mb-3" type="submit" disabled>Loading...</button>
                        ) : (
                            <button className="btn btn-primary btn-block mb-3" type="submit">Register</button>
                        )}
                    </form>
                    <div className="text-center">
                        Already have an account? <Link to="/" className="text-primary">Login</Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/" className="text-primary">Home</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
