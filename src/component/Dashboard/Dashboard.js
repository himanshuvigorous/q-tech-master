import React, { useEffect, useState } from 'react';
import { httpGet, httpPost } from '../../Helper/Helper';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from "../../actions/auth.action";
// import { logout } from "../../Redux/actions/auth.action";
import { useNavigate } from 'react-router-dom';
import '../dashboard.css';
import { LuAirplay, LuUsers, LuVoicemail } from "react-icons/lu";
import { logoutUser } from '../../Redux/actions/authActions';
import { fetchUsers } from '../../Redux/actions/usersActions';
import { TbBrandComedyCentral, TbUsersGroup } from "react-icons/tb";
import { IoIosGitNetwork } from "react-icons/io";
import { SiPolywork } from "react-icons/si";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
const Dashboard = (props) => {
  // const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth.user);
  // const usersData = useSelector((state) => state.users.users);
  // const [users, setUsers] = useState();
  // useEffect(() => {
  //   if (auth) {
  //     const url = "company/getcompanyalldatashowdesh"
  //     dispatch(fetchUsers(url));
  //     // setApiCalled(true);
  //   }
  // }, [auth]);

  // useEffect(() => {
  //   setUsers(usersData?.data)
  // }, [usersData]);
  // console.log("usersData", usersData);


  const dispatch = useDispatch();
  const { user: auth } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);

  // useEffect(() => {
  //   if (auth) {
  //     dispatch(fetchUsers("company/getcompanyalldatashowdesh"));
  //   }
  // }, [auth, dispatch]);


  return (
    <div className='allPageMainView'>
      <div className='container-fluid'>

        <div className='pointMainBox'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView'>
                  <div className='iconBox'>
                    <HiOutlineBuildingOffice className='pTBICon' />
                  </div>
                  <div className='pBoxNumberTXTView'>
                    <span>Total Project </span>
                    <h3>{users?.data?.project?.length || "0"}</h3>
                  </div>
                </div>
                <div className='pBoxTxtView'>
                  <span>+15%</span>
                  <p> then last week</p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView'>
                  <div className='iconBox'>
                    <TbUsersGroup className='pTBICon' />
                  </div>
                  <div className='pBoxNumberTXTView'>
                    <span>Total Employee</span>
                    <h3 className=''>{users.data?.employee?.length || "0"}</h3>
                  </div>
                </div>
                <div className='pBoxTxtView'>
                  <span>+15%</span>
                  <p> then last week</p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView'>
                  <div className='iconBox'>
                    <IoIosGitNetwork className='pTBICon' />
                  </div>
                  <div className='pBoxNumberTXTView'>
                    <span>Total Leads</span>
                    <h3>{users.data?.leads?.length || "0"}</h3>
                  </div>
                </div>
                <div className='pBoxTxtView'>
                  <span>+15%</span>
                  <p> then last week</p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView'>
                  <div className='iconBox'>
                    <SiPolywork className='pTBICon' />
                  </div>
                  <div className='pBoxNumberTXTView'>
                    <span>Total Project Manager</span>
                    <h3>{users?.data?.pm?.length || "0"}</h3>
                  </div>
                </div>
                <div className='pBoxTxtView'>
                  <span>+15%</span>
                  <p> then last week</p>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView justify-content-center'>
                  <div className='pBoxNumberTXTView'>
                    <h3 >Invoices</h3>
                  </div>
                </div>
                <div className='pBoxTxtView justify-content-between'>
                  <p>This Month</p>
                  <span className='amountBtn'>0.00</span>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView justify-content-center'>
                  <div className='pBoxNumberTXTView'>
                    <h3>Proforma Invoices</h3>
                  </div>
                </div>
                <div className='pBoxTxtView justify-content-between'>
                  <p>This Month</p>
                  <span className='amountBtn'>0.00</span>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView justify-content-center'>
                  <div className='pBoxNumberTXTView'>
                    <h3 >Offers</h3>
                  </div>
                </div>
                <div className='pBoxTxtView justify-content-between'>
                  <p>This Month</p>
                  <span className='amountBtn'>0.00</span>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-12'>
              <div className='pointBoxView'>
                <div className='pBoxNumberView justify-content-center'>
                  <div className='pBoxNumberTXTView'>
                    <h3>Unpaid</h3>
                  </div>
                </div>
                <div className='pBoxTxtView justify-content-between'>
                  <p>This Month</p>
                  <span className='amountBtn'>0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className='progressView'>
          <div className='row'>
            <div className='col-lg-8 col-'>
              <div className='progressLeftView'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <div className='progressLeftBox'>
                      <div className='progressTitle'>
                        <h3>Invoices</h3>
                      </div>
                      <div className='progressBox'>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='progressLeftBox'>
                      <div className='progressTitle'>
                        <h3>Invoices</h3>
                      </div>
                      <div className='progressBox'>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='progressLeftBox'>
                      <div className='progressTitle'>
                        <h3>Invoices</h3>
                      </div>
                      <div className='progressBox'>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className='progressMBox'>
                          <div className='progressTxt'>
                            <p>Draft</p>
                            <span>0%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='progressRightView'>
                <div className='progressRTitle'>
                  <h3>Customer</h3>
                </div>
                <div className='progressCircle'>
                  <div className="ui-widgets">
                    <div className="ui-values">50%</div>
                  </div>
                  <p>New Customer This Month</p>
                </div>
                <div className='activeCusatomer'>
                  <p>Active Customer</p>
                  <span>0.00%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tableDataView'>
          <div className='row'>
            <div className='col-lg-6 col-sm-12'>
              <div className='tableMainBoxView'>
                <div className='tableHead'>
                  <h3>Recent Invoices</h3>
                </div>
                <div className=''>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Pm</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-sm-12'>
              <div className='tableMainBoxView'>
                <div className='tableHead'>
                  <h3>Recent Invoices</h3>
                </div>
                <div className=''>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Pm</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
