import React, { useState } from 'react';
import "./model.css";
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';

const CreateBankAccount = ({ isModalOpen, closeModal }) => {
  const [bankAccountData, setBankAccountData] = useState({
    holder_name: '',
    account_no: '',
    confirm_no: '',
    branch: '',
    ifsc: '',
    mobile: '',
    address: '',
    defaultStatus: 'deActive'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankAccountData({ ...bankAccountData, [name]: value });
  };

  const createBankAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await httpPost('/company/createbank', bankAccountData);
      if (response) {
        closeMyModal();
        toast.success(response.message);
        // window.location.reload();
      }
    } catch (error) {
      console.error('Error creating bank account:', error);
    }
  };

  function closeMyModal() {
    closeModal();
    setBankAccountData({
      holder_name: '',
      account_no: '',
      confirm_no: '',
      branch: '',
      ifsc: '',
      mobile: '',
      address: '',
      defaultStatus: 'deActive'
    });
  }

  return (
    <>
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <MdArrowBack onClick={() => closeModal()} size={20} />
                <h5 className="modal-title">Create New Bank Account</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={createBankAccount}>
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
                    <label className='mb-2 labelFont'>Confirm Account Number</label>
                    <input type="text" name="confirm_no" placeholder="Confirm Account Number" required className="form-control"
                      value={bankAccountData.confirm_no}
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
                    <label className='mb-2 labelFont'>Mobile Number</label>
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
                  <button type="submit" className="btn btn-primary mt-4">Create New Bank Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateBankAccount;
