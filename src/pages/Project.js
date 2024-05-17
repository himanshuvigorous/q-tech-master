import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import moment from 'moment';
import './Index.css';
import Loading from '../component/Loading/Loading';
import CreateCompanyModale from '../component/Modale/CreateCompanyModale';
import CreateProjectModale from '../component/Modale/CreateProjectModale';
import { toast } from 'react-toastify';

import ShowFullDataModale from '../component/Modale/ShowFullDataModale';
import Dropdown from 'react-bootstrap/Dropdown';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import { TbEye } from 'react-icons/tb';
import { IoIosRefresh } from "react-icons/io";
import { fetchUsers } from '../Redux/actions/usersActions';
import { Link } from 'react-router-dom';

function Project() {
  // const usersData = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  // const [users, setUsers] = useState({ company: [], pms: [], leads: [], companyProject: [] });
  // const auth = useSelector((state) => state.auth.user);


  const dispatch = useDispatch();
  const { user: auth } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (auth) {
      dispatch(fetchUsers("/company/getcompanyallproject"));
    }
  }, [auth, dispatch, refresh]);

  const handleClick = () => {
    setRefresh(!refresh);
  };




  // useEffect(() => {
  //   setUsers(usersData)
  // }, [usersData]);

  const alertmsg = () => {
    toast.error("You can't Create")
  }


  // const fetchData = async () => {
  //   try {
  //     if (props.user.position === 1) {
  //       const response = await httpGet('api/admin/getallcompanypm');
  //       if (response) {
  //         setUsers(response);
  //         return setLaoding(false)
  //       }
  //     }
  //     else if (props.user.position === 2) {
  //       const response = await httpGet('api/company/getallpm');
  //       if (response) {
  //         setUsers(response);
  //         return setLaoding(false)
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
    setisShowDataModalOpen(false)

  }
  const [isShowDataModalOpen, setisShowDataModalOpen] = useState(false);
  const [showalldata, setshowalldata] = useState('')
  const showdata = (item) => {
    setisShowDataModalOpen(true)
    setshowalldata(item)
  }
  return (
    <>
      <CreateProjectModale isModalOpen={isModalOpen} closeModal={closeModal} />
      <ShowFullDataModale isModalOpen={isShowDataModalOpen} data={showalldata} closeModal={closeModal} />

      <div className='allPageMainView'>
        <div className='container-fluid'>
          <div className='tableDataView'>
            <div className='row'>
              <div className='col-lg-12 col-sm-12'>
                <div className='tableMainBoxView tableDataHeight'>
                  <div className='filterView'>
                    <div className='tableHeadC'>
                      <Link to='/app/dashboard'> <MdArrowBack /></Link>
                      {/* <MdArrowBack /> */}
                      <h3>Projest List</h3>
                    </div>
                    <div className='filterBoxView'>
                      <div className="input-group rounded-pill inputMobileWidth">
                        <input type="text" className="form-control rounded-pill" placeholder="Search" />
                      </div>
                      <button type="button" className="btn padd4 refreshBTn mainBtn" onClick={() => handleClick()}  ><IoIosRefresh size={20} /> Refresh</button>
                      <button type="button" className="btn mainBtn" onClick={() => auth.admin ? alertmsg() : setIsModalOpen(true)} ><span>Add New Project</span></button>
                    </div>
                  </div>
                  <div className=''>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">S.no</th>
                          <th scope="col">Date</th>
                          <th scope="col">ClientName</th>
                          <th scope="col">ProjectName</th>
                          <th scope="col">ClientNumber</th>
                          <th scope="col">Duration</th>
                          <th scope="col">PaymentStatus</th>
                          <th scope="col">Price</th>
                          <th scope="col">Status</th>
                          <th scope="col">ProjectManager</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {loading && loading ? (
                         <tbody>
                         <tr>
                           <td colSpan={10} className='nodataView'>
                             <Loading className="text-center w-full" />
                           </td>
                         </tr>
                       </tbody>
                      ) :
                        <tbody>
                          {users.data && users.data.length > 0 ? (
                            users.data.map((item, index) => (
                              <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{moment(item.date).format('DD/MM/YYYY')}</td>
                                <td>{item.clientName}</td>
                                <td>{item.projectName}</td>
                                <td>{item.clientNumber}</td>
                                <td>{item.duration}</td>
                                <td>{item.paymentStatus}</td>
                                <td className="text-success"><b>{item.price}</b></td>
                                <td>{item.status || "#"}</td>
                                <td>{item.projectManager}</td>
                                <td>
                                  <Dropdown className='dotTView'>
                                    <Dropdown.Toggle variant="" className='dropBTn dotTxt' id="dropdown-basic">
                                      <p>...</p>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='tableMenuModal'>
                                      <Dropdown.Item className='tableMEnuTxt' onClick={() => showdata(item)} ><TbEye className='mr-3' /> Show</Dropdown.Item>
                                      <>
                                        {auth.admin ? null : (
                                          <>
                                            <Dropdown.Item className='tableMEnuTxt'
                                            // onClick={() => { setEmployeeToEdit(item); setIsModalOpen(true); }} 
                                            >
                                              <CiEdit className='mr-3' /> Edit</Dropdown.Item>
                                            <Dropdown.Item className='tableMEnuTxt'><RiDeleteBinLine className='mr-3' /> Delete</Dropdown.Item>
                                          </>
                                        )}
                                      </>
                                    </Dropdown.Menu>
                                  </Dropdown>
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

export default Project;