import React, { useEffect, useState } from 'react';
import Utils from '../../utils/Utils';
import CommonTooltip from '../tooltip';
import moment from 'moment';
import Images from '../../utils/Images';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Filter from '../filter';

const Posts = ({ posts, columns, sortRows, handleDelete, handleFilter, filter, fromDateError, handleFromDate, toDate, toDateError, handleToDate }) => {

  const [totalPostsRec, setTotalPostRec] = useState();

  useEffect(() => {
    setTotalPostRec(posts?.length);
  }, [posts]);

  return (
    <section className="table">
      <div className="table-header">
        {columns?.map(title => {
          return (
            <div className="email first head">
              <div className="column-header-wrapper">
                <span>{Utils.camelToSpace(title)}</span>
                {title.toLowerCase() !== 'action' && (
                  <div className="arrow" >
                    <div className="arrow-up" onClick={() => sortRows('asc', title)}></div>
                    <div className="arrow-down" onClick={() => sortRows('desc', title)}></div>
                  </div>
                )}
              </div>
              {title === 'paymentStatus' && (
                <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter ?? "All"}
                    label="Payment Status"
                    onChange={handleFilter}
                  >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'Initiated'}>Initiated</MenuItem>
                    <MenuItem value={'Failed'}>Failed</MenuItem>
                    <MenuItem value={'Dropped'}>Dropped</MenuItem>
                    <MenuItem value={'Success'}>Success</MenuItem>
                    <MenuItem value={'Refunded'}>Refunded</MenuItem>
                  </Select>
                </FormControl>
                </div>
              )}
  
              {title.toLowerCase() === 'orderdate' && (
                <div className="filter-dropdown">
                  <Filter
                    fromDateError={fromDateError}
                    handleFromDate={handleFromDate}
                    toDate={toDate}
                    toDateError={toDateError}
                    handleToDate={handleToDate}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className='table-body'>
        {posts && posts.map(item => (
          <div className="table-row" key={item.customerEmail}>
            <div className="row-element paymentId first">{item.paymentId}</div>
            <div className="row-element orderDate second">{moment(item.orderDate).format('DD MMM YYYY')}</div>
            {/* <div className="row-element orderDate second">{item.orderDate}</div> */}
            <div className="row-element merchantId third">{item.merchatId}</div>
            <div className="row-element email fourth">{item.customerEmail}</div>
            <div className="row-element amount fifth">{item.amount}</div>
            <div className="row-element paymentStatus sixth">{item.paymentStatus}</div>
            <div className="row-element seventh delete"
              onClick={() => handleDelete(item.paymentId)}
            >
              <CommonTooltip title='Delete this Payment' placement="top">
                <img className="deleteIcon" src={Images.Delete} alt="" />
              </CommonTooltip>
            </div>
          </div>
        ))}
        {totalPostsRec === 0 && (
          <>No Matching Results Found</>
        )}
      </div>
    </section>
  )
}

export default Posts;
