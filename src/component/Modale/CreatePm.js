import React, { useState } from 'react';
import "./model.css";
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
const CreatePm = ({ isModalOpen, closeModal }) => {

  const [pmFormData, setpmFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpmFormData({ ...pmFormData, [name]: value });
  };


  const createPm = async (e) => {
    e.preventDefault();
    try {
      const response = await httpPost('api/company/createpm', pmFormData);
      if (response) {
        closeMyModal()
        toast.success(response.message);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  function closeMyModal() {
    closeModal();
    setpmFormData({
      name: '',
      email: '',
      mobile: '',
      password: ''
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
                <h5 className="modal-title">Create New PM</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={createPm}>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Name</label>
                    <input type="text" name="name" placeholder="Client Name" required className="form-control"
                      value={pmFormData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Email</label>
                    <input type="email" name="email" placeholder="Email" required className="form-control"
                      value={pmFormData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Mobile Number</label>
                    <input type="text" name="mobile" placeholder="Mobile No." required className="form-control"
                      value={pmFormData.mobile}
                      onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Password</label>
                    <input type="password" name="password" placeholder="Password" required className="form-control"
                      value={pmFormData.password}
                      onChange={handleInputChange} />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Create New PM</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePm;
