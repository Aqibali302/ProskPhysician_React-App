import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import { properties } from "./properties.js";
import {
  Grid,
  IconButton,
  Typography,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Button
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PDFIcon from "mdi-material-ui/FilePdf";
import FilterIcon from "mdi-material-ui/FilterOutline";
import ExcelIcon from "mdi-material-ui/GoogleSpreadsheet";
import SearchIcon from "mdi-material-ui/FileSearchOutline";
import SearchBoxIcon from "@material-ui/icons/Search";
import PrimaryAppBar from "./PrimaryAppBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'

import MoreIcon from "@material-ui/icons/MoreVert";

import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsTableComponent from "./AppointmentsTableComponent";
import * as moment from "moment";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
  },

  sectionDesktop: {
    display: "none",
  },
  sectionMobile: {
    display: "flex",
  },
  bigAvatar: {
    margin: 10
  },
  badgeMargin: {
  },
  inline: {
    display: "inline"
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px"
  }
}));

function Appointments() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [showFilter, setFilter] = React.useState(false);
  const [showTableFilter, setTableFilter] = React.useState(false);
  const anchorEl = React.useRef(null);
  const anchorE2 = React.useRef(null);
  function handleToggle() {
    setOpen(!open);
  }

  function handleTableFilter() {
    setTableFilter(!showTableFilter);
  }
  function handleFilter() {
    setFilter(!showFilter);
  }
  function handleClose(event) {
    if (anchorEl.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }
  function createData(name, email, phone, dob, appointment,starttime,endtime,Emails) {
    return { name, email, phone, dob, appointment,starttime,endtime,Emails};
  }
  
  function SendEmailToPatients (email,first_name,last_name) {
    // alert("relaoded");
    //let url="/WaveEdu/Institutions/F01LoadData";
    //let url="http://35.163.44.116:8080/Prosk/SendEmailToPatients?email="+email;
    let url= localStorage.getItem("url") +"/Prosk/SendEmailToPatients?email="+email;
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
  
  function MakeAppointment(first_name,middle_name,last_name,PhoneNo,email,date_of_birth,start_time,patientNumber) {
    console.log(first_name);
    console.log(middle_name);
    console.log(last_name);
    console.log(PhoneNo);
    console.log(email);
    console.log(date_of_birth);
    console.log(start_time);
    console.log(patientNumber);
    if(PhoneNo==""){
      alert("Phone# is not available");
    }
    else{
      const Formitteddateofappointment = moment("11/25/2020").format("MM/DD/YYYY");
      console.log(Formitteddateofappointment)
      const FormitteddateofappointmentTime = moment("11/25/2020 08:30 AM").format("hh:mm a");
      console.log(FormitteddateofappointmentTime)
      const Formitteddatofbirth = moment("11/25/1975").format(
        "MM/DD/YYYY"
      );
      let url ="";
      if(patientNumber==0){//HAYLEY LARSEN ALTSTETTER	
        email="haseeb.liaqat@gmail.com";
        first_name="Haseeb";
        last_name="Liaqat";
         url =
        "https://proskcloud.com/MobileSaveNewUserv2?first_name=" +
        first_name +
        "&middle_name=" +
        middle_name +
        "&phone=+923240010087" +
        //PhoneNo +
        "&email=haseeb.liaqat@gmail.com" +
        //email +
        "&gender=1&date_of_birth=1/1/2001&date_of_appointment=" +
        Formitteddateofappointment +
        "&start_time="+
        FormitteddateofappointmentTime +
        "&last_name=" +
        last_name;
      }
      else if(patientNumber==1){//JENN MCPOLAND
        email="angela@summitdocs.com";
        first_name="Angela";
        last_name="Toedtemeier";
         url =
        "https://proskcloud.com/MobileSaveNewUserv2?first_name=" +
        first_name +
        "&middle_name=" +
        middle_name +
        "&phone=+15035488427" +
        //PhoneNo +
        "&email=angela@summitdocs.com" +
        //email +
        "&gender=2&date_of_birth=1/1/2001&date_of_appointment=" +
        Formitteddateofappointment +
        "&start_time="+
        FormitteddateofappointmentTime +
        "&last_name=" +
        last_name;
      }else if(patientNumber==2){//JENN MCPOLAND
        email="angela@summitdocs.com";
        first_name="Angela";
        last_name="Toedtemeier";
         url =
        "https://proskcloud.com/MobileSaveNewUserv2?first_name=" +
        first_name +
        "&middle_name=" +
        middle_name +
        "&phone=+15035488427" +
        //PhoneNo +
        "&email=angela@summitdocs.com" +
        //email +
        "&gender=2&date_of_birth=1/1/2001&date_of_appointment=" +
        Formitteddateofappointment +
        "&start_time="+
        FormitteddateofappointmentTime +
        "&last_name=" +
        last_name;
      }else if(patientNumber==3){//JENN MCPOLAND
        email="mandy@summitdocs.com";
        first_name="Mandy";
        last_name="Sitz";
         url =
        "https://proskcloud.com/MobileSaveNewUserv2?first_name=" +
        first_name +
        "&middle_name=" +
        middle_name +
        "&phone=+16304500178" +
        //PhoneNo +
        "&email=mandy@summitdocs.com" +
        //email +
        "&gender=2&date_of_birth=1/1/2001&date_of_appointment=" +
        Formitteddateofappointment +
        "&start_time="+
        FormitteddateofappointmentTime +
        "&last_name=" +
        last_name;
      }else if(patientNumber==4){//JENN MCPOLAND
        email="cristal@summitdocs.com";
        first_name="Cristal";
        last_name="summit";
         url =
        "https://proskcloud.com/MobileSaveNewUserv2?first_name=" +
        first_name +
        "&middle_name=" +
        middle_name +
        "&phone=+15034880365" +
        //PhoneNo +
        "&email=cristal@summitdocs.com" +
        //email +
        "&gender=2&date_of_birth=1/1/2001&date_of_appointment=" +
        Formitteddateofappointment +
        "&start_time="+
        FormitteddateofappointmentTime +
        "&last_name=" +
        last_name;
      }else if(patientNumber==5){//JENN MCPOLAND
        email="Karen@potentiaconcepts.com";
        first_name="Karen";
        last_name="Bridgett";
         url =
        "https://proskcloud.com/MobileSaveNewUserv2?first_name=" +
        first_name +
        "&middle_name=" +
        middle_name +
        "&phone=+31615685061" +
        //PhoneNo +
        "&email=Karen@potentiaconcepts.com" +
        //email +
        "&gender=2&date_of_birth=1/1/2001&date_of_appointment=" +
        Formitteddateofappointment +
        "&start_time="+
        FormitteddateofappointmentTime +
        "&last_name=" +
        last_name;
      }
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
           SendEmailToPatients (email,first_name,last_name);
          } else {
            alert('show'+result["error_message"]);
          }
        })
        .catch((error) => alert("An error occured: " + error));
    }
  }
  
  const rows = [
    createData('Haseeb Liaqat', 'haseeb.liaqat@gmail.com', '+9240010087', '1/1/2001', '25/9/2020','08:30 am','12:10 pm',<Button variant="outlined"   color="primary" onClick={(event) =>MakeAppointment('Haseeb ','','Liaqat','+923240010087','haseeb.liaqat@gmail.com','01/01/2001','8:30 AM','0')} size="small" disableElevation >Send</Button>),
    createData('Zhavonda Buganan', 'zhavonda@summitdocs.com', '+15034735443', '1/1/2001', '25/9/2020','12:10 am','1:20 pm',<Button variant="outlined"   color="primary" onClick={(event) =>MakeAppointment('Zhavonda ','','Buganan','+15034735443','zhavonda@summitdocs.com','01/01/2001','8:30 AM','1')} size="small" disableElevation >Send</Button>),
    createData('Angela Toedtemeier', 'angela@summitdocs.com', '+15035488427', '1/1/2001', '25/9/2020','1:20 am','2:20 pm',<Button variant="outlined"   color="primary" onClick={(event) =>MakeAppointment('Angela  ','','Toedtemeier','+15035488427','angela@summitdocs.com','01/01/2001','8:30 AM','2')} size="small" disableElevation>Send</Button>), 
    createData('Mandy Sitz', 'mandy@summitdocs.com', '+16304500178', '1/1/2001', '25/9/2020','3:10 am','4:40 pm',<Button variant="outlined"   color="primary" onClick={(event) =>MakeAppointment('Many  ','','Sitz','+16304500178','mandy@summitdocs.com','01/01/2001','8:30 AM','3')} size="small" disableElevation>Send</Button>),
    createData('Cristal Summit', 'Cristal@summitdocs.com', '+15034880365', '31/1/1995', '28/09/2020','2:10 am','3:40 pm',<Button variant="outlined"   color="primary" onClick={(event) =>MakeAppointment('Cristal  ','','Summit','+15034880365','cristal@summitdocs.com','01/01/2001','8:30 AM','4')} size="small" disableElevation>Send</Button>), 
    createData('Karen Bridgett', 'Karen@potentiaconcepts.com', '+31615685061', '1/1/2001', '28/11/2020','3:10 am','5:40 pm',<Button variant="outlined"   color="primary" onClick={(event) =>MakeAppointment('Karen  ','','Bridgett','+31615685061','Karen@potentiaconcepts.com','01/01/2001','8:30 AM','5')} size="small" disableElevation>Send</Button>), ];
    const renderFilters = (
    <Popper
      open={showFilter}
      anchorEl={anchorE2.current}
      transition
      disablePortal
      style={{ width: "70%" }}
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} id="menu-list-grow1">
          <div>
            <Paper elevation={2}
              style={{
                paddingTop: "1%",
                paddingBottom: "1%",
                paddingLeft: "1%",
                paddingRight: "1%"
              }}
            >
              <Grid xs={12} item={true}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "33%" }}>&nbsp;</td>
                      <td style={{ width: "33%", textAlign: "center" }}>
                        <Typography inline={true} variant="subtitle1">
                          Filters
                        </Typography>
                      </td>
                      <td style={{ width: "33%", textAlign: "right" }}>
                        <IconButton onClick={handleFilter}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>

              <AppointmentsFilters />
            </Paper>
          </div>
        </Grow>
      )}
    </Popper>
  );
  const renderMobileMenu = (
    <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper elevation={2}>
            <ClickAwayListener onClickAway={handleClose}>
              <List>
                <ListItem button onClick={handleClose}>
                  <ListItemIcon>
                    <PDFIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography varian="caption">PDF</Typography>}
                  />
                </ListItem>

                <ListItem button onClick={handleClose}>
                  <ListItemIcon>
                    <ExcelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography varian="caption">Excel</Typography>}
                  />
                </ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University of Arts and Sciences"} />

      <div style={{ marginTop: "50px" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>
                {/* <IconButton onClick={event => window.history.back()}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton> */}

                <IconButton style={{ marginLeft: "-10px" }}>
                  {/* <PDFIcon fontSize="small" /> */}
                </IconButton>
                <IconButton style={{ marginLeft: "-10px" }}>
                  {/* <ExcelIcon fontSize="small" /> */}
                </IconButton>
              </td>
              <td style={{ textAlign: "center", width: "40%" }}>
                <Typography variant="subtitle1" color="primary">
                 Appointments
                </Typography>
              </td>
              <td style={{ textAlign: "right", width: "30%" }}>
                {/* <IconButton onClick={handleFilter} buttonRef={anchorE2}>
                  <FilterIcon fontSize="small" />
                </IconButton> */}
                <IconButton
                  style={{ marginLeft: "-10px" }}
                  onClick={handleTableFilter}
                  buttonRef={anchorE2}
                >
                  <FilterIcon fontSize="small" />
                </IconButton>
                {/* <IconButton
                  buttonRef={anchorEl}
                  aria-owns={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  style={{ display: "none" }}
                >
                  <MoreIcon fontSize="small" /> 
                </IconButton>*/}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AppointmentsTableComponent
        showFilter={showTableFilter}
        style={{ marginTop: "-20px",}}
      />
    </div>
  );
  }
export default Appointments;
