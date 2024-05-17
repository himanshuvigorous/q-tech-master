import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import { editUser } from '../../Redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateCompanyModal = ({ isModalOpen, closeModal, data }) => {

    const auth = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [companyFormData, setCompanyFormData] = useState({
        name: '',
        mobile: '',
        registration_number: '',
        email: '',
        // password: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        industry: '',
        services: [],
        employees_count: 0,
        website: '',
        hr: '',
        director: []
    });

    useEffect(() => {
        if (data) {
            setCompanyFormData(data);
        } else {
            // If data is not available, set empty values
            setCompanyFormData({
                name: '',
                mobile: '',
                registration_number: '',
                email: '',
                // password: '',
                address: '',
                city: '',
                state: '',
                country: '',
                postal_code: '',
                industry: '',
                services: [],
                employees_count: 0,
                website: '',
                hr: '',
                director: []
            });
        }
    }, [data]);

    const updateCompany = async (e) => {
        e.preventDefault();
        try {
            if (companyFormData) {
                const userData = {
                    name: companyFormData.name,
                    mobile: companyFormData.mobile,
                    registration_number: companyFormData.registration_number,
                    email: companyFormData.email,
                    // password: companyFormData.password,
                    address: companyFormData.address,
                    city: companyFormData.city,
                    state: companyFormData.state,
                    country: companyFormData.country,
                    postal_code: companyFormData.postal_code,
                    industry: companyFormData.industry,
                    services: companyFormData.services,
                    employees_count: companyFormData.employees_count,
                    website: companyFormData.website,
                    hr: companyFormData.hr,
                    director: companyFormData.director
                }

                let selectedUserType = '';
                if (auth?.admin) selectedUserType = "admin";
                else if (auth?.company) selectedUserType = "company";
                else if (auth?.pm) selectedUserType = "pm";

                dispatch(editUser({ userData, selectedUserType }));
                // const response = await httpPost(`api/company/updatecompany`, data);
                // if (response && response.success) {
                //     toast.success(response.message);
                //     closeModal();
                // } else {
                //     toast.error(response.message);
                // }
            }

        } catch (error) {
            console.error('Error updating company:', error);
            toast.error('Failed to update company. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            // Handle nested fields
            const [parent, child] = name.split('.');
            setCompanyFormData(prevState => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: value
                }
            }));
        } else {
            // Handle non-nested fields
            setCompanyFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <MdArrowBack onClick={() => closeModal()} size={20} />
                                <h5 className="modal-title">Update Company Details</h5>
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
                                        <label className='mb-2 labelFont'>Services</label>
                                        <input type="text" name="services" placeholder="Services" className="form-control"
                                            value={companyFormData.services.join(',')}
                                            onChange={(e) => setCompanyFormData({ ...companyFormData, services: e.target.value.split(',') })}
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
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Directors</label>
                                        <input type="text" name="director" placeholder="Directors" className="form-control"
                                            value={companyFormData.director.join(',')}
                                            onChange={(e) => setCompanyFormData({ ...companyFormData, director: e.target.value.split(',') })}
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

export default UpdateCompanyModal;


