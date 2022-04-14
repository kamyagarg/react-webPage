import React, { useEffect, useState } from 'react';
import Images from '../../utils/Images';

const AddRowModal = ({ paymentToDelete, closeAddRowModal, deletePayment }) => {

  const[inputPaymentId, setInputPaymentId] = useState();
  const[inputFromDate, setInputFromDate] = useState();
  const[inputToDate, setInputToDate] = useState();
  const[inputMerchantId, setInputMerchantId] = useState();
  const[inputEmail, setInputEmail] = useState();
  const[inputAmount, setInputAmount] = useState();
  const[inputPaymentStatus, setInputPaymentStatus] = useState();

  const getFormData = (e) => {
    console.log("getFormData", e.target);
    // e.preventDefault();
  }

  console.log("inputPaymentId",inputPaymentId);
  console.log("inputFromDate",inputFromDate);
  console.log("inputToDate",inputToDate);
  console.log("inputMerchantId",inputMerchantId);
  console.log("inputEmail",inputEmail);
  console.log("inputAmount",inputAmount);
  console.log("setInputPaymentStatus",inputPaymentStatus);


  useEffect(() => {
    
  },[])

  return (
    <div className="modalBody">
      <div className="modal-add">
        <div className='modal-header'>
          <div className="modal-title">Add Data</div>
          <img className="close" src={Images.closeIcon} alt="" onClick={() => closeAddRowModal()} />
        </div>
        <div className='modal-body'>
          <form onSubmit={(e) => getFormData(e)}>
            <div className="form-row">
              <div className="form-group  ">
                <label htmlFor="inputPaymentId">Payment Id</label>
                <input onChange={(e)=>setInputPaymentId(e.target.value)} type="number" className="form-control" id="inputPaymentId" placeholder="Payment Id" />
              </div>
              <div className="form-group  ">
                <label htmlFor="inputFromDate">To Date</label>
                <input onChange={(e)=>setInputFromDate(e.target.value)} type="date" className="form-control" id="inputFromDate" />
                <label htmlFor="inputToDate">From Date</label>
                <input onChange={(e)=>setInputToDate(e.target.value)} type="date" className="form-control" id="inputToDate" />
              </div>
              <div className="form-group  ">
                <label htmlFor="inputMerchantId">Merchant Id</label>
                <input onChange={(e)=>setInputMerchantId(e.target.value)} type="number" className="form-control" id="inputMerchantId" placeholder="Merchant Id" />
              </div>
              <div className="form-group  ">
                <label htmlFor="inputEmail">Email</label>
                <input onChange={(e)=>setInputEmail(e.target.value)} type="email" className="form-control" id="inputEmail" placeholder="Email" />
              </div>
              <div className="form-group  ">
                <label htmlFor="inputAmount">Amount</label>
                <input onChange={(e)=>setInputAmount(e.target.value)} type="number" className="form-control" id="inputAmount" placeholder="Amount" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inputPaymentStatus">Payment Status</label>
                <select id="inputPaymentStatus" className="form-control"onChange={(e)=>setInputPaymentStatus(e.target.value)} >
                  <option selected>Choose...</option>
                  <option>Initiated</option>
                  <option>Failed</option>
                  <option>Dropped</option>
                  <option>Success</option>
                  <option>Refunded</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer buttons">
          <button className="cancel button btn btn-danger" onClick={() => closeAddRowModal()}>Cancel</button>
          {/* <button type='submit' className="deleteButton button btn btn-primary" onClick={(e)=>{getFormData(e)}}>Save Data</button> */}
          <input type="submit" value="Submit Data" className="deleteButton button btn btn-primary" />
        </div>
      </div>
    </div>
  )
}

export default AddRowModal;