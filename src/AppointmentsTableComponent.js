import React, { useState } from "react";

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
  TableColumnResizing,
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
import { properties } from "./properties.js";
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

class AppointmentsTableComponent extends React.PureComponent {
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
        { name: "name", title: "Name",},
        { name: "email", title: "Email",},
        { name: "phone", title: "Phone", },
        { name: "dob", title: "DOB" },
        { name: "doa", title: "Date of Appointment" },
        { name: "starttime", title: "Start Time" },
        { name: "endtime", title: "End Time" },
      { name: "status", title: "Status" },
      { name: "communication_status", title: "Communication Status" },
      { name: "provider", title: "Provider"},
      { name: "visit_label", title: "Type" },
        { name: "Action", title: "Email" }
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
    localStorage.setItem("url", properties.url);
  }
  

  SendEmailToPatients (email,first_name,last_name,FormitteddateofappointmentTime,Formitteddateofappointment,phone_no,visit_reason_id,ProviderID,CarecloudAppointmentID) {
    // alert("relaoded");
    //let url="/WaveEdu/Institutions/F01LoadData";
    //let url="http://35.163.44.116:8080/Prosk/SendEmailToPatients?email="+email;
    //let url="https://proskcloud.com/Prosk/SendEmailToPatients?email="+email+"&first_name="+first_name+"&last_name="+last_name+"&time="+FormitteddateofappointmentTime+"&phone_no="+phone_no+"&date="+Formitteddateofappointment;
    let url=localStorage.getItem("url") +"/Prosk/SendEmailToPatients?email="+email+"&first_name="+first_name+"&last_name="+last_name+"&time="+FormitteddateofappointmentTime+"&phone_no="+phone_no+"&date="+Formitteddateofappointment+"&visit_reason_id="+visit_reason_id+"&provider_id="+ProviderID+"&carecloud_appointment_id="+CarecloudAppointmentID;
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
          this.handleNextClick("test");
          this.setState({
            first_name:first_name,
            last_name:last_name
          });
          this.handleClick1();
        //  alert("Email Sent to "+first_name+" "+last_name );
       
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          alert(error);
        }
      );
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
  MakeAppointment(first_name,middle_name,last_name,PhoneNo,email,gender_id,date_of_birth,start_time,patientNumber,AppointmentID,PatientID,ID,visit_reason_id,ProviderID,new_start_time) {

    console.log(first_name);
    console.log(middle_name);
    console.log(last_name);
    console.log(PhoneNo);
    console.log(email);
    console.log(gender_id);
    console.log(date_of_birth);
    console.log(start_time);
    console.log(patientNumber);
    console.log(ProviderID);
    if(PhoneNo==""){
      alert("Phone# is not available");
    }
    else{
      
      var moment1 = require('moment-timezone');
      const Formitteddateofappointment = moment(start_time).format("MM/DD/YYYY");
      
      const FormitteddateofappointmentTime=new_start_time;
     // const FormitteddateofappointmentTime = moment(start_time).format("h:mm a");
      const Formitteddatofbirth = moment(date_of_birth).format(
        "MM/DD/YYYY"
      );
      
      var formatedPhoneNo=PhoneNo;
      if(formatedPhoneNo!="31615685061" && formatedPhoneNo!="3240010087"  && formatedPhoneNo!="3064484050"){
        formatedPhoneNo="+1"+PhoneNo;
      }

      if(formatedPhoneNo=="3240010087" ){
        formatedPhoneNo="+92"+PhoneNo;
      }

      if(formatedPhoneNo=="3064484050" ){
        formatedPhoneNo="+92"+PhoneNo;
      }

      if(formatedPhoneNo=="31615685061" ){
        formatedPhoneNo="+"+PhoneNo;
      }
      if(middle_name==undefined){
        middle_name="";
      }
      let url =
      localStorage.getItem("url") +"/MobileSaveNewUserv2?first_name=" +
      first_name +
      "&middle_name=" +
      middle_name +
      "&phone="+formatedPhoneNo +
      //PhoneNo +
      "&email="+email +
      //email +
      "&gender=" +
      gender_id +
      "&date_of_birth="+Formitteddatofbirth+"&date_of_appointment=" +
      Formitteddateofappointment +
      "&start_time="+
      new_start_time +
      "&last_name=" +
      last_name +
      "&id="+ID+"&appointment_id="+
      AppointmentID +
      "&patient_id=" +
      PatientID+
      "&visit_reason_id="+
      visit_reason_id +
      "&provider_id="+ProviderID+
      "&phone_no="+formatedPhoneNo+
      "&date="+Formitteddateofappointment+
      "&carecloud_appointment_id="+AppointmentID;
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
           // this.SendEmailToPatients (email,first_name,last_name,FormitteddateofappointmentTime,Formitteddateofappointment,PhoneNo,visit_reason_id,ProviderID,AppointmentID);
          
           alert(result["msg"]);
           this.handleNextClick("test");
          
          } else {
            alert(result["msg"]);
          }
        })
        .catch((error) => alert("An error occured: " + error));
    }
    
  }
  handleNextClick = index => {
    // alert("relaoded");
    //let url="/WaveEdu/Institutions/F01LoadData";
    //let url="https://proskcloud.com/alpha/GetAppointments";
    //let url="https://proskcloud.com/alpha/GetAppointments";
    let url=localStorage.getItem("url") +"/alpha/GetAppointments";
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
          var moment1 = require('moment-timezone');
            for (var i = 0; i < result["appointments"].length; i++) {
              
              var PhoneNo=result.appointments[i]["primary_phone_number"];
              if(PhoneNo==null){
                PhoneNo="";
              }else{
                PhoneNo="+1"+PhoneNo
              }
              
              const visit_reason_id=result.appointments[i]["visit_reason_id"];
              const first_name=result.appointments[i]["first_name"];
              const middle_name= result.appointments[i]["middle_name"];
              const last_name=result.appointments[i]["last_name"];
              const phone=result.appointments[i]["primary_phone_number"];
              const Email=result.appointments[i]["email"];
              const gender_id=result.appointments[i]["gender_id"];
              const date_of_birth=result.appointments[i]["date_of_birth"];
              const start_time=result.appointments[i]["start_time"];
              const new_start_time=result.appointments[i]["new_start_time"];
              const AppointmentID=result.appointments[i]["appointment_id"];
              const PatientID=result.appointments[i]["patient_id"];
              const ID=result.appointments[i]["id"];
              const ProviderID=result.appointments[i]["provider_id"];
              const patientNumber=i;
              const Action="";
              const ComunicationStatusAction=result.appointments[i]["communication_status"];
              const ViewProviderStatusAction=result.appointments[i]["provider_label"]+" ("+result.appointments[i]["visit_reson_label"]+")";
              const ViewStatus="";
              const ProviderStatus="";
             
               if(result.appointments[i]["status"]=="Email Sent"){
                  Action=<Button variant="contained" onClick={(event) =>this.AppointmentAlreadyExist()} size="small" disableElevation color="primary">Send</Button>
                }else{
                  Action=<Button variant="outlined" onClick={(event) =>this.MakeAppointment( first_name,middle_name,last_name,`${phone}`,Email,gender_id,date_of_birth,start_time,patientNumber,AppointmentID,PatientID,ID,visit_reason_id,ProviderID,new_start_time)} size="small" disableElevation color="primary">Send</Button>
                }
                ViewStatus=<p style={{fontSize:"13px",whiteSpace:"break-spaces",overflow:"break-word",width:"76px"}}>{ComunicationStatusAction}</p>
                ProviderStatus=<p style={{fontSize:"13px",whiteSpace:"break-spaces",overflow:"break-word",width:"76px"}}>{ViewProviderStatusAction}</p>

              rows.push({
                name: result.appointments[i]["first_name"]+"  "+ result.appointments[i]["last_name"],
                email: result.appointments[i]["email"],
                phone: PhoneNo,
                status: result.appointments[i]["status2"],
                communication_status: ViewStatus,
                dob: moment(result.appointments[i]["date_of_birth"]).format("MM/DD/YYYY"),
                doa: moment(result.appointments[i]["start_time"]).format("MM/DD/YYYY"),
                starttime: result.appointments[i]["new_start_time"],
                endtime:  result.appointments[i]["new_end_time"],
                visit_label:  result.appointments[i]["visit_label"],
                provider:ProviderStatus,
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
      
          {/* <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          /> */}
          <IntegratedSorting />
        {/* <IntegratedPaging /> */}
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <Table />
          {/* <TableColumnResizing
          columnWidths={this.state.columnWidths}
        /> */}
       
       <TableHeaderRow showSortingControls />
        {/* <PagingPanel />  */}
          {showFilter ? <TableFilterRow showFilterSelector /> : null}
        </Grid>
      </Paper>
    );
  }
}

export default AppointmentsTableComponent;
