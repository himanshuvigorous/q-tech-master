import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import moment from 'moment';
import './Index.css';
import Loading from '../component/Loading/Loading';
import Dropdown from 'react-bootstrap/Dropdown';

import { RiDeleteBinLine } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import { TbEye } from 'react-icons/tb';
import { IoIosRefresh } from "react-icons/io";
import CreateUserModale from '../component/Modale/CreateUserModale';
import { fetchUsers } from '../Redux/actions/usersActions';
import UpdateUserModal from '../component/Modale/UpdateUserModal';
import { Link } from 'react-router-dom';
import { httpGet, httpPost } from '../Helper/Helper';
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import ShowFullDataModal from '../component/Modale/ShowFullDataModaleComapny';
import CreateCompanyModale from '../component/Modale/NewCreateCompanyModale';

function Company() {
  // const usersData = useSelector((state) => state.users.users);
  // const auth = useSelector((state) => state.auth.user);
  // const [users, setUsers] = useState({ company: [], pms: [], leads: [] });
  
  // useEffect(() => {
    //   setUsers(usersData)
    // }, [usersData]);
    
    const [loading,setLaoding] = useState (false)
    
    // const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();
  const { user: auth } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);
  const [refresh, setRefresh] = useState(false);

  
  // const alertmsg = () => {
  //   toast.error("You can't Create")
  // }

const [resData, setResData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [userEditData, setUserEditData] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditModalOpen(false);
    setUserEditData(null);
    setShowUserDataModale(false)
  };

  const [isShowUserDataModale, setShowUserDataModale] = useState(false);
  const [showalldata, setShowalldata] = useState('')
  const showdata = (item) => {
    setShowUserDataModale(true)
    setShowalldata(item)
  }


  const fetchData = async () => {
    try {
      setLaoding(true)
    
        const response = await httpPost('admin/getCompanyList');
        setResData(response.data)
        console.log("response",response);
        if (response) {
          setResData(response)
         
         
        }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally{
      setLaoding(false)
    }
  };
  useEffect(() => {
    if (auth) {
      // dispatch(fetchUsers("admin/getCompanyList"));
      fetchData()
    }
  }, [auth, dispatch, refresh]);
  const handleClick = () => {
    setRefresh(!refresh);
  };



  return (
    <>
      <CreateCompanyModale isModalOpen={isModalOpen} closeModal={closeModal} userType={"company"} />

      <UpdateUserModal isEditModalOpen={isEditModalOpen} closeModal={closeModal} userToEdit={userEditData} />

      <ShowFullDataModal isShowUserDataModale={isShowUserDataModale} userData={showalldata} closeModal={closeModal} />
      {loading && <Loading />}

      <div className='allPageMainView' >
        <div className='container-fluid'>
          <div className='tableDataView' >
            <div className=' row'>
              <div className='col-lg-12 col-sm-12' >
                <div className='tableMainBoxView tableDataHeight  ' style={{  backgroundColor: "rgb(25, 47, 59)" }} >
                  <div className='filterView  '>
                    <div className=' tableHeadC'>
                      <Link to='/app/dashboard' style={{color:"white" }}> <MdArrowBack /></Link>
                      {/* <MdArrowBack /> */}
                      <h3>Company List</h3>
                    </div>
                    <div className='filterBoxView'>
                      {/* <div className="input-group rounded-pill inputMobileWidth">
                        <input type="text" className="form-control rounded-pill" placeholder="Search" />
                      </div> */}
                      {/* <button type="button" className="btn padd4 refreshBTn mainBtn" onClick={() => handleClick()} ><IoIosRefresh size={20} /> Refresh</button> */}
                      <button type="button" className="btn btn-success" onClick={() => setIsModalOpen(true)} ><span>Add New Company</span></button>
                    </div>
                  </div>
                  <div className=''>
                    <table  className="table">
                      <thead >
                        <tr className="bg-danger">
                          <th className="text-center " scope="col">S.no</th>
                          <th className="text-center" scope="col">O.Id</th>
                          <th  className="text-center" scope="col">callbackUrl</th>
                          <th className="text-center" scope="col">Comapny Name</th>
                          <th className="text-center" scope="col">Status</th>
                          <th className="text-center" scope="col">Email</th>
                          <th className="text-center" scope="col">Username</th>
                          <th className="text-center" scope="col">Reference</th>
                          <th className="text-center" scope="col">Company Share / Total Security</th>
                          <th className="text-center" scope="col">Actions</th>
                          
                        </tr>
                      </thead>
                      {!loading && 
                        <tbody className="tableline">
                          {console.log("resData",resData)}
                          {resData && resData?.data.length > 0 ? (
                            resData.data.map((item, index) => (
                              <tr className=' overflow-x-auto' key={item._id}>
                                <th scope="row">{index + 1}</th>
                                
                                <td  className="tableData text-center">{item.operatorId}</td>
                                <td  className="tableData text-center ">{item.callbackUrl}</td>
                                <td className="tableData text-center">{item.companyName}</td>
                                <td className="tableData text-center">{item.status}</td>
                                <td className="tableData text-center">{item.email}</td>
                                <td className="tableData text-center">{item.username}</td>
                                <td className="tableData text-center">{item.reference}</td>
                                <td className="tableData text-center" >{`${item.companyShare} / ${item.totalSecurity}` }</td>
                                <td className="tableData text-center">
                                  <div className='justify-content-center cursor-pointer d-flex gap-2'>
                                      <FaEye  onClick={() => showdata(item)} />
                                      <FiEdit onClick={() => { setUserEditData(item); setEditModalOpen(true); }} />
                                      <RiDeleteBin5Line />
                                  </div>
                                 
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td  colspan="10" className='nodataView' >
                              <div class="ant-empty-image">
                                <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
                              </div> 
                                No data
                              </td>
                            </tr>
                          )}
                        </tbody>
                      }
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Company
