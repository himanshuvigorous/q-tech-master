import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateBankAccount = ({ isEditModalOpen, closeModal, accountToEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [bankAccountData, setBankAccountData] = useState({
        _id: '',
        holder_name: '',
        account_no: '',
        branch: '',
        ifsc: '',
        mobile: '',
        address: '',
        defaultStatus: ''
    });

    useEffect(() => {
        if (accountToEdit) {
            setBankAccountData(accountToEdit);
        } else {
            setBankAccountData({
                _id: '',
                holder_name: '',
                account_no: '',
                branch: '',
                ifsc: '',
                mobile: '',
                address: '',
                defaultStatus: ''
            });
        }
    }, [accountToEdit]);

    const updateBankAccount = async (e) => {
        e.preventDefault();
        try {
            if (bankAccountData) {
                const data = {
                    _id: bankAccountData._id,
                    holder_name: bankAccountData.holder_name,
                    account_no: bankAccountData.account_no,
                    branch: bankAccountData.branch,
                    ifsc: bankAccountData.ifsc,
                    mobile: bankAccountData.mobile,
                    address: bankAccountData.address,
                    defaultStatus: bankAccountData.defaultStatus
                }
                const response = await httpPost('/company/updatebankaccount', data);
                if (response && response.success) {
                    toast.success(response.message);
                    closeModal();
                    window.location.reload();
                } else {
                    toast.error(response.message);
                }
            }


        } catch (error) {
            console.error('Error updating bank account:', error);
            toast.error('Failed to update bank account. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankAccountData(prevState => ({
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
                                <h5 className="modal-title">Update Bank Account Details</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateBankAccount}>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Holder Name</label>
                                        <input type="text" name="holder_name" placeholder="Holder Name" required className="form-control"
                                            value={bankAccountData.holder_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Account Number</label>
                                        <input type="text" name="account_no" placeholder="Account Number" required className="form-control"
                                            value={bankAccountData.account_no}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Branch</label>
                                        <input type="text" name="branch" placeholder="Branch" required className="form-control"
                                            value={bankAccountData.branch}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>IFSC Code</label>
                                        <input type="text" name="ifsc" placeholder="IFSC Code" required className="form-control"
                                            value={bankAccountData.ifsc}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Mobile</label>
                                        <input type="text" name="mobile" placeholder="Mobile" required className="form-control"
                                            value={bankAccountData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Address</label>
                                        <input type="text" name="address" placeholder="Address" required className="form-control"
                                            value={bankAccountData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className='mb-2 labelFont'>Default Status</label>
                                        <select name="defaultStatus" className="form-control"
                                            value={bankAccountData.defaultStatus}
                                            onChange={handleInputChange}
                                        >
                                            <option value="active">Active</option>
                                            <option value="deActive">Deactive</option>
                                        </select>
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

export default UpdateBankAccount;
