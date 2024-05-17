import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import "./model.css";

const ChangePassword = ({ isModalPassUpOpen, closePassUpModal }) => {
  const [projectFormData, setProjectFormData] = useState({
    projectName: '',
    clientName: '',
    duration: '',
    clientNumber: '',
    price: 0,
    paymentStatus: '',
    status: '',
    risk: '',
    statusByPm: '',
    projectManager: ''
  });

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const response = await httpPost('api/company/createproject', projectFormData);
      if (response) {
        toast.success(response.message)
        closeMyModal()
      }
      window.location.reload();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData({ ...projectFormData, [name]: value });
  };

  function closeMyModal() {
    closePassUpModal();
    setProjectFormData({
      projectName: '',
      clientName: '',
      duration: '',
      clientNumber: '',
      price: 0,
      paymentStatus: '',
      status: '',
      risk: '',
      statusByPm: '',
      projectManager: ''
    })
  }
  return (
    <>
      {isModalPassUpOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-Profile modal-dialog-centered" role="document">
            <div className="modal-PassUpcontent">
              <div className="modal-header">
                <MdArrowBack onClick={() => closePassUpModal()} size={20} />
                <h5 className="modal-title">Change Password</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={createProject}>
                  <div className="form-group ">
                    <label className='mb-2 labelFont'>Old Password</label>
                    <input type="password" name="risk" placeholder="Old Password" required className="form-control"
                      // value={projectFormData.risk}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>New Password</label>
                    <input type="password" name="statusByPm" placeholder="New Password" required className="form-control"
                      // value={projectFormData.statusByPm}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Confirm Password</label>
                    <input type="password" name="projectManager" placeholder="Confirm Password" required className="form-control"
                      // value={projectFormData.projectManager}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Update Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChangePassword;
