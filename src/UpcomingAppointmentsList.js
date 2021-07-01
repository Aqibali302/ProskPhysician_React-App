import React from "react";

import Paper from "@material-ui/core/Paper";
import * as PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  VirtualTable,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  PagingState,
  IntegratedPaging,
} from "@devexpress/dx-react-grid";
import {
  withStyles,
  Input,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import { properties } from "./properties.js";
import CloseIcon from '@material-ui/icons/Close';
import * as moment from "moment";

import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = {
  numericInput: {
    textAlign: "right",
    width: "100%"
  }
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UpcomingAppointmentsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      first_name:"",
      middle_name:"",
      last_name:"",
      open:false,
      setOpen:false,
      open1:false,
      setOpen1:false,
      last_name:"",
      phone:"",
      email:"",
      gender_val:"",
      columns: [

        { name: "Aid", title: "Appointment#" },
        { name: "fname", title: "First Name" },
        { name: "lname", title: "Last Name" },
        { name: "doa", title: "Date of Appointment" },
        { name: "starttime", title: "Start Time" },
      { name: "status", title: "Status" },
        { name: "Action", title: "Documents" },
       // { name: "reminder", title: "Reminder" }
      ],

      rows: [],
      currencyFilterOperations: [
        "equal",
        "notEqual",
        "greaterThan",
        "greaterThanOrEqual",
        "lessThan",
        "lessThanOrEqual"
      ]
    };
    localStorage.setItem("url", properties.url);
  }
  
  CheckListView=(AppointmentID,UserId,first_name,last_name)=>{
    localStorage.setItem("first_name",first_name);
    localStorage.setItem("last_name",last_name);
    localStorage.setItem("user_id",UserId);
      localStorage.setItem("appointment_id",AppointmentID);
        this.NavigateNextPage(); 
      
 };
 NavigateNextPage=()=>{
    window.location = "#/Prosk/ShowAllUpcomingAppointmentListView";  
 };


  
   handleClick = () => {
     this.setState({
       open:!this.state.open
     })
  };

   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open:!this.state.open
    })
  };
  handleClick1 = () => {
    this.setState({
      open1:!this.state.open1
    })
 };

  handleClose1 = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }
   this.setState({
     open1:!this.state.open1
   })
 };
  AppointmentAlreadyExist() {
    this.handleClick();

}
SendReminder (AppointmentID) {
  let url=localStorage.getItem("url") +"/Prosk/AppointmentSendReminderEmailManual?appointment_id="+AppointmentID;
  fetch(url, {
    method: "GET",
    //body: data
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(
      result => {
        alert("Reminder email Sent");
        this.handleNextClick();
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        alert(error);
      }
    );
};
  handleNextClick = index => {
    let url=localStorage.getItem("url") +"/alpha/MobileGetAgendaList";
    fetch(url, {
      method: "GET",
      //body: data
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        result => {
          console.log(result);
          console.log(url);
          var rows=[];
          const Formitteddatofbirth = moment(this.state.date_of_birth).format(
            "MM/DD/YYYY"
          );
          var moment1 = require('moment-timezone');
          console.log(result["upcoming_appointments"].length);
            for (var i = 0; i < result["upcoming_appointments"].length; i++) {
              const first_name=result.upcoming_appointments[i]["first_name"];
              const last_name=result.upcoming_appointments[i]["last_name"];
              const start_time=result.upcoming_appointments[i]["start_time"];
              const Appointment=result.upcoming_appointments[i]["appointment_id"];
              const UserId=result.upcoming_appointments[i]["user_id"];
              const patientNumber=i;
              const Action=<Button   size="small"  style={{backgroundColor:"rgba(224, 224, 224, 1)",color:"rgba(97, 97, 97, 0.9)"}}>View</Button>;
              const Reminder=<Button     size="small"  style={{backgroundColor:"rgba(224, 224, 224, 1)",color:"rgba(97, 97, 97, 0.9)"}}>Send</Button>;
              
              if(result.upcoming_appointments[i]["is_reminder_send"]=="0" ){
                 Reminder=<Button   variant="contained" size="small" disableElevation color="primary" onClick={(event) =>this.SendReminder(Appointment)}>Send</Button>;
             
              }
              if(result.upcoming_appointments[i]["status"]=="Partially Completed" || result.upcoming_appointments[i]["status"]=="Completed"){
                Action=<Button variant="contained" size="small" disableElevation color="primary" onClick={(event) =>this.CheckListView(Appointment,UserId,first_name,last_name)}>View</Button>;
              }

              
              
              rows.push({
                Aid:result.upcoming_appointments[i]["appointment_id"],
                fname: result.upcoming_appointments[i]["first_name"],
                lname: result.upcoming_appointments[i]["last_name"],
                status: result.upcoming_appointments[i]["status"],
                doa: moment(result.upcoming_appointments[i]["appointment_date"]).format("MM/DD/YYYY"),
                starttime: result.upcoming_appointments[i]["start_time"],
                Action: Action,
              // reminder:Reminder
              });
            }

            
            this.setState( ({
              rows: rows
            }));
       
        },
        error => {
          alert(error);
        }
      );
  };

  componentDidMount() {
    // alert('test');
     this.handleNextClick("test");
  }

  render() {
    const {
      rows,
      columns,
    } = this.state;
    const showFilter = this.props.showFilter;
    

    return (
      <Paper elevation={2}>
          <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={this.state.open}
    autoHideDuration={4000}
    onClose={this.handleClose}
  ><Alert onClose={this.handleClose} severity="info">
  Email Already Sent!
</Alert>
</Snackbar>

<Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={this.state.open1}
    autoHideDuration={4000}
    onClose={this.handleClose1}
  ><Alert onClose={this.handleClose1} severity="success">
  Email Sent to {this.state.first_name} {this.state.last_name}
</Alert>
</Snackbar>
        <Grid rows={rows} columns={columns}>
          <SortingState
          />
      
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <IntegratedSorting />
          {/* <IntegratedPaging /> */}
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <Table />

          <TableHeaderRow showSortingControls />
          {/* <PagingPanel /> */}
          {showFilter ? <TableFilterRow showFilterSelector /> : null}
        </Grid>
      </Paper>
    );
  }
}

export default UpcomingAppointmentsList;
