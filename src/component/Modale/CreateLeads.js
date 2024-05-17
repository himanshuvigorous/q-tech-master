// import React, { useState } from 'react';
// import "./model.css";
// import { MdArrowBack } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { httpPost } from '../../Helper/Helper';
// const CreateLeads = ({ isModalOpen, closeModal }) => {
//   const [clientLeads, setClientLeads] = useState({
//     message: '',
//     type: '',
//     status: 'PENDING'
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setClientLeads({ ...clientLeads, [name]: value });
//   };

//   const createClientLeads = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await httpPost('api/pm/createlead', clientLeads);
//       if (response) {
//         setClientLeads({
//           message: '',
//           type: '',
//           status: 'PENDING'
//         });

//         toast.success(response.message);
//         closeMyModal()
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error('Error creating client:', error);
//     }
//   };

//   function closeMyModal() {
//     closeModal();
//     setClientLeads({
//       message: '',
//       type: '',
//       status: 'PENDING'
//     });
//   }

//   return (
//     <>
//       {isModalOpen && (
//         <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <MdArrowBack onClick={() => closeMyModal()} size={20} />
//                 <h5 className="modal-title">Create New Leads</h5>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={createClientLeads}>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Leads Message</label>
//                     <input type="text" name="message" placeholder="Leads message" required className="form-control"
//                       value={clientLeads.message}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Type</label>
//                     <input type="text" name="type" placeholder="Type" required className="form-control"
//                       value={clientLeads.type}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group mt-4">
//                     <label className='mb-2 labelFont'>Status</label>
//                     <input type="text" name="status" placeholder="Status" required className="form-control"
//                       value={clientLeads.status}
//                       onChange={handleInputChange} />
//                   </div>
//                   <button type="submit" className="btn btn-primary mt-4">Create Leads</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default CreateLeads;



import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';

const CreateLeads = ({ isModalOpen, closeModal }) => {
  const [leadDetails, setLeadDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    description: '',
    price: 0,
    category: '',
    duration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeadDetails({ ...leadDetails, [name]: value });
  };

  const createLead = async (e) => {
    e.preventDefault();
    try {
      const response = await httpPost('/leads/createleads', leadDetails);
      if (response) {
        setLeadDetails({
          name: '',
          email: '',
          mobile: '',
          description: '',
          price: 0,
          category: '',
          duration: ''
        });

        toast.success(response.message);
        closeModal();
        window.location.reload();

      }
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead. Please try again.');
    }
  };

  function closeMyModal() {
    closeModal();
    setLeadDetails({
      name: '',
      email: '',
      mobile: '',
      description: '',
      price: 0,
      category: '',
      duration: ''
    });
  }

  return (
    <>
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <MdArrowBack onClick={() => closeMyModal()} size={20} />
                <h5 className="modal-title">Create New Leads</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={createLead}>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Name</label>
                    <input type="text" name="name" placeholder="Name" required className="form-control"
                      value={leadDetails.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Email</label>
                    <input type="email" name="email" placeholder="Email" required className="form-control"
                      value={leadDetails.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Mobile</label>
                    <input type="text" name="mobile" placeholder="Mobile" required className="form-control"
                      value={leadDetails.mobile}
                      onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Description</label>
                    <input type="text" name="description" placeholder="Description" required className="form-control"
                      value={leadDetails.description}
                      onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Price</label>
                    <input type="number" name="price" placeholder="Price" required className="form-control"
                      value={leadDetails.price}
                      onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Category</label>
                    <input type="text" name="category" placeholder="Category" required className="form-control"
                      value={leadDetails.category}
                      onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Duration</label>
                    <input type="text" name="duration" placeholder="Duration" required className="form-control"
                      value={leadDetails.duration}
                      onChange={handleInputChange} />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Create Leads</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateLeads;
