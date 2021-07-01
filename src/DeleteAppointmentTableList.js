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

class DeleteAppointmentTableList extends React.PureComponent {
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
        { name: "name", title: "Name" },
        { name: "email", title: "Email" },
        { name: "phone", title: "Phone" },
        { name: "dob", title: "DOB" },
        { name: "doa", title: "Date of Appointment" },
        { name: "starttime", title: "Start Time" },
        { name: "endtime", title: "End Time" },
      { name: "provider", title: "Provider" },
      { name: "visit_label", title: "Type" },
        { name: "Action", title: "Delete" }
      ],

      rows: [],
      columnData: [{name: "name", value: 'ZUku'}],
      currencyFilterOperations: [
        "equal",
        "notEqual",
        "greaterThan",
        "greaterThanOrEqual",
        "lessThan",
        "lessThanOrEqual"
      ]
    };
  }
  
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
  MakeAppointment(AppointmentID,UserId) {

    console.log(AppointmentID);
    console.log(UserId);
      let url =
      localStorage.getItem("url") +"/AppointmentDeleteExecute?live_appointment_id="+AppointmentID+"&live_user_id="+UserId;
        console.log(url);
      fetch(url, {
        method: "POST",
        // body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((result) => {
          if (result["success"] == "1") {
              alert("Appointment Delete");
              window.location.reload();
          }
        })
        .catch((error) => alert("An error occured: " + error));
    
  }
  handleNextClick = index => {
    // alert("relaoded");
    //let url="/WaveEdu/Institutions/F01LoadData";
    //let url="https://proskcloud.com/alpha/GetAppointments";
    //let url="https://proskcloud.com/alpha/GetAppointments";
    let url=localStorage.getItem("url") +"/alpha/GetAllExistingAppointments";
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
          var rows=[];
          const Formitteddatofbirth = moment(this.state.date_of_birth).format(
            "MM/DD/YYYY"
          );
          var moment1 = require('moment-timezone');
            for (var i = 0; i < result["existing_appointments"].length; i++) {
              var PhoneNo=result.existing_appointments[i]["primary_phone_number"];
              if(PhoneNo==null){
                PhoneNo="";
              }else{
                PhoneNo="+1"+PhoneNo
              }
              const AppointmentID=result.existing_appointments[i]["appointment_id"];
              const UserId=result.existing_appointments[i]["patient_id"];
                const Action=<Button variant="outlined" onClick={(event) =>this.MakeAppointment(AppointmentID,UserId)} size="small" disableElevation color="primary">Delete</Button>
                
              rows.push({
                name: result.existing_appointments[i]["first_name"]+"  "+ result.existing_appointments[i]["last_name"],
                email: result.existing_appointments[i]["email"],
                phone: PhoneNo,
                dob: moment(result.existing_appointments[i]["date_of_birth"]).format("MM/DD/YYYY"),
                doa: moment(result.existing_appointments[i]["start_time"]).format("MM/DD/YYYY"),
                starttime: (moment1.tz(result.existing_appointments[i]["start_time"], 'America/Los_Angeles').format("h:mm a")),
                endtime:  (moment1.tz(result.existing_appointments[i]["end_time"], 'America/Los_Angeles').format("h:mm a")),
                visit_label:  result.existing_appointments[i]["visit_label"],
                provider:result.existing_appointments[i]["provider_label"],
                Action: Action
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
          //  defaultSorting={[{ columnName: "doa", direction: "asc" }]}
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

export default DeleteAppointmentTableList;
