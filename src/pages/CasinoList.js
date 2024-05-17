import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import moment from 'moment';
import './Index.css';
import Loading from '../component/Loading/Loading';
import Dropdown from 'react-bootstrap/Dropdown';
import CreateCompanyModale from '../component/Modale/CreateCompanyModale';
import { RiDeleteBinLine, RiFolderVideoFill } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import { TbEye } from 'react-icons/tb';
import { IoIosRefresh } from "react-icons/io";
import CreateUserModale from '../component/Modale/CreateUserModale';
import { fetchUsers } from '../Redux/actions/usersActions';
import UpdateUserModal from '../component/Modale/UpdateUserModal';
import { Link, useNavigate } from 'react-router-dom';
import { httpGet, httpPost } from '../Helper/Helper';
import ShowFullDataModal2 from '../component/Modale/ShowFullDataModale2';

function CasinoList() {
  // const usersData = useSelector((state) => state.users.users);
  // const loading = useSelector((state) => state.users.loading);
  const [loading,setLaoding] = useState(false);
  // const auth = useSelector((state) => state.auth.user);
  // const [users, setUsers] = useState({ company: [], pms: [], leads: [] });

  // useEffect(() => {
  //   setUsers(usersData)
  // }, [usersData]);


  const dispatch = useDispatch();
  const { user: auth } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      // dispatch(fetchUsers("admin/getCompanyList"));
      fetchData()
    }
  }, [auth, dispatch, refresh]);
  const handleClick = () => {
    setRefresh(!refresh);
  };
  // const alertmsg = () => {
  //   toast.error("You can't Create")
  // }

const [resData, setResData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [userEditData, setUserEditData] = useState(null);
  const [showIframe, setShowIframe ] = useState(false)


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
      
    
        const response = await httpPost('admin/getCasinoList');
        setResData(response.data)
        console.log("response",response);
        if (response) {
          setResData(response)
                 
        }

    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setLaoding(false)
    }
  };
console.log(resData);
  const handleButtonClick = (videoUrl2) => {
    console.log(videoUrl2)
    navigate(`app/tl`);
  };

  // const linkdata = (url) =>{
  //   navigate(`/app/casinoPlayer/${url}`)
  // }



  return (
    <>
      <ShowFullDataModal2 isShowUserDataModale={isShowUserDataModale} userData={showalldata} closeModal={closeModal} />

      {loading && <Loading />}

     {resData && resData?.data.length > 0 && <div className='allPageMainView'>
        <div className='container-fluid'>
          <div className='tableDataView'>
            <div className='row'>
              <div className='col-lg-12 col-sm-12'>
                <div className='tableMainBoxView tableDataHeight '  style={{  backgroundColor: "rgb(25, 47, 59)", paddingBottom:"5px",marginBottom:"10px" }}>
                  <div className='filterView'>
                    <div className='tableHeadC'>
                      <Link to='/app/dashboard' style={{color:"white" }}> <MdArrowBack /></Link>
                      {/* <MdArrowBack /> */}
                      <h3>Casino List</h3>
                    </div>
                    <div className='filterBoxView'>
                      {/* <div className="input-group rounded-pill inputMobileWidth">
                        <input type="text" className="form-control rounded-pill" placeholder="Search" />
                      </div> */}
                      {/* <button type="button" className="btn padd4 refreshBTn mainBtn" onClick={() => handleClick()} ><IoIosRefresh size={20} /> Refresh</button> */}
                      {/* <button disabled type="button" className="btn mainBtn" onClick={() => setIsModalOpen(true)} ><span>Add New Data</span></button> */}
                    </div>
                  </div>


                  <div className=''>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className='text-center' scope="col">S.no</th>
                          <th className='text-center' scope="col">Date</th>
                          <th className='text-center' scope="col">Name</th>
                          <th className='text-center' scope="col">Short Name</th>
                          <th className='text-center' scope="col">Min Stack</th>
                          <th className='text-center' scope="col">Max Stack</th>
                          <th className='text-center' scope="col">Fetch Data</th>
                          <th className='text-center' scope="col">Video</th>
                          {/* <th className='text-center' scope="col"></th> */}
                        </tr>
                      </thead>
                      {!loading && 
                        <tbody>
                          {console.log("resData",resData)}
                          {resData && resData?.data.length > 0 ? (
                            resData.data.map((item, index) => (
                              <tr key={item._id}>
                              {/* <tr onClick={() => handleRowClick(item._id)} key={item._id}> */}
                                <th className='text-center' scope="row">{index + 1}</th>
                                <td className='text-center' >{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='text-center' >{item.name}</td>
                                <td className='text-center' >{item.shortName}</td>
                                <td className='text-center' >{item.minStake}</td>
                                <td className='text-center' >{item.maxStake}</td>
                                <td className='text-center' >{item.fetchData}</td>
                                


                          
                                {/* <td className='text-center' >{item.email}</td> */}
                                {/* <td>{item.employees_name.length}</td> */}

                                <td className='text-center'>
                                  
                               <div className='justify-content-center cursor-pointer d-flex gap-2'>
                                <div onClick={() => showdata(item.videoUrl2)}>
                              
                               <strong className='linkstyle' > Link 1</strong>
                                </div>
                                <div onClick={() => showdata(item.videoUrl1)}>
                                <strong className='linkstyle' > Link 2</strong>
                                {/* <RiFolderVideoFill  onClick={() => showdata(item.cacheURL)} />
                                <FaLink  onClick={() => showdata(item.socketURL)} /> */}
                               </div>
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
      </div>}
    </>
  )
}

export default CasinoList