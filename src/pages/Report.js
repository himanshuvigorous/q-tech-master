
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import moment from 'moment';
import './Index.css';
import Loading from '../component/Loading/Loading';
import { toast } from 'react-toastify';
import { IoIosRefresh } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../Redux/actions/usersActions';
import { httpPost } from '../Helper/Helper';

function Report(props) {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const [data, setUsers] = useState();
  const auth = useSelector((state) => state.auth.user);
  const [userType, setUserType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [refresh, setRefresh] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportDataByDate, setReportDataByDate] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers("/company/getallbankbyuserid"));
  }, [dispatch, auth, refresh]);

  const handleClick = () => {
    setRefresh(!refresh);
  };

  const setSelectedUserType = async (e) => {
    setReportDataByDate(null);

    setUserType(e)
    if (!e) {
      toast.error("Please select a holder.");
      return;
    }
    const holder_name = e;
    const response = await httpPost(`/company/paymentstatementget`, { holder_name });
    if (response.success) {
      setReportData(response?.data[0]);
    }
  };

  const filteredOptions = usersData?.data ? usersData.data.map(user => user.holder_name) : [];

  const handleSubmit = () => {
    const startDateFormatted = moment(startDate).format("MM-DD-YYYY");
    const endDateFormatted = moment(endDate).format("MM-DD-YYYY");

    if (!reportData) {
      toast.error("No report data available");
      return;
    }
    const filterData = reportData.transactions.filter(item => {
      const transactionDate = moment(item.date).format("MM-DD-YYYY");
      return moment(transactionDate).isBetween(startDateFormatted, endDateFormatted, null, '[]');
    });
    setReportDataByDate(filterData);
  };


  return (
    <>
      <div className='allPageMainView'>
        <div className='container-fluid'>
          <div className='tableDataView'>
            <div className='row'>
              <div className='col-lg-12 col-sm-12'>
                <div className='tableMainBoxView tableDataHeight'>
                  <div className='filterView'>
                    <div className='tableHeadC'>
                      <Link to='/app/dashboard'> <MdArrowBack /></Link>
                      <h3>Report List</h3>
                    </div>
                    <div className='filterBoxView'>
                      <button type="button" className="btn padd4 refreshBTn mainBtn" onClick={() => handleClick()} ><IoIosRefresh size={20} /> Clear</button>
                    </div>
                  </div>
                  <div className='filterInputBox'>
                    <div className='filterInput'>
                      <div className='innerFIlterBox'>
                        <div className="input-group rounded-pill inputMobileWidth">
                          <div className=''>
                            <span>Holder</span>
                          </div>
                          <Form.Select value={userType} className='form-control selectWidth' onChange={(e) => setSelectedUserType(e.target.value)}>
                            <option value="">Select Type</option>
                            {filteredOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </Form.Select>
                        </div>
                        <div className="input-group rounded-pill inputMobileWidth">
                          <div className=''>
                            <span>Start Date</span>
                          </div>
                          <DatePicker className='form-control selectWidth' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                      </div>
                      <div className='innerFIlterBox'>
                        <div className="input-group rounded-pill inputMobileWidth">
                          <div className=''>
                            <span>End Date</span>
                          </div>
                          <DatePicker className='form-control selectWidth' selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                        <button type="button" className="innerFIlterBtn btn" onClick={handleSubmit}><span>Submit</span></button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">

                      {loading ? (
                        <div>
                          <div>
                            <div colSpan={10} className='nodataView'>
                              <Loading className="text-center w-full" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="card">
                          <div className="card-header">
                            <span>Total Balance:</span> <span className='BalanceValue'> {reportData ? reportData.balance : 0}</span>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">Holder name : {reportData?.holder_name}</h5>
                            <p className="card-text">Account: {reportData?.account_no}</p>
                            {reportData && reportData?.transactions.length > 0 ? (
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Withdrawals/Debit</th>
                                    <th>Deposit/Credit</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reportDataByDate?.map((item, index) => (
                                    <tr key={index}>
                                      <td>{moment(item.date).format('MMM DD')}</td>
                                      <td>{item.remark}</td>
                                      <td>{item.debit}</td>
                                      <td>{item.credit}</td>
                                      <td>{item.amount}</td>
                                      <td>{item.balance}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p>No data available</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
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

export default Report;

