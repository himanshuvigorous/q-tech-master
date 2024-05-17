import React, { useState } from 'react';

import "./model.css";
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/actions/authActions';
const UpdateProfile = ({ isModalOpen, closeModal }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [companyFormData, setCompanyFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    });

    const createCompany = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost('api/company/updatecompany', companyFormData);
            if (response) {
                toast.success(response.message)
                closeMyModal()
            }
            window.location.reload();
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyFormData({ ...companyFormData, [name]: value });
    };

    function closeMyModal() {
        closeModal();
        setCompanyFormData({
            name: '',
            email: '',
            password: '',
            mobile: ''
        })
    }

    const userLogout = () => {
        dispatch(logoutUser());
        navigate("/")
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <MdArrowBack onClick={() => closeModal()} size={20} />
                                <h5 className="modal-title">Create New Company</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={createCompany}>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Name</label>
                                        <input type="text" name="name" placeholder="Company Name" required className="form-control"
                                            value={companyFormData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Email</label>
                                        <input type="email" name="email" placeholder="Email" required className="form-control"
                                            value={companyFormData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Contact</label>
                                        <input type="number" name="mobile" placeholder="Contact" required className="form-control"
                                            value={companyFormData.mobile}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Password</label>
                                        <input type="password" name="password" placeholder="Password" required className="form-control"
                                            value={companyFormData.password}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Country</label>
                                        <input type="text" name="Country" placeholder="Country" className="form-control"
                                        // value={companyFormData.mobile}
                                        // onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form=group mt-4'>
                                        <label className='mb-2 labelFont'>Website</label>
                                        <div className="ant-input-wrapper ant-input-group css-16v3ahg">
                                            <span className="ant-input-group-addon">http://</span>
                                            <input type="text" name="Country" placeholder="Website" className="form-control"
                                            // value={companyFormData.mobile}
                                            // onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-4">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdateProfile;