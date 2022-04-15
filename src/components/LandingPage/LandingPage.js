import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import data from '../../data/paymentData';
import DeleteModal from '../deleteModal';
import Posts from '../posts/Posts.js'
import PaginationComp from '../paginationComp/PaginationComp';
import AddRowModal from '../addRowModal/AddRowModal.js';
import moment from 'moment';
import './LandingPage.css';

const LandingPage = () => {

  const [displayData, setDisplayData] = useState(data);
  const [tableColumns, setTableColumns] = useState();
  const [currentPage, setCurrentPage] = useState(1,getLocalStorageData);
  const [postsPerPage, setPostsPerPage] = useState(5,getLocalStorageData);
  const [currentPosts, setCurrentPosts] = useState(getLocalStorageData);
  const [sortClicked, setSortClicked] = useState(false);
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [dateWiseFilteredData, setDateWiseFilteredData] = useState(data);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filter, setFilter] = useState('All');
  const [toDateError, setToDateError] = useState(false);
  const [fromDateError, setFromDateError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState();


  // Extracting columns for the table
  useEffect(() => {
    getTableColumns(data);
  }, []);

  // Saving data to localStorage
  useEffect(() => {
    window.localStorage.setItem('postsPerPage', JSON.stringify(postsPerPage));
    window.localStorage.setItem('currentPage', JSON.stringify(currentPage));
    window.localStorage.setItem('currentPosts', JSON.stringify(currentPosts));
  }, [postsPerPage, currentPage, displayData, currentPosts, displayData]);

  // Modifying data as per page number to display on screen
  useEffect(() => {
    if (paginationClicked == true || paginationClicked == false || sortClicked == true || sortClicked == false)
      modifyDisplayData();
  }, [paginationClicked, sortClicked]);

  useEffect(()=> {
    modifyDisplayData();
  },[displayData])

  useEffect(() => {
    // debugger;
    // console.log("localStorage currentPosts", JSON.parse(localStorage.getItem('currentPosts')));
    console.log("localStorage postsPerPage", JSON.parse(localStorage.getItem('postsPerPage')));
    console.log("localStorage currentPage", JSON.parse(localStorage.getItem('currentPage')));
    // setPostsPerPage(JSON.parse(localStorage.getItem('postsPerPage')));
    // setCurrentPage(JSON.parse(localStorage.getItem('currentPage')));
    // setCurrentPosts(JSON.parse(window.localStorage.getItem('currentPosts')));
    // modifyDisplayData();
  }, []);

  function getLocalStorageData () {
    // debugger;
    const rows = JSON.parse(localStorage.getItem('postsPerPage'));
    const currPage = JSON.parse(localStorage.getItem('currentPage'));
    // const posts = JSON.parse(localStorage.getItem('currentPosts'));
    console.log("getLocalStorageData rows",rows);
    console.log("getLocalStorageData currPage",currPage);
    setPostsPerPage(rows);
    setCurrentPage(currPage);
    // console.log("getLocalStorageData posts",posts);
  }

  // Modifying data as per page number to display on screen
  const modifyDisplayData = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPoststoDis = displayData.slice(indexOfFirstPost, indexOfLastPost);
    setItemsPerPage(Object.keys(currentPoststoDis).length);
    setCurrentPosts(currentPoststoDis);
  }

  // Setting table columns values
  const getTableColumns = (data) => {
    const keys = Object.keys(data[0]);
    keys.push('Action')
    setTableColumns(keys);
  }

  // Pagination
  const paginate = (pageNum) => {
    setPaginationClicked(!paginationClicked);
    setCurrentPage(pageNum)
  }

  //Getting input form the user to select rows
  const getRowsInput = (e) => {
    setPaginationClicked(!paginationClicked);
    setPostsPerPage(e.target.value);
  }

  // Search functionality supported for strings
  const handleSearch = (e) => {
    const searchKeyWord = e.target.value
    setSearchValue(searchKeyWord);
    setCurrentPage(1);
    let tempData = [];
    if (displayData && displayData.length > 0) {
      displayData.forEach((item) => {
        if (
          item.customerEmail.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
          item.paymentId.toString().includes(searchKeyWord.toLowerCase()) ||
          item.merchatId.toString().includes(searchKeyWord.toLowerCase()) ||
          item.paymentStatus.toLowerCase().includes(searchKeyWord.toLowerCase())
        ) {
          tempData.push(item);
        }
      });
      setCurrentPosts(tempData);
      // setDisplayData(tempData);
    }
  }

  const handleFromDate = (fromDateVar) => {
    console.log("handleFromDate");
    console.log("from date", new Date(fromDateVar))
    console.log("toDate", toDate)
    if (toDate && new Date(fromDateVar) > new Date(toDate)) {
      setFromDateError(true);
    } else {
      let dataArr;
      if (toDate) {
        dataArr = currentPosts;
      } else {
        dataArr = displayData;
      }
      setCurrentPage(1);
      setFromDateError(false);
      setFromDate(fromDateVar);
      let tempData = [];
      if (displayData && displayData.length > 0) {
        dataArr.forEach((item) => {
          if (new Date(item.orderDate) >= new Date(fromDateVar)) {
            console.log("item in from", item);
            tempData.push(item);
          }
        });
        console.log("from date arrya", tempData);
        setDateWiseFilteredData(tempData);
        // setCurrentPosts(tempData);
        // setDisplayData(tempData);
      }
    }
  };

  const handleToDate = (toDateVar) => {
    console.log("handleToDate");
    console.log("newValue to date", toDateVar)
    console.log("to date dateWiseFilteredData", dateWiseFilteredData);
    if (fromDate && new Date(toDateVar) < new Date(fromDate)) {
      setToDateError(true);
    } else {
      let dataArr;
      if (fromDate) {
        dataArr = dateWiseFilteredData;
      } else {
        dataArr = data;
      }
      setCurrentPage(1);
      setToDateError(false)
      setToDate(toDateVar);
      let tempData = [];
      if (dateWiseFilteredData && dateWiseFilteredData.length > 0) {
        dataArr.forEach((item) => {
          if (new Date(item.orderDate) <= new Date(toDateVar)) {
            console.log("item in to array", item)
            tempData.push(item);
          }
        });
        console.log("from date arrya", tempData);
        setCurrentPosts(tempData);
        // setDisplayData(tempData);
      }
    }
  };

  const handleDelete = (id) => {
    setPaymentToDelete(id);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }
  const closeAddRowModal = () => {
    setShowAddModal(false)
  }

  const deletePayment = (id) => {
    setShowDeleteModal(false);
    const tempData = displayData.filter((item) => item.paymentId !== id);
    setDisplayData(tempData);
    // getDisplayData(firstIndex, lastIndex);
  }

  // Sorting the data in acsn and desc order
  const sortTheRows = (order, property) => {
    setSortClicked(!sortClicked);
    const copyOfOriginalData = displayData?.sort((a, b) => {

      if (typeof a[property] === 'number') {
        if (order === 'asc') return a[property] - b[property];
        else return b[property] - a[property];
      } else {
        let fa = a[property]?.toLowerCase();
        let fb = b[property]?.toLowerCase();
        if (order === 'asc') {
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } else {
          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
          return 0;
        }
      }

    });
    setDisplayData(copyOfOriginalData);
  }

  const handleAddPaymentClick = () => {
    setShowAddModal(true);
  }

  // Payment Id dropdown filtering 
  const handleFilter = (e) => {
    setCurrentPage(1);
    const value = e.target.value
    setFilter(value)
    let tempData = [];
    if (displayData && displayData.length > 0) {
      if (value.toLowerCase() === 'all') {
        tempData = displayData;
      }
      displayData.forEach((item) => {
        if (item.paymentStatus.toLowerCase() === value.toLowerCase()) {
          tempData.push(item);
        }
      });
      // setDisplayData(tempData);
      setCurrentPosts(tempData)
    }
  }
  
  // console.log("display data", displayData[0]);
  const getFormData = (data) => {
    console.log("data form in the parent", data);
    let tempArr=[];
    const tempObj = {
      paymentId: parseInt(data.inputPaymentId),
      // orderDate: data.inputDate.toLocaleDateString('en-US'),
      orderDate: data.inputDate,
      merchatId: parseInt(data.inputMerchantId),
      customerEmail: data.inputEmail,
      amount : parseInt(data.inputAmount),
      paymentStatus: data.inputPaymentStatus,
    }
    tempArr.push(tempObj,...displayData);
    console.log("temm Array",tempArr);
    setDisplayData(tempArr);
  }

  return (
    <>
      <header>Payment Details</header>
      <div className='outer-wrapper'>
        <section className="shipment-count">
          <div>
            Search Table{"  "}
            <input type={"text"} placeholder={"Search"} value={searchValue} onChange={handleSearch}></input>
          </div>
          <button type={"button"} className="add-payment" dataToggle="modal" dataTarget="#exampleModal" onClick={() => { handleAddPaymentClick() }}>Add Payment Detail</button>
        </section>
        <Posts
          posts={currentPosts}
          columns={tableColumns}
          sortRows={sortTheRows}
          handleDelete={handleDelete}
          filter={filter}
          handleFilter={handleFilter}
          fromDate={fromDate}
          fromDateError={fromDateError}
          handleFromDate={handleFromDate}
          toDate={toDate}
          toDateError={toDateError}
          handleToDate={handleToDate}
        />
        <div className="footer-wrapper">
          <div>Showing Rows:<input type="number" min={1} max={displayData.length} value={postsPerPage} onChange={getRowsInput} placeholder="rows" /></div>
          <div className='footer-pageNo'>
            <span>Page Number:{" "}</span>
            <PaginationComp postsPerPage={postsPerPage} totalPosts={displayData.length} paginate={paginate} activePage={currentPage} />
          </div>
        </div>

        {showDeleteModal && <DeleteModal
          paymentToDelete={paymentToDelete}
          closeDeleteModal={closeDeleteModal}
          deletePayment={deletePayment}
        ></DeleteModal>}

        {showAddModal && (
          <AddRowModal closeAddRowModal={closeAddRowModal} formData={getFormData}/>
        )}
      </div>
    </>
  )
}

export default LandingPage;