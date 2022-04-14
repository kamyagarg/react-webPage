import React from 'react';
import Images from '../utils/Images.js';

const DeleteModal = (props) => {
  return (
    <div className="modalBody">
      <div className="modalContent">
        <div className='modal-header'>
        <div className="modal-title">Delete Payment ?</div>
        <img className="close" src={Images.closeIcon} alt="" onClick={() => props.closeDeleteModal()} />
        </div>
        <div className='modal-body'>
          <div className="desc">Payment "{props.paymentToDelete}" will not be shown in the table</div>
        </div>
        <div className="modal-footer buttons">
          <button className="cancel button btn btn-primary" onClick={() => props.closeDeleteModal()}>Cancel</button>
          <button className="deleteButton button btn btn-danger" onClick={() => props.deletePayment(props.paymentToDelete)}>Yes, Delete</button>
        </div>
      </div>
    </div>
  )
};

export default DeleteModal;
