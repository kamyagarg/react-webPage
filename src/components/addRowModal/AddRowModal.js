import React, { useEffect, useState } from 'react';
import Images from '../../utils/Images';
import '../LandingPage/LandingPage.css';

const AddRowModal = ({ closeAddRowModal,formData }) => {

  const initialFormValues = {
    inputPaymentId: '',
    inputDate: '',
    inputMerchantId: '',
    inputEmail: '',
    inputAmount: '',
    inputPaymentStatus: '',
  }
  const [inputFormValues, setInputFormValues] = useState(initialFormValues);
  const [inputFormErrors, setInputFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    setInputFormErrors(validateForm(inputFormValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(inputFormErrors).length === 0 && isSubmit) {
      console.log("inputFormValues",inputFormValues.inputDate.toLocaleString('en-US'))
      formData(inputFormValues);
    }
  }, [inputFormErrors])

  // useEffect(()=>{
  //   if(Object.keys(inputFormErrors).length === 0 && isSubmit){
  //     formData(inputFormValues);
  //   }
  // },[inputFormValues])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputFormValues({ ...inputFormValues, [name]: value });
  }
   

  const validateForm = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.inputPaymentId) {
      errors.inputPaymentId = "Payment Id is required."
    }
    if (!values.inputDate) {
      errors.inputDate = "Date is required."
    }
    if (!values.inputMerchantId) {
      errors.inputMerchantId = "Merchant Id is required."
    }
    if (!values.inputEmail) {
      errors.inputEmail = "Email is required."
    } else if (!regex.test(values.inputEmail)) {
      errors.inputEmail = "This is not a valid email format."
    }
    if (!values.inputAmount) {
      errors.inputAmount = "Amount is required."
    }
    if (!values.inputPaymentStatus) {
      errors.inputPaymentStatus = "Payment Status is required."
    }

    return errors;
  }

  return (
    <div className="modalBody">
      <div className="modal-add">
        <div className='modal-header'>
          <div className="modal-title">Add Data</div>
          <img className="close" src={Images.closeIcon} alt="" onClick={() => closeAddRowModal()} />
        </div>
        <div className='modal-body'>
          {(Object.keys(inputFormErrors).length === 0 && isSubmit)
            ? <div>
                <span>Payment ID "{inputFormValues.inputPaymentId}" Added Successfully</span>
                <img 
                  className='img-tick'
                  src={Images.Tick}
                />
              </div>
            : (
              <form onSubmit={handleForm}>
                <div className="form-row">
                  <div className="form-group  ">
                    <label htmlFor="inputPaymentId">Payment Id</label>
                    <input
                      name="inputPaymentId"
                      value={inputFormValues.inputPaymentId}
                      onChange={handleChange}
                      type="number"
                      className="form-control"
                      id="inputPaymentId"
                      placeholder="Payment Id"
                    />
                  </div>
                  <span classname="form-error-msg" style={{ color: "red", fontSize: "0.8rem" }}>{inputFormErrors.inputPaymentId}</span>
                  <div className="form-group  ">
                    <label htmlFor="inputDate">Date</label>
                    <input
                      name="inputDate"
                      value={inputFormValues.inputDate}
                      onChange={handleChange}
                      type="date"
                      className="form-control"
                      id="inputDate"
                    />
                  </div>
                  <span classname="form-error-msg" style={{ color: "red", fontSize: "0.8rem" }}>{inputFormErrors.inputDate}</span>
                  <div className="form-group  ">
                    <label htmlFor="inputMerchantId">Merchant Id</label>
                    <input
                      name="inputMerchantId"
                      value={inputFormValues.inputMerchantId}
                      onChange={handleChange}
                      type="number" className="form-control" id="inputMerchantId" placeholder="Merchant Id" />
                  </div>
                  <span classname="form-error-msg" style={{ color: "red", fontSize: "0.8rem" }}>{inputFormErrors.inputMerchantId}</span>
                  <div className="form-group  ">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      name="inputEmail"
                      value={inputFormValues.inputEmail}
                      onChange={handleChange}
                      type="email" className="form-control" id="inputEmail" placeholder="Email" />
                  </div>
                  <span classname="form-error-msg" style={{ color: "red", fontSize: "0.8rem" }}>{inputFormErrors.inputEmail}</span>
                  <div className="form-group  ">
                    <label htmlFor="inputAmount">Amount</label>
                    <input
                      name="inputAmount"
                      value={inputFormValues.inputAmount}
                      onChange={handleChange}
                      type="number" className="form-control" id="inputAmount" placeholder="Amount" />
                  </div>
                  <span classname="form-error-msg" style={{ color: "red", fontSize: "0.8rem" }}>{inputFormErrors.inputAmount}</span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inputPaymentStatus">Payment Status</label>
                    <select id="inputPaymentStatus" className="form-control" onChange={handleChange} name="inputPaymentStatus" value={inputFormValues.inputPaymentStatus}>
                      <option selected>Choose...</option>
                      <option>Initiated</option>
                      <option>Failed</option>
                      <option>Dropped</option>
                      <option>Success</option>
                      <option>Refunded</option>
                    </select>
                  </div>
                  <span classname="form-error-msg" style={{ color: "red", fontSize: "0.8rem" }}>{inputFormErrors.inputPaymentStatus}</span>
                </div>
                <div className="modal-footer buttons">
                  <button className="cancel button btn btn-danger" onClick={() => closeAddRowModal()}>Cancel</button>
                  <button type='submit' className="deleteButton button btn btn-primary">Save Data</button>
                </div>
              </form>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AddRowModal;
