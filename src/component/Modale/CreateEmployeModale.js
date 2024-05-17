// import React, { useState } from 'react';
// import { MdArrowBack } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { httpPost } from '../../Helper/Helper';
// import "./model.css";

// const CreateEmployeeModal = ({ isModalOpen, closeModal }) => {
//   const [employeeFormData, setEmployeeFormData] = useState({
//     name: '',
//     idNo: '',
//     designation: '',
//     department: '',
//     joiningDate: '',
//     mobile: '',
//     gender: '',
//     tlName: '',
//     qualifications: [],
//     pastProjects: [],
//     currentProjects: [],
//     experience: 0,
//     city: '',
//     status: 'Active' // assuming default status is Active
//   });

//   const createEmployee = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("employeeFormData", employeeFormData);
//       const response = await httpPost('api/company/createemployee', employeeFormData);
//       if (response) {
//         toast.success(response.message)
//         closeMyModal()
//       }
//       window.location.reload();
//     } catch (error) {
//       console.error('Error creating employee:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeFormData({ ...employeeFormData, [name]: value });
//   };

//   function closeMyModal() {
//     closeModal();
//     setEmployeeFormData({
//       name: '',
//       idNo: '',
//       designation: '',
//       department: '',
//       joiningDate: '',
//       mobile: '',
//       gender: '',
//       tlName: '',
//       qualifications: [],
//       pastProjects: [],
//       currentProjects: [],
//       experience: 0,
//       city: '',
//       status: 'Active' // resetting status to default
//     });
//   }

//   return (
//     <>
//       {isModalOpen && (
//         <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <MdArrowBack onClick={() => closeModal()} size={20} />
//                 <h5 className="modal-title">Create New Employee</h5>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={createEmployee}>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Name</label>
//                     <input type="text" name="name" placeholder="Name"  className="form-control"
//                       value={employeeFormData.name}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Employee ID</label>
//                     <input type="text" name="idNo" placeholder="Employee ID" required className="form-control"
//                       value={employeeFormData.idNo}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Designation</label>
//                     <input type="text" name="designation" placeholder="Designation" required className="form-control"
//                       value={employeeFormData.designation}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Department</label>
//                     <input type="text" name="department" placeholder="Department" required className="form-control"
//                       value={employeeFormData.department}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Joining Date</label>
//                     <input type="date" name="joiningDate" required className="form-control"
//                       value={employeeFormData.joiningDate}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Mobile</label>
//                     <input type="text" name="mobile" placeholder="Mobile" required className="form-control"
//                       value={employeeFormData.mobile}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Gender</label>
//                     <select name="gender" required className="form-control"
//                       value={employeeFormData.gender}
//                       onChange={handleInputChange}>
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Team Leader Name</label>
//                     <input type="text" name="tlName" placeholder="Team Leader Name" required className="form-control"
//                       value={employeeFormData.tlName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Qualifications</label>
//                     <textarea name="qualifications" placeholder="Qualifications" required className="form-control"
//                       value={employeeFormData.qualifications.join('\n')}
//                       onChange={e => setEmployeeFormData({ ...employeeFormData, qualifications: e.target.value.split('\n') })}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Projects Completed</label>
//                     <textarea name="pastProjects" placeholder="Projects Completed" required className="form-control"
//                       value={employeeFormData.pastProjects.join('\n')}
//                       onChange={e => setEmployeeFormData({ ...employeeFormData, pastProjects: e.target.value.split('\n') })}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Working Projects</label>
//                     <textarea name="currentProjects" placeholder="Working Projects" required className="form-control"
//                       value={employeeFormData.currentProjects.join('\n')}
//                       onChange={e => setEmployeeFormData({ ...employeeFormData, currentProjects: e.target.value.split('\n') })}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Experience (in years)</label>
//                     <input type="number" name="experience" placeholder="Experience" required className="form-control"
//                       value={employeeFormData.experience}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>City</label>
//                     <input type="text" name="city" placeholder="City" required className="form-control"
//                       value={employeeFormData.city}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary mt-4">Create Employee</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default CreateEmployeeModal;



import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';
import moment from 'moment';

