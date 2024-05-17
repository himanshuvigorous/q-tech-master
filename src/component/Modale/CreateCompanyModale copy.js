

import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpPost } from '../../Helper/Helper';

const CreateCompanyModale = ({ isModalOpen, closeModal }) => {
  const [contactName,setContactName] = useState("")
  const [username,setUsername] = useState("")
  const [operatorId,setoperatorId] = useState("")
  const [email,setemail] = useState("")
  const [companyName,setcompanyName] = useState("")
  const [password,setpassword] = useState("")
  const [joiningDate,setjoiningDate] = useState("")
  const [remark,setremark] = useState("")
  const [companyAddress,setcompanyAddress] = useState("")
  const [city,setcity] = useState("")
  const [state,setstate] = useState("")
  const [reference,setReference] = useState("")
  const [callbackUrl,setCallbackUrl] = useState("")
  const [domain,setDomain] = useState()
  const [isRent,setIsRent] = useState(false)
  const [isDiamond,setIsDiamond] = useState(false)
  const [companyShare,setcompanyShare] = useState("")
  const [totalSecurity,setTotalsecurity] = useState("")
  const [minbet,setMinbet] = useState("")
  const [maxbet,setMaxbet] = useState("")
  const [status,setStatus] = useState(false)

 
  // const companyFormData ={
  //   "contactName": contactName,
  //   "username": username,
  //   "operatorId": operatorId,
  //   "reference": Reference,
  //   "callbackUrl": "http://vigoroustest111111111",
  //   "companyName": companyName,
  //   "mailto:email": "vigoroustest11111111@gmail.com",
  //   "token": localStorage.getItem("token"),
  //   "status": 1,
  //   "isDiamond": true,  
  //   "joiningDate": "15/05/2024",
  //   "companyShare": companyShare,
  //   "totalSecurity": totalSecurity,
  //   "isRent": false,
  //   "remark": remark,
  //   "domain": "einfotech.in",
  //   "stack":{
  //     "minBet": 5,
  //     "maxBet": 25000
  // },
  //   "password": password,
  //   "companyAddress": companyAddress,
  //   "city": city,
  //   "state": state
  // }
  const [companyFormData2, setCompanyFormData2] = useState({
  
      "contactName": "shubham1",
      "username": "vigorous1234567",
      "operatorId" : "vigorousjaipur1654654654641",
      "reference" : "localhost:5001",
      "callbackUrl" : "http://vigoroustesdgt1111",
      "companyName": "vigorousdgTest1111",
      "mailto:email":"vigoroustest11xg11@gmail.com",
      "token": localStorage.getItem("token"),
      "password": "1234561",
      "status": 1,
      "isDiamond": true,  
      "joiningDate": "12/05/2024",
      "companyShare": 10,
      "totalSecurity": 300000,
      "isRent": false,
      "remark": "reamk",
      "companyAddress": "jaipur",
      "state": "Rajasthan",
      "city": "jaipur",
      "domain": "einfotech.in",
      "stack":{
          "minBet": 5,
          "maxBet": 25000
      }
  
  });
// console.log()
function emptyAllfeields(){
  setContactName("");
  setUsername("")
  setoperatorId("")
  setReference("")
  setCallbackUrl("")
  setcompanyName("")
  setemail("")
  setpassword("")
  setcompanyShare("")
  setjoiningDate("")
  setTotalsecurity("")
  setIsRent("")
  setremark("")
  setcompanyAddress("")
  setstate("")
  setcity("")
  setDomain("")
  setMinbet("")
  setMaxbet("")
}
const companyFormData ={
  "contactName": contactName,
    "username": username,
    "operatorId" : operatorId,
    "reference" : reference,
    "callbackUrl" : callbackUrl,
    "companyName": companyName,
    "email": email,
    "token": localStorage.getItem("token"),
    "password": password,
    "status": status?1:0,
    "isDiamond": isDiamond?1:0,  
    "joiningDate": `${joiningDate.split('-')[2]}/${joiningDate.split('-')[1]}/${joiningDate.split('-')[0]}`,
    "companyShare": companyShare,
    "totalSecurity": totalSecurity,
    "isRent": isRent?1:0,
    "remark": remark,
    "companyAddress": companyAddress,
    "state": state,
    "city": city,
    "domain": "einfotech.in",
    "stack":{
        "minBet": minbet,
        "maxBet": maxbet
    }
}

  // console.log("companyFormData2",companyFormData2);
  // console.log("companyFormData",companyFormData);
  const createCompany = async (e) => {
    e.preventDefault();
    console.log("companyFormData",companyFormData);
    try {
      const response = await httpPost('admin/createNewCompany', companyFormData);
      console.log("response111",response);
      if (response) {
        toast.success(response.message);
        closeModal();

      } 
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company. Please try again.');
    } finally{
      emptyAllfeields()
    }
  };
  
  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setCompanyFormData({ ...companyFormData, [name]: value });
  //   };
    // const createCompany = (e)=>{
    //   e.preventDefault();
    //   console.log(companyFormData)
    // }
    

  return (
    <>
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <MdArrowBack onClick={() => closeModal()} size={20} />
                <h5 className="modal-title">Create New Company</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={createCompany}>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Name</label>
                    <input type="text" name="contactName" placeholder="Name"  className="form-control"
                      value={contactName}
                      onChange={(e)=>{setContactName(e.target.value)}}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Username</label>
                    <input type="text" name="username" placeholder="Username"  className="form-control"
                      value={username}
                       onChange={(e)=>{setUsername(e.target.value)}}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Operator Id</label>
                    <input type="text" name="operatorId" placeholder="Operator Id"  className="form-control"
                      value={operatorId}
                       onChange={(e)=>{setoperatorId(e.target.value)}}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Email</label>
                    <input type="email" name="email" placeholder="email"  className="form-control"
                      value={email}
                       onChange={(e)=>{setemail(e.target.value)}}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Company Name</label>
                    <input type="text" name="companyName" placeholder="Company name"  className="form-control"
                      value={companyName}
                       onChange={(e)=>{setcompanyName(e.target.value)}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Password</label>
                    <input type="password" name="password" placeholder="Password"  className="form-control"
                      value={password}
                       onChange={(e)=>{setpassword(e.target.value)}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Joining Date</label>
                    <input type="date" name="joiningDate" placeholder="Joining Date"  className="form-control"
                      value={joiningDate}
                       onChange={(e)=>{setjoiningDate(e.target.value)}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Reference</label>
                    <input type="text" name="reference" placeholder="Reference"  className="form-control"
                      value={reference}
                       onChange={(e)=>{setReference(e.target.value)}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Callback Url</label>
                    <input type="text" name="callbackUrl" placeholder="Callback Url"  className="form-control"
                      value={callbackUrl}
                       onChange={(e)=>{setCallbackUrl(e.target.value)}} />
                  </div>
                  
                  
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Company Share</label>
                    <input type="number" name="companyShare" placeholder="Company Share"  className="form-control"
                      value={companyShare}
                       onChange={(e)=>{setcompanyShare(Number(e.target.value))}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Total Security</label>
                    <input type="number" name="Totalsecurity" placeholder="Total Security"  className="form-control"
                      value={totalSecurity}
                       onChange={(e)=>{setTotalsecurity(Number(e.target.value))}} />
                  </div>
                  
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Remark</label>
                    <input type="text" name="remark" placeholder="Remark"  className="form-control"
                      value={remark}
                       onChange={(e)=>{setremark(e.target.value)}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Domain</label>
                    <input type="text" name="domain" placeholder="domain"  className="form-control"
                      value={domain}
                       onChange={(e)=>{setDomain(e.target.value)}} />
                  </div>
                  <div className="form-group mt-4">
      <label className="mb-2 labelFont">Rent</label>
      <input
        type="checkbox"
        checked={isRent}
        onChange={(e)=>{setIsRent(e.target.checked)}}
      />
    </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>Company Address</label>
                    <input type="text" name="companyAddress" placeholder="Company_address"  className="form-control"
                      value={companyAddress}
                       onChange={(e)=>{setcompanyAddress(e.target.value)}} />
                  </div>
                  
                  <div className="form-group mt-4">
      <label className="mb-2 labelFont">Diamond</label>
      <input
        type="checkbox"
        checked={isDiamond}
        onChange={(e)=>{setIsDiamond(e.target.checked)}}
      />
    </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>City</label>
                    <input type="text" name="city" placeholder="City"  className="form-control"
                      value={city}
                       onChange={(e)=>{setcity(e.target.value)}} />
                  </div>
                  
                  <div className="form-group mt-4">
      <label className="mb-2 labelFont">Status</label>
      <input
        type="checkbox"
        checked={status}
        onChange={(e)=>{setStatus(e.target.checked)}}
      />
    </div>
                  <div className="form-group mt-4">
                    <label className='mb-2 labelFont'>State</label>
                    <input type="text" name="state" placeholder="State"  className="form-control"
                      value={state}
                       onChange={(e)=>{setstate(e.target.value)}} />
                  </div>
                  
                    <div className="form-group ml-4 mt-4">
                    <label className=' labelFont'>Min Bet</label>
                    <input type="number" name="minbet" placeholder="Min bet"  className="form-control"
                      value={minbet}
                       onChange={(e)=>{setMinbet(Number(e.target.value))}} />
                  </div>
                  <div className="form-group mt-4">
                    <label className='labelFont'>Max Bet</label>
                    <input type="number" name="maxbet" placeholder="Max bet"  className="form-control"
                      value={maxbet}
                       onChange={(e)=>{setMaxbet(Number(e.target.value))}} />
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

export default CreateCompanyModale;

