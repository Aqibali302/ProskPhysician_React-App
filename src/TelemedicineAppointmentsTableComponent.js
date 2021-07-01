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

import * as moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = {
  numericInput: {
    textAlign: "right",
    width: "100%"
  }
};


class TelemedicineAppointmentsTableComponent extends React.PureComponent {
  constructor(props) {
    super(props);

   

    // localStorage.getItem("url") +
    //   "/MobileSaveNewUserv2?first_name=" +
    //   this.state.first_name +
    //   "&middle_name=" +
    //   this.state.middle_name +
    //   "&phone=" +
    //   this.state.phone +
    //   "&email=" +
    //   this.state.email +
    //   "&gender=" +
    //   this.state.gender_val +
    //   "&date_of_birth=" +
    //   Formitteddatofbirth +
    //   "&date_of_appointment=" +
    //   Formitteddateofappointment +
    //   "&start_time=12:00 AM&phy_name=" +
    //   this.state.phy_name +
    //   "&phy_phone_no=" +
    //   this.state.phy_phone_no +
    //   "&phy_degree=" +
    //   this.state.phy_degree +
    //   "&last_name=" +
    //   this.state.last_name;
    this.state = {
      first_name:"",
      middle_name:"",
      last_name:"",
      phone:"",
      email:"",
      gender_val:"",
      columns: [
        { name: "appointmentID", title: "Appointment ID" },
        { name: "name", title: "Name" },
        { name: "doa", title: "Date of Appointment" },
        { name: "starttime", title: "Start Time" },
        { name: "action", title: " " }
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
  

  SendEmailToPatients (email,first_name,last_name) {
    // alert("relaoded");
    //let url="/WaveEdu/Institutions/F01LoadData";
    //let url="https://patient.proskcloud.com/Prosk/SendEmailToPatients?email="+email;
    let url=localStorage.getItem("url") +"/SendEmailToPatients?email=haseeb.liaqat@gmail.com";
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
          alert("Email Sent to "+first_name+" "+last_name );
       
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          alert(error);
        }
      );
  };

  StartVideoCall(appointment_id) {

    console.log(appointment_id);
    localStorage.setItem("appointment_id",appointment_id)
    //window.location="#/MeetingRoom/";
    window.open(localStorage.getItem("url") +"/Prosk/#/MeetingRoom/");
    
  }
  handleNextClick = index => {
    // alert("relaoded");
    //let url="/WaveEdu/Institutions/F01LoadData";
    let url=localStorage.getItem("url") +"/MobileGetAgendaList";
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
            for (var i = 0; i < result.upcoming_appointments.length; i++) {
              
            

              const first_name=result.upcoming_appointments[i]["first_name"];
              const last_name= result.upcoming_appointments[i]["last_name"];
              const appointmentID=result.upcoming_appointments[i]["appointment_id"];
              const PatientID=result.upcoming_appointments[i]["user_id"];
              const mrn=result.upcoming_appointments[i]["patient_mrn"];
              //console.log(PhoneNo);

              rows.push({
                name: result.upcoming_appointments[i]["first_name"]+"  "+ result.upcoming_appointments[i]["last_name"],
                appointmentID: result.upcoming_appointments[i]["appointment_id"],
               mrn: result.upcoming_appointments[i]["patient_mrn"],
                doa: result.upcoming_appointments[i]["appointment_date"],
                starttime: result.upcoming_appointments[i]["start_time"],
                action: <Button variant="outlined" onClick={(event) =>this.StartVideoCall(appointmentID)} size="small" disableElevation
                  color="primary"
                >
                  Start Session
                </Button>
              });
            }

            
            this.setState( ({
              rows: rows
            }));
       
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
        <Grid rows={rows} columns={columns}>
          <SortingState
          //  defaultSorting={[{ columnName: "doa", direction: "asc" }]}
          />
      
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <IntegratedSorting />
          <IntegratedPaging />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <Table />

          <TableHeaderRow showSortingControls />
          <PagingPanel />
          {showFilter ? <TableFilterRow showFilterSelector /> : null}
        </Grid>
      </Paper>
    );
  }
}

export default TelemedicineAppointmentsTableComponent;
