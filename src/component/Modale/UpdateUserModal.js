import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import { editUser } from '../../Redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateUserModal = ({ isEditModalOpen, closeModal, userToEdit }) => {

    const auth = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [companyFormData, setCompanyFormData] = useState();

    useEffect(() => {
        if (userToEdit) {
            setCompanyFormData(userToEdit);
        }
        else {
            setCompanyFormData({
                name: '',
                mobile: '',
                registration_number: '',
                email: '',
                status: '',
            });
        }
    }, [userToEdit]);

    const updateCompany = async (e) => {
        e.preventDefault();
        try {
            if (companyFormData) {
                const userData = {
                    _id: companyFormData._id,
                    name: companyFormData.name,
                    mobile: companyFormData.mobile,
                    registration_number: companyFormData.registration_number,
                    email: companyFormData.email,
                    status: companyFormData.state,
                }

                const response = await httpPost(`/company/edituser`, userData);
                if (response && response.success) {
                    toast.success(response.message);
                    closeModal();
                    window.location.reload();
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            console.error('Error updating company:', error);
            toast.error('Failed to update company. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            {isEditModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <MdArrowBack onClick={() => closeModal()} size={20} />
                                <h5 className="modal-title">Update User Details</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateCompany}>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Name</label>
                                        <input type="text" name="name" placeholder="Company Name" required className="form-control"
                                            value={companyFormData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Contact Email</label>
                                        <input type="email" name="email" placeholder="Contact Email" required className="form-control"
                                            value={companyFormData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Contact Mobile</label>
                                        <input type="text" name="mobile" placeholder="Contact Mobile" required className="form-control"
                                            value={companyFormData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Registration Number</label>
                                        <input type="text" name="registration_number" placeholder="Registration Number" required className="form-control"
                                            value={companyFormData.registration_number}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>State</label>
                                        <input type="text" name="status" placeholder="Status" className="form-control"
                                            value={companyFormData.status}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-4">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateUserModal;
