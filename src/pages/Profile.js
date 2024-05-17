// import React, { useEffect, useState } from 'react';
// import { MdArrowBack } from "react-icons/md";
// import './Index.css';
// import { useDispatch, useSelector } from 'react-redux';
// import UpdateProfile from '../component/Modale/UpdateProfile';
// import moment from 'moment';
// import uerImg from '../Images/user-img.png';
// import { CiEdit } from "react-icons/ci";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { RiLogoutBoxRLine } from "react-icons/ri";
// import { logoutUser } from '../Redux/actions/authActions';
// import { useNavigate } from 'react-router-dom';
// import UpdateCompanyModal from '../component/Modale/UpdateCompanyModal';
// import UpdateAdminModal from '../component/Modale/UpdateAdminModal';
// import { IoIosRefresh } from "react-icons/io";



// function Profile(props) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth.user);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalPassUpOpen, setIsModalPassUpOpen] = useState(false);
//   const [userData, setUserData] = useState();

//   useEffect(() => {
//     if (auth) {
//       const userData = auth.admin || auth.company || auth.pm;
//       setUserData(userData);
//     }
//   }, [auth]);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const closePassUpModal = () => {
//     setIsModalPassUpOpen(false);
//   };

//   const userLogout = () => {
//     dispatch(logoutUser());
//     navigate("/")
//   };

//   // const [showalldata, setshowalldata] = useState('')
//   // const showdata = (item) => {
//   //   setshowalldata(item)
//   // }



//   return (
//     <>
//       <UpdateProfile isModalOpen={isModalOpen} data={userData} closeModal={closeModal} />
//       {/* <UpdateCompanyModal isModalOpen={isModalOpen} data={userData} closeModal={closeModal} /> */}
//       {/* <UpdateAdminModal isModalOpen={isModalOpen} data={userData} closeModal={closeModal} /> */}

//       {/* <ShowFullDataModale isModalOpen={isShowDataModalOpen} data={showalldata} closeModal={closeModal} /> */}

//       <div className='allPageMainView'>
//         <div className='container-fluid'>
//           <div className='tableDataView'>
//             <div className='row'>
//               <div className='col-lg-11 col-sm-12'>
//                 <div className='tableMainBoxView'>
//                   <div className='filterView'>
//                     <div className='tableHeadC'>
//                       <MdArrowBack />
//                       <h3>User Profile</h3>
//                     </div>
//                     <div className='filterBoxView'>
//                       <button type="button" className="btn editBtn mainBtn" onClick={() => setIsModalOpen(true)}>
//                         <CiEdit size={18} className='mr-3' />Edit
//                       </button>
//                       <button type="button" className="btn padd4 editBtn mainBtn" ><IoIosRefresh size={20} /></button>
//                       <button type="button" className="btn updPassBtn mainBtn"
//                         onClick={() => setIsModalPassUpOpen(true)}
//                       >
//                         <RiLockPasswordLine size={18} className='mr-3' />Update Passsword
//                       </button>
//                     </div>
//                   </div>
//                   {userData && (
//                     <div className="row align-items-center">
//                       <div className="col-md-4 col-12">
//                         <div className="userDetailsLeft">
//                           <img src={uerImg} alt="Profile" className="img-fluid" />
//                           {/* <h4>{userData.name}</h4> */}
//                         </div>
//                       </div>
//                       <div className="col-md-8 col-12">
//                         <div className="userDetailsRight">
//                           <ul>
//                             <li><span>Name : </span> {userData.name}</li>
//                             <li><span>Email : </span> {userData.email}</li>
//                             <li><span>Mobile : </span> {userData.mobile}</li>
//                             <li><span>User Type : </span> {userData.userType}</li>
//                             <li><span>Created date : </span> {moment(userData.date).format('DD/MM/YYYY')}</li>
//                           </ul>
//                           <div className='text-end'>
//                             <button type="button" className="btn mainBtn logoutbtn" onClick={() => userLogout()}>
//                               <RiLogoutBoxRLine size={18} /> Logout
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Profile;




import React, { useEffect, useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import './Index.css';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfile from '../component/Modale/UpdateProfile';
import moment from 'moment';
import uerImg from '../Images/user-img.png';
import { CiEdit } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logoutUser } from '../Redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from '../component/Modale/ChangePassword';
import { IoIosRefresh } from "react-icons/io";
import UpdateCompanyModal from '../component/Modale/UpdateCompanyModal';
import UpdateAdminModal from '../component/Modale/UpdateAdminModal';

function Profile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: auth } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPassUpOpen, setIsModalPassUpOpen] = useState(false);
  const [userData, setUserData] = useState();

  // useEffect(() => {
  //   if (auth) {
  //     const userData = auth.admin || auth.company || auth.pm;
  //     setUserData(userData);
  //   }
  // }, [auth]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closePassUpModal = () => {
    setIsModalPassUpOpen(false);
  };

  const userLogout = () => {
    dispatch(logoutUser());
    navigate("/")
  };

  // const [showalldata, setshowalldata] = useState('')
  // const showdata = (item) => {
  //   setshowalldata(item)
  // }



  return (
    <>
      {auth?.admin && (
        <UpdateAdminModal isModalOpen={isModalOpen} data={userData} closeModal={closeModal} />
      )}
      {auth?.company && (
        <UpdateCompanyModal isModalOpen={isModalOpen} data={userData} closeModal={closeModal} />
      )}


      {/* <UpdateProfile isModalOpen={isModalOpen} closeModal={closeModal} />
      <ChangePassword isModalPassUpOpen={isModalPassUpOpen} closePassUpModal={closePassUpModal} /> */}

      {/* <UpdateProfile isModalOpen={isModalOpen} data={userData} closeModal={closeModal} /> */}

      {/* <UpdateAdminModal isModalOpen={isModalOpen} data={userData} closeModal={closeModal} />

      <ShowFullDataModale isModalOpen={isShowDataModalOpen} data={showalldata} closeModal={closeModal} /> */}

      <div className='allPageMainView'>
        <div className='container-fluid'>
          <div className='tableDataView'>
            <div className='row'>
              <div className='col-lg-12 col-sm-12'>
                <div className='tableMainBoxView'>
                  <div className='filterView'>
                    <div className='tableHeadC'>
                      <Link to='/app/dashboard'> <MdArrowBack /></Link>

                      {/* <MdArrowBack /> */}
                      <h3>User Profile</h3>
                    </div>
                    <div className='filterBoxView'>
                      <button type="button" className="btn editBtn mainBtn"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <CiEdit size={18} className='mr-3' />Edit
                      </button>
                      {/* <button type="button" className="btn padd4 refreshBTn02 mainBtn" ><IoIosRefresh size={20} /> Refresh</button> */}
                      <button type="button" className="btn updPassBtn mainBtn"
                        onClick={() => setIsModalPassUpOpen(true)}
                      >
                        <RiLockPasswordLine size={18} className='mr-3' />Update Passsword
                      </button>
                    </div>
                  </div>
                  {auth.user && (
                    <div className="row align-items-center">
                      <div className="col-md-4 col-12">
                        <div className="userDetailsLeft">
                          <img src={uerImg} alt="Profile" className="img-fluid" />
                          {/* <h4>{auth.name}</h4> */}
                        </div>
                      </div>
                      <div className="col-md-8 col-12">
                        <div className="userDetailsRight">
                          <ul>
                            <li><span>Name : </span> {auth.user.name}</li>
                            <li><span>Email : </span> {auth.user.email}</li>
                            <li><span>Mobile : </span> {auth.user.mobile}</li>
                            <li><span>User Type : </span> {auth.user.userType}</li>
                            <li><span>Created date : </span> {moment(auth.user.date).format('DD/MM/YYYY')}</li>
                          </ul>
                          <div className='text-end'>
                            <button type="button" className="btn mainBtn logoutbtn" onClick={() => userLogout()}>
                              <RiLogoutBoxRLine size={18} /> Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;