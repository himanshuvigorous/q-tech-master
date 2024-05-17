// import React, { useState } from 'react';
// import { MdArrowBack } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { httpPost } from '../../Helper/Helper';

// const UpdateAdminModal = ({ isModalOpen, closeModal , data }) => {
//     const [adminFormData, setAdminFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         mobile: '',
//         address: '',
//         city: '',
//         state: '',
//         country: '',
//         postal_code: ''
//     });

// const updateAdmin = async (e) => {
//     e.preventDefault();
//     try {
//         if (adminFormData) {
//             const data = {
//                 name: adminFormData.name,
//                 email: adminFormData.email,
//                 password: adminFormData.password,
//                 mobile: adminFormData.mobile,
//                 address: adminFormData.address,
//                 city: adminFormData.city,
//                 state: adminFormData.state,
//                 country: adminFormData.country,
//                 postal_code: adminFormData.postal_code
//             }
//             const response = await httpPost('api/admin/updateadmin', data);
//             if (response && response.success) {
//                 toast.success(response.message);
//                 closeModal();
//             } else {
//                 toast.error(response.message || 'Failed to update admin');
//             }

//         }

//     } catch (error) {
//         console.error('Error updating admin:', error);
//         toast.error('Failed to update admin. Please try again.');
//     }
// };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setAdminFormData({ ...adminFormData, [name]: value });
//     };

//     const resetFormData = () => {
//         setAdminFormData({
//             name: '',
//             email: '',
//             password: '',
//             mobile: '',
//             address: '',
//             city: '',
//             state: '',
//             country: '',
//             postal_code: ''
//         });
//     };

//     return (
//         <>
//             {isModalOpen && (
//                 <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
//                     <div className="modal-dialog modal-dialog-centered" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <MdArrowBack onClick={closeModal} size={20} />
//                                 <h5 className="modal-title">Update Admin Details</h5>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={updateAdmin}>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Name</label>
//                                         <input type="text" name="name" placeholder="Admin Name" className="form-control"
//                                             value={adminFormData.name}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Email</label>
//                                         <input type="email" name="email" placeholder="Email" className="form-control"
//                                             value={adminFormData.email}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Mobile</label>
//                                         <input type="text" name="mobile" placeholder="Mobile" className="form-control"
//                                             value={adminFormData.mobile}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Password</label>
//                                         <input type="password" name="password" placeholder="Password" className="form-control"
//                                             value={adminFormData.password}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Address</label>
//                                         <input type="text" name="address" placeholder="Address" className="form-control"
//                                             value={adminFormData.address}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>City</label>
//                                         <input type="text" name="city" placeholder="City" className="form-control"
//                                             value={adminFormData.city}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>State</label>
//                                         <input type="text" name="state" placeholder="State" className="form-control"
//                                             value={adminFormData.state}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Country</label>
//                                         <input type="text" name="country" placeholder="Country" className="form-control"
//                                             value={adminFormData.country}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Postal Code</label>
//                                         <input type="text" name="postal_code" placeholder="Postal Code" className="form-control"
//                                             value={adminFormData.postal_code}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <button type="submit" className="btn btn-primary mt-4">Update</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default UpdateAdminModal;



import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../Redux/actions/authActions';

const UpdateAdminModal = ({ isModalOpen, closeModal, data }) => {
    const auth = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [adminFormData, setAdminFormData] = useState({
        name: '',
        email: '',
        // password: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
    });

    // Update form data with received data when the component mounts
    useEffect(() => {
        if (data) {
            setAdminFormData(data);
        }
    }, [data]);

    // const updateAdmin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (adminFormData) {
    //             const response = await httpPost('api/admin/updateadmin', adminFormData);
    //             if (response && response.success) {
    //                 toast.success(response.message);
    //                 closeModal();
    //             } else {
    //                 toast.error(response.message || 'Failed to update admin');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error updating admin:', error);
    //         toast.error('Failed to update admin. Please try again.');
    //     }
    // };

    const updateAdmin = async (e) => {
        e.preventDefault();
        try {
            if (adminFormData) {
                const userData = {
                    name: adminFormData.name,
                    email: adminFormData.email,
                    // password: adminFormData.password,
                    mobile: adminFormData.mobile,
                    address: adminFormData.address,
                    city: adminFormData.city,
                    state: adminFormData.state,
                    country: adminFormData.country,
                    postal_code: adminFormData.postal_code
                }

                let selectedUserType = '';
                if (auth?.admin) selectedUserType = "admin";
                else if (auth?.company) selectedUserType = "company";
                else if (auth?.pm) selectedUserType = "pm";

                dispatch(editUser({ userData, selectedUserType }));
                // const response = await httpPost('api/admin/updateadmin', data);
                // if (response && response.success) {
                //     toast.success(response.message);
                //     closeModal();
                // } else {
                //     toast.error(response.message || 'Failed to update admin');
                // }

            }

        } catch (error) {
            console.error('Error updating admin:', error);
            toast.error('Failed to update admin. Please try again.');
        }
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminFormData({ ...adminFormData, [name]: value });
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <MdArrowBack onClick={closeModal} size={20} />
                                <h5 className="modal-title">Update Admin Details</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateAdmin}>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Name</label>
                                        <input type="text" name="name" placeholder="Admin Name" required className="form-control"
                                            value={adminFormData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Email</label>
                                        <input type="email" name="email" placeholder="Email" required className="form-control"
                                            value={adminFormData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Mobile</label>
                                        <input type="text" name="mobile" placeholder="Mobile" required className="form-control"
                                            value={adminFormData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {/* <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Password</label>
                                        <input type="password" name="password" placeholder="Password" required className="form-control"
                                            value={adminFormData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Address</label>
                                        <input type="text" name="address" placeholder="Address" className="form-control"
                                            value={adminFormData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>City</label>
                                        <input type="text" name="city" placeholder="City" className="form-control"
                                            value={adminFormData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>State</label>
                                        <input type="text" name="state" placeholder="State" className="form-control"
                                            value={adminFormData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Country</label>
                                        <input type="text" name="country" placeholder="Country" className="form-control"
                                            value={adminFormData.country}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Postal Code</label>
                                        <input type="text" name="postal_code" placeholder="Postal Code" className="form-control"
                                            value={adminFormData.postal_code}
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

export default UpdateAdminModal;
