import React, { useState, useEffect, useRef } from 'react';
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
    const modalRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };
    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

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
                                 <div className='pop'>
                                 <div className='popMain'  ref={modalRef} >
                                   <div className='popHeader'>
                                   <MdArrowBack onClick={() => closeModal()} size={20} />
                                  <h5 className="">Update Company Details</h5>
                                   </div>
                                   <div className='popCreateContainer'>
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
                   <label className='mb-2 labelFont'>Address</label>
                   <input type="text" name="address" placeholder="address" className="form-control"
                       value={companyFormData.address}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>City</label>
                   <input type="text" name="city" placeholder="City" className="form-control"
                       value={companyFormData.city}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>State</label>
                   <input type="text" name="state" placeholder="State" className="form-control"
                       value={companyFormData.state}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>Country</label>
                   <input type="text" name="country" placeholder="Country" className="form-control"
                       value={companyFormData.country}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>Postal Code</label>
                   <input type="text" name="postal_code" placeholder="Postal Code" className="form-control"
                       value={companyFormData.postal_code}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>Industry</label>
                   <input type="text" name="industry" placeholder="Industry" className="form-control"
                       value={companyFormData.industry}
                       onChange={handleInputChange}
                   />
               </div>
               
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>Number of Employees</label>
                   <input type="number" name="employees_count" placeholder="Number of Employees" className="form-control"
                       value={companyFormData.employees_count}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>Website</label>
                   <input type="text" name="website" placeholder="Website" className="form-control"
                       value={companyFormData.website}
                       onChange={handleInputChange}
                   />
               </div>
               <div className="form-group mt-4">
                   <label className='mb-2 labelFont'>HR</label>
                   <input type="text" name="hr" placeholder="HR" className="form-control"
                       value={companyFormData.hr}
                       onChange={handleInputChange}
                   />
               </div>
            
               <button type="submit" className="btn btn-primary mt-4" style={{backgroundColor:"rgb(25, 47, 59)"}}>Update</button>
               </form>   
                                   </div>
                                 </div>
                             </div>
            )}
        </>
    );
}

export default UpdateUserModal;
