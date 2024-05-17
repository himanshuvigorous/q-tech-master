import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import "./model.css";

const CreateProjectModal = ({ isModalOpen, closeModal }) => {
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
      const response = await httpPost('/company/createproject', projectFormData);
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
    closeModal();
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
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <MdArrowBack onClick={() => closeModal()} size={20} />
                <h5 className="modal-title">Create New Project</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={createProject}>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Project Name</label>
                    <input type="text" name="projectName" placeholder="Project Name" required className="form-control"
                      value={projectFormData.projectName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Client Name</label>
                    <input type="text" name="clientName" placeholder="Client Name" required className="form-control"
                      value={projectFormData.clientName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Duration</label>
                    <input type="text" name="duration" placeholder="Duration" required className="form-control"
                      value={projectFormData.duration}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Client Number</label>
                    <input type="text" name="clientNumber" placeholder="Client Number" required className="form-control"
                      value={projectFormData.clientNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Price</label>
                    <input type="number" name="price" placeholder="Price" required className="form-control"
                      value={projectFormData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Payment Status</label>
                    <input type="text" name="paymentStatus" placeholder="Payment Status" required className="form-control"
                      value={projectFormData.paymentStatus}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Status</label>
                    <input type="text" name="status" placeholder="Status" required className="form-control"
                      value={projectFormData.status}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Risk</label>
                    <input type="text" name="risk" placeholder="Risk" required className="form-control"
                      value={projectFormData.risk}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Status by PM</label>
                    <input type="text" name="statusByPm" placeholder="Status by PM" required className="form-control"
                      value={projectFormData.statusByPm}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Project Manager</label>
                    <input type="text" name="projectManager" placeholder="Project Manager" required className="form-control"
                      value={projectFormData.projectManager}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Create Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateProjectModal;