const CreateEmployeeModal = ({ isModalOpen, closeModal, employeeToEdit }) => {
  const [employeeFormData, setEmployeeFormData] = useState({
    _id: '',
    name: '',
    idNo: '',
    designation: '',
    department: '',
    joiningDate: moment().format('DD/MM/YYYY'),
    mobile: '',
    gender: '',
    tlName: '',
    qualifications: [],
    pastProjects: [],
    currentProjects: [],
    experience: 0,
    city: '',
    status: 'Active' // assuming default status is Active
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (employeeToEdit) {
      setIsEditMode(true);
      setEmployeeFormData(employeeToEdit);
    } else {
      setIsEditMode(false);
      setEmployeeFormData({
        name: '',
        idNo: '',
        designation: '',
        department: '',
        joiningDate: moment(new Date()).format('DD/MM/YYYY'),
        mobile: '',
        gender: '',
        tlName: '',
        qualifications: [],
        pastProjects: [],
        currentProjects: [],
        experience: 0,
        city: '',
        status: 'Active'
      });
    }
  }, [employeeToEdit]);

  const submitHandler = isEditMode ? updateEmployee : createEmployee;

  async function createEmployee(e) {
    e.preventDefault();
    try {
      const response = await httpPost('api/company/createemployee', employeeFormData);
      if (response) {
        toast.success(response.message)
        closeModal();
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  async function updateEmployee(e) {
    e.preventDefault();
    try {
      if (employeeFormData) {
        const data = {
          _id: employeeFormData._id,
          name: employeeFormData.name,
          idNo: employeeFormData.idNo,
          designation: employeeFormData.designation,
          department: employeeFormData.department,
          joiningDate: employeeFormData.joiningDate,
          mobile: employeeFormData.mobile,
          gender: employeeFormData.gender,
          tlName: employeeFormData.tlName,
          qualifications: employeeFormData.qualifications,
          pastProjects: employeeFormData.pastProjects,
          currentProjects: employeeFormData.currentProjects,
          experience: employeeFormData.experience,
          city: employeeFormData.city,
          status: employeeFormData.status
        }
        const response = await httpPost(`api/company/updateemployee`, data);
        if (response) {
          toast.success(response.message)
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeFormData({ ...employeeFormData, [name]: value });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   let formattedValue = value; // Default to input value
  //   if (name === 'joiningDate') {
  //     formattedValue = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
  //   }
  //   setEmployeeFormData({ ...employeeFormData, [name]: formattedValue });
  // };

  function closeMyModal() {
    closeModal();
    setIsEditMode(false);
    setEmployeeFormData({
      name: '',
      idNo: '',
      designation: '',
      department: '',
      joiningDate: '',
      mobile: '',
      gender: '',
      tlName: '',
      qualifications: [],
      pastProjects: [],
      currentProjects: [],
      experience: 0,
      city: '',
      status: 'Active'
    });
  }

  return (
    <>
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <MdArrowBack onClick={closeMyModal} size={20} />
                <h5 className="modal-title">{isEditMode ? 'Edit Employee' : 'Create New Employee'}</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Name</label>
                    <input type="text" name="name" placeholder="Name" className="form-control"
                      value={employeeFormData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Employee ID</label>
                    {employeeToEdit ? (
                      <input type="text" name="idNo" placeholder="Employee ID" disabled required className="form-control"
                        value={employeeFormData.idNo}
                      // onChange={handleInputChange}
                      />
                    ) : <input type="text" name="idNo" placeholder="Employee ID" required className="form-control"
                      value={employeeFormData.idNo}
                      onChange={handleInputChange}
                    />}

                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Designation</label>
                    <input type="text" name="designation" placeholder="Designation" className="form-control"
                      value={employeeFormData.designation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Department</label>
                    <input type="text" name="department" placeholder="Department" className="form-control"
                      value={employeeFormData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Joining Date</label>
                    <input type="date" name="joiningDate" className="form-control"
                      value={employeeFormData.joiningDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Mobile</label>
                    <input type="text" name="mobile" placeholder="Mobile" className="form-control"
                      value={employeeFormData.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Gender</label>
                    <select name="gender" className="form-control"
                      value={employeeFormData.gender}
                      onChange={handleInputChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Team Leader Name</label>
                    <input type="text" name="tlName" placeholder="Team Leader Name" className="form-control"
                      value={employeeFormData.tlName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Qualifications</label>
                    <textarea name="qualifications" placeholder="Qualifications" className="form-control"
                      value={employeeFormData.qualifications.join('\n')}
                      onChange={e => setEmployeeFormData({ ...employeeFormData, qualifications: e.target.value.split('\n') })}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Projects Completed</label>
                    <textarea name="pastProjects" placeholder="Projects Completed" className="form-control"
                      value={employeeFormData.pastProjects.join('\n')}
                      onChange={e => setEmployeeFormData({ ...employeeFormData, pastProjects: e.target.value.split('\n') })}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Working Projects</label>
                    <textarea name="currentProjects" placeholder="Working Projects" className="form-control"
                      value={employeeFormData.currentProjects.join('\n')}
                      onChange={e => setEmployeeFormData({ ...employeeFormData, currentProjects: e.target.value.split('\n') })}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Experience (in years)</label>
                    <input type="number" name="experience" placeholder="Experience" className="form-control"
                      value={employeeFormData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>City</label>
                    <input type="text" name="city" placeholder="City" className="form-control"
                      value={employeeFormData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">{isEditMode ? 'Update Employee' : 'Create Employee'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateEmployeeModal;
