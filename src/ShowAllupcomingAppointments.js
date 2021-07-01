import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";

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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
import UpcomingAppointmentsList from "./UpcomingAppointmentsList";
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

function ShowAllupcomingAppointments() {
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
    let url=localStorage.getItem("url") +"/Prosk/SendEmailToPatients?email="+email;
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


  const rows = [
    createData('Haseeb', 'Liaqat', '221', '25/9/2020','08:30 am',<Button variant="outlined"   color="primary"  size="small" disableElevation >View</Button>),]
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
 <AppBar position="fixed">
          <Toolbar variant="dense">
            <div className={classes.grow}> </div>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
         Upcoming Appointments
            </Typography>
            <div className={classes.grow}> </div>
          </Toolbar>
        </AppBar>

      <div style={{ marginTop: "50px" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>
                <IconButton style={{ marginLeft: "-10px" }}>
                </IconButton>
                <IconButton style={{ marginLeft: "-10px" }}>
                </IconButton>
              </td>
              <td style={{ textAlign: "right", width: "30%" }}>
                <IconButton
                  style={{ marginLeft: "-10px" }}
                  onClick={handleTableFilter}
                  buttonRef={anchorE2}
                >
                  <FilterIcon fontSize="small" />
                </IconButton>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <UpcomingAppointmentsList
        showFilter={showTableFilter}
        style={{ marginTop: "-20px" }}
      />
      {renderMobileMenu}
      {renderFilters} 
    </div>
  );
  }
export default ShowAllupcomingAppointments;
