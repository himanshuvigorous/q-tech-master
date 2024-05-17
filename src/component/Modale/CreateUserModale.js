import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';

const CreateUserModale = ({ isModalOpen, closeModal, userType }) => {
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        registration_number: '',
        userType: userType // Set userType from props
    });

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost('/admin/createNewCompany ', userForm);

            if (response && response.success) {
                toast.success(response.message);
                closeModal();
                setUserForm({
                    name: '',
                    email: '',
                    password: '',
                    mobile: '',
                    registration_number: '',
                    userType: userType // Reset userType from props
                });
                window.location.reload();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error creating USER:', error);
            toast.error('Failed to create USER. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <MdArrowBack onClick={() => closeModal()} size={20} />
                                <h5 className="modal-title">Create New User</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={createUser}>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Name</label>
                                        <input type="text" name="name" placeholder="Name" required className="form-control"
                                            value={userForm.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Email</label>
                                        <input type="email" name="email" placeholder="Email" required className="form-control"
                                            value={userForm.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Contact</label>
                                        <input type="text" name="mobile" placeholder="Contact" required className="form-control"
                                            value={userForm.mobile}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Password</label>
                                        <input type="password" name="password" placeholder="Password" required className="form-control"
                                            value={userForm.password}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Registration Number</label>
                                        <input type="text" name="registration_number" placeholder="Registration Number" required className="form-control"
                                            value={userForm.registration_number}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>User Type</label>
                                        <select name="userType" className="form-control" disabled
                                            value={userForm.userType}
                                        // onChange={handleInputChange}
                                        >
                                            <option value="">Select UserType</option>
                                            <option value="company">Company</option>
                                            <option value="employee">Employee</option>
                                            <option value="pm">PM</option>
                                            <option value="tl">TL</option>
                                            <option value="team">Team</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-4">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateUserModale;




// import React, { useState, useEffect } from 'react';
// import { MdArrowBack } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { httpPost } from '../../Helper/Helper';

// const CreateUserModale = ({ isModalOpen, closeModal, userType, userToEdit }) => {
//     const [userForm, setUserForm] = useState({
//         name: '',
//         email: '',
//         password: '',
//         mobile: '',
//         registration_number: '',
//         userType: ""
//     });

//     useEffect(() => {
//         if (userToEdit) {
//             setUserForm(userToEdit);
//         } else {
//             setUserForm({
//                 name: '',
//                 email: '',
//                 // password: '',
//                 mobile: '',
//                 registration_number: '',
//                 userType: userType
//             });
//         }
//     }, [userToEdit, userType]);

//     const submitHandler = userToEdit ? updateUser : createUser;

//     async function createUser(e) {
//         e.preventDefault();
//         try {
//             const response = await httpPost('/user/createUser', userForm);
//             if (response && response.success) {
//                 toast.success(response.message);
//                 closeModal();
//             } else {
//                 toast.error(response.message);
//             }
//         } catch (error) {
//             console.error('Error creating user:', error);
//             toast.error('Failed to create user. Please try again.');
//         }
//     };

//     async function updateUser(e) {
//         e.preventDefault();
//         try {
//             const userData = {
//                 _id: userForm._id,
//                 name: userForm.name,
//                 mobile: userForm.mobile,
//                 registration_number: userForm.registration_number,
//                 email: userForm.email,
//                 password: userForm.password,
//                 status: userForm.state,
//             }

//             // let selectedUserType = '';
//             // if (auth?.admin) selectedUserType = "admin";
//             // else if (auth?.company) selectedUserType = "company";
//             // else if (auth?.pm) selectedUserType = "pm";

//             // dispatch(editUser({ userData, selectedUserType }));
//             const response = await httpPost(`/company/edituser`, userData);
//             if (response && response.success) {
//                 toast.success(response.message);
//                 closeModal();
//             } else {
//                 toast.error(response.message);
//             }
//         } catch (error) {
//             console.error('Error updating user:', error);
//             toast.error('Failed to update user. Please try again.');
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserForm(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     return (
//         <>
//             {isModalOpen && (
//                 <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
//                     <div className="modal-dialog modal-dialog-centered" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <MdArrowBack onClick={() => closeModal()} size={20} />
//                                 <h5 className="modal-title">{userToEdit ? 'Edit User' : 'Create New User'}</h5>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={submitHandler}>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Name</label>
//                                         <input type="text" name="name" placeholder="Name" required className="form-control"
//                                             value={userForm.name}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Email</label>
//                                         <input type="email" name="email" placeholder="Email" required className="form-control"
//                                             value={userForm.email}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Contact</label>
//                                         <input type="text" name="mobile" placeholder="Contact" required className="form-control"
//                                             value={userForm.mobile}
//                                             onChange={handleInputChange} />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Password</label>
//                                         <input type="password" name="password" placeholder="Password" required className="form-control"
//                                             value={userForm.password}
//                                         // onChange={handleInputChange} 
//                                         />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>Registration Number</label>
//                                         <input type="text" name="registration_number" placeholder="Registration Number" required className="form-control"
//                                             value={userForm.registration_number}
//                                             onChange={handleInputChange} />
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <label className='mb-2 labelFont'>User Type</label>
//                                         <select name="userType" className="form-control" disabled
//                                             value={userForm.userType}
//                                         // onChange={handleInputChange}
//                                         >
//                                             <option value="">Select UserType</option>
//                                             <option value="company">Company</option>
//                                             <option value="employee">Employee</option>
//                                             <option value="pm">Pm</option>
//                                             <option value="team">Team</option>
//                                             <option value="Other">Other</option>
//                                         </select>
//                                     </div>

//                                     <button type="submit" className="btn btn-primary mt-4">{userToEdit ? 'Update' : 'Create'}</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default CreateUserModale;



