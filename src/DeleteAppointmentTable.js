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
import DeleteAppointmentTableList from "./DeleteAppointmentTableList";
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

function DeleteAppointmentTable() {
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
  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University of Arts and Sciences"} />

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
              <td style={{ textAlign: "center", width: "40%" }}>
                <Typography variant="subtitle1" color="primary">
                 Appointments
                </Typography>
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
      <DeleteAppointmentTableList
        showFilter={showTableFilter}
        style={{ marginTop: "-20px" }}
      />
    </div>
  );
  }
export default DeleteAppointmentTable;
