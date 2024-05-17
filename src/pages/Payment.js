import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import { toast } from 'react-toastify';
import './Index.css';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { fetchUsers } from '../Redux/actions/usersActions';
import axios from 'axios';
import { httpPost } from '../Helper/Helper';
import { moment } from 'moment';
import Loading from '../component/Loading/Loading';

function Payment(props) {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [remark, setRemark] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { user: auth } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUsers("/company/getallbankbyuserid"));
  }, [auth, dispatch, refresh]);
  const handleClick = () => {
    setRefresh(!refresh);
  };
  const handleButtonClick = (buttonName) => {
    setSelectedUserType(buttonName);
  };
  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setAmount("");
  };
  const filteredOptions = usersData?.data && usersData.data ? usersData.data?.map(user => user.holder_name) : [];
  const filteredData = usersData?.data ? usersData.data?.filter(user => user.holder_name === selectedUserType) : [];
  const handleSubmit = () => {
    if (!selectedUserType || !amount || !paymentType) {
      toast.error("Please fill in all fields.");
      return;
    }
    const balanceChange = paymentType === "credit" ? parseFloat(amount) : -parseFloat(amount);
    const payload = {
      userBankDetails: filteredData[0], // Assuming only one user is selected
      payment: {
        holder_name: selectedUserType,
        date,
        paymentType,
        balanceChange, remark
      }
    };
    // Send payload to API
    // Example API call:
    httpPost('/company/paymentadduser', payload)
      .then(response => {
        // Handle response
        handleClick()
        toast.success("Payment added successfully.");
      })
      .catch(error => {
        // Handle error
      });
  };
  return (
    <div className='allPageMainView'>
      <div className='container-fluid'>
        <div className='tableDataView'>
          <div className='row'>
            <div className='col-lg-12 col-sm-12'>
              <div className='tableMainBoxView tableDataHeight'>
                <div className='filterView'>
                  <div className='tableHeadC'>
                    <Link to='/app/dashboard'><MdArrowBack /></Link>
                    <h3>Payment Mode</h3>
                  </div>
                  <div className='filterBoxView'>
                    <button type="button" className="btn padd4 refreshBTn mainBtn" onClick={() => handleClick()}>
                      <MdArrowBack size={20} />
                      Clear
                    </button>
                  </div>
                </div>
                <div className='filterInputBox'>
                  <div className='filterInput'>
                    <div className='innerFIlterBox'>
                      <div className="input-group rounded-pill InnerinputPadd">
                        <div className=''>
                          <span>Holder Type</span>
                        </div>
                        <Form.Select value={selectedUserType} className='form-control selectWidth' onChange={(e) => handleButtonClick(e.target.value)}>
                          <option value="">Select Type</option>
                          {filteredOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="input-group rounded-pill InnerinputPadd">
                        <div className=''>
                          <span>Remark</span>
                        </div>
                        <input type="text" name='remark' value={remark} onChange={(e) => setRemark(e.target.value)} className="form-control selectWidth" id="remark" placeholder="Enter Remark" />
                      </div>
                      <div className="input-group rounded-pill InnerinputPadd">
                        <div className=''>
                          <span>Date</span>
                        </div>
                        <DatePicker className='form-control selectWidth' selected={date} onChange={(date) => setDate(date)} />
                      </div>
                    </div>
                    <div className='innerFIlterBox'>
                      <div className="input-group rounded-pill InnerinputPadd">
                        <div className=''>
                          <span>Payment Type</span>
                        </div>
                        <Form.Select value={paymentType} className='form-control selectWidth' onChange={handlePaymentTypeChange}>
                          <option value="">Select Type</option>
                          <option value="debit">Debit</option>
                          <option value="credit">Credit</option>
                        </Form.Select>
                      </div>
                      <div className="input-group rounded-pill InnerinputPadd">
                        <div className=''>
                          <span>Amount</span>
                        </div>
                        <input
                          type="number"
                          className="form-control selectWidth"
                          id="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder={`Enter ${paymentType === 'debit' ? 'debit' : 'credit'} amount`}
                        />
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
                    ) :
                      <>
                        {
                          filteredData.map(user => (
                            <div key={user._id} className="card mb-3">
                              <div className="card-header">
                              <span>Balance:</span> <span className='BalanceValue'>{user.balance || "0.00"}</span>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">Account No: {user.account_no}</h5>
                                <p className="card-text">Holder Name: {user.holder_name}</p>
                                <p className="card-text">Branch: {user.branch}</p>
                                <p className="card-text">IFSC: {user.ifsc}</p>
                                <p className="card-text">Mobile: {user.mobile}</p>
                                <p className="card-text">Address: {user.address}</p>
                              </div>
                            </div>
                          ))
                        }
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

