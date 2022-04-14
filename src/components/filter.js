import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Filter = ({ fromDate,
  fromDateError,
  handleFromDate,
  toDate,
  toDateError,
  handleToDate, }) => {

  return (
    <>
      <section className="">
        <div className="from-to-wrap">
          <div className="datePicker-wrap">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="From Date"
                  inputFormat="dd/MM/yyyy"
                  value={fromDate}
                  onChange={(e) => handleFromDate(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </MuiPickersUtilsProvider>
            {fromDateError && <div className="error">*From Date must be less than or equal to To Date</div>}
          </div>
          <div className="datePicker-wrap">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="To Date"
                  inputFormat="dd/MM/yyyy"
                  value={toDate}
                  onChange={(e) => handleToDate(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </MuiPickersUtilsProvider>
            {toDateError && <div className="error">*To Date must be greater than or equal to From Date</div>}
          </div>
        </div>
      </section>

    </>
  )
}

export default Filter;
