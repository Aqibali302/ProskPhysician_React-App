import React, { useState, useCallback } from "react";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/styles";
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PrimaryAppBar from "./PrimaryAppBar";
import BottomBar from "./BottomBar";
import PropTypes from "prop-types";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import PrintIcon from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import PDFIcon from "mdi-material-ui/FilePdf";
import FilterIcon from "mdi-material-ui/FilterOutline";
import ExcelIcon from "mdi-material-ui/GoogleSpreadsheet";
import SearchIcon from "mdi-material-ui/FileSearchOutline";
import SearchBox from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useDropzone } from "react-dropzone";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LabelIcon from "@material-ui/icons/Label";
import EditIcon from "@material-ui/icons/Edit";
import Downshift from "downshift";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { properties } from "./properties";
import { dateFormat } from "highcharts";
let suggestions = [];

let course_code_data = [];
let course_account_data = [];
const useStyles = (theme) => ({
  downShift: {
    paddingTop: "18px !important",
  },
  textFieldCard: {
    paddingTop: "0px !important",
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  asdf: {
    margin: 1000,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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

  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  container: {
    marginTop: "100px",
  },
});

function DenseAppBar(props) {
  const { classes } = props;
  const handleMenu = (event) => {
    window.location = "#/";
  };
  return (
    <div className={classes.root}>

    </div>
  );
}
class F01Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDateOfBirth: "",
      date_of_birth: new Date('1975-01-01'),
      date_of_Appointment:new Date(),
      isValid: true,
      gender: false,
      gender_val: 1,
      gender_dropdown: [
        { Id: "1", Label: "Male" },
        { Id: "2", Label: "Female" },
      ],
      provider: false,
      provider_val: 19456,
      provider_dropdown: [
        { Id: "19456", Label: "Amer Mirza" },
      ],
      visit: false,
      visit_val: 62271,
      visit_label: "",
      visit_dropdown: [
        { Id: "62271", Label: "NEW PT W/ INTERP" },
        { Id: "61857", Label: "XR - CLOSING W/ INTERP" },
        { Id: "84536", Label: "X-RAY REVIEW/READING" },
        { Id: "61857", Label: "CLOSING EXAM" },
      ],

      //info
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      start_time:new Date(),
      end_time:new Date(),
    };

    localStorage.setItem("url", properties.url);
  }

  submitForm(event) {
    document.getElementById("submit-button").click();
  }
  handleMenu = (event) => {
    window.location = "#/Prosk/home/";
  };
  handleSubmit(event, state) {
    event.preventDefault();
    const Formitteddatofbirth = moment(this.state.date_of_birth).format(
      "YYYY-MM-DD"
    );
    const FormitteddatofAppointment = moment(this.state.date_of_Appointment).format(
        "YYYY-MM-DD"
      );
      const FormittedStartTime = moment(this.state.start_time).format(
        "hh:mm:ss"
      );
      const FormittedEndTime = moment(this.state.end_time).format(
        "hh:mm:ss"
      );

      console.log(FormittedStartTime);
      console.log(FormittedEndTime);
    let url =localStorage.getItem("url") +"/alpha/CareCloudNewAppointmentExecute?first_name=" +this.state.first_name +
    "&last_name=" +this.state.last_name +"&phone=" +this.state.phone +"&email=" +this.state.email +"&gender_id=" +this.state.gender_val +"&provider_id=" +this.state.provider_val + "&date_of_birth=" +
      Formitteddatofbirth + "&date_of_appointment=" +FormitteddatofAppointment+"T"+FormittedStartTime+"-08:00"+ "&start_time="+FormitteddatofAppointment+"T"+FormittedEndTime+"-08:00"+"&end_time="+FormitteddatofAppointment+"T"+FormittedEndTime+"-08:00"+"&visit_reason_id="+this.state.visit_val;
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
          console.log(result);
        if (result["success"] == "1") {
            alert("Patient Appointment Created");
          window.location.reload();
        } else {
          alert(result["error_message"]);
        }
      })
      .catch((error) => alert("An error occured: " + error));
  }
  first_name = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  };

  last_name = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  };
  phone = (event) => {
    this.setState({ phone: event.target.value });
  };
  email = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  gender = (event) => {
    this.setState({
      gender_val: event.target.value,
    });
  };
provider = (event) => {
    this.setState({
      provider_val: event.target.value,
    });
  };
  visit = (event) => {
    this.setState({
      visit_val: event.target.value,
    });
  };
  date_of_birth = (event) => {
    this.setState({
      date_of_birth: event.target.value,
    });
  };

  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  StopEnter(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  handleDateOfBirthChangeFrom = (event) => {
    this.setState({ date_of_birth: event });
  }; 
   handleDateOfAppointmentChangeFrom = (event) => {
    this.setState({ date_of_Appointment: event });
  };

  handleStartTime = (event) => {
    this.setState({ start_time: event });
  };
  handleEndTime = (event) => {
    this.setState({ end_time: event });
  };

  renderGenderOptions() {
    return this.state.gender_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }

  renderProviderOptions() {
    return this.state.provider_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderVisitResonOptions() {
    return this.state.visit_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form
          onKeyPress={this.StopEnter}
          onSubmit={(event) => this.handleSubmit(event, this.state)}
          autoComplete="off"
        >
     <AppBar position="fixed">
        <Toolbar variant="dense">
      
          <div className={classes.grow}/>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center"}}
          >
            Create New Appointment
          </Typography>
          <div className={classes.grow}/>
        </Toolbar>
      </AppBar>
          <div
            style={{
              marginTop: "60px",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="submit-button"
                className={classes.button}
                style={{ display: "none" }}
              >
                submit
              </Button>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="FirstName"
                      label="First Name"
                      style={{ width: "90%", height: "10%" }}
                      className={classes.textFieldCard}
                      onChange={this.first_name}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.first_name}
                      //helperText={this.state.remarks_error}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="LastName"
                      label="Last Name"
                      className={classes.textFieldCard}
                      onChange={this.last_name}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.last_name}
                      //helperText={this.state.remarks_error}
                      required
                      style={{ width: "90%", height: "10%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="phoneNumber"
                      label="Phone#"
                      className={classes.textFieldCard}
                      onChange={this.phone}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.phone}
                      //helperText={this.state.remarks_error}
                      required
                      style={{ width: "90%", height: "10%" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="EMAIL"
                      label="Email"
                      className={classes.textFieldCard}
                      onChange={this.email}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.email}
                      //helperText={this.state.remarks_error}
                      required
                      style={{ width: "90%", marginTop: "10%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%", marginTop: "10%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="gender">Gender</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.gender_val}
                        onChange={this.gender}
                        autoWidth
                        required
                        inputProps={{
                          name: "gender",
                          id: "gender",
                        }}
                      >
                        {this.renderGenderOptions()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%", marginTop: "10%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="gender">Visit Reason</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.visit_val}
                        onChange={this.visit}
                        error={this.state.visit_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "visit_reason",
                          id: "visit_reason",
                        }}
                      >
                        {this.renderVisitResonOptions()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        keyboard
                          views={["year", "month", "day"]}
                          openTo={"year"}
                        format={"MM/dd/yyyy"}
                        label="Date Of Birth"
                        name="DateOfBirth"
                        id="DateOfBirth"
                        mask={(value) =>
                          value
                            ? [
                                /\d/,
                                /\d/,
                                "/",
                                /\d/,
                                /\d/,
                                "/",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                              ]
                            : []
                        }
                        disableOpenOnEnter
                        animateYearScrolling={false}
                        style={{ width: "90%", marginTop: "10%" }}
                        onChange={this.handleDateOfBirthChangeFrom}
                        value={this.state.date_of_birth}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        keyboard
                        format={"MM/dd/yyyy"}
                        label="Date Of Appointment"
                        name="DateOfAppointment"
                        id="DateOfAppointment"
                        mask={(value) =>
                          value
                            ? [
                                /\d/,
                                /\d/,
                                "/",
                                /\d/,
                                /\d/,
                                "/",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                              ]
                            : []
                        }
                        disableOpenOnEnter
                        animateYearScrolling={false}
                        style={{ width: "90%", marginTop: "10%" }}
                        onChange={this.handleDateOfAppointmentChangeFrom}
                        value={this.state.date_of_Appointment}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                <Grid item xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker
                      label="Start Time"
                      name="StartTime"
                      id="Start Time"
                    onChange={this.handleStartTime}
                    value={this.state.start_time}
                    style={{ width: "90%", marginTop: "10%" }}
                    renderInput={(params) => (
                        <TextField margin="normal" {...params} variant="standard" />
                      )}
                />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker
                    label="End Time"
                    name="EndTime"
                    id="EndTime"
                    onChange={this.handleEndTime}
                    value={this.state.end_time}
                    style={{ width: "90%", marginTop: "10%" }}
                    renderInput={(params) => (
                        <TextField margin="normal" {...params} variant="standard" />
                      )}
                />
                  </MuiPickersUtilsProvider>
                </Grid>
        <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%", marginTop: "10%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="genProviderder">Provider</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.provider_val}
                        onChange={this.provider}
                        error={this.state.provider_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "provider",
                          id: "provider",
                        }}
                      >
                        {this.renderProviderOptions()}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>
          <AppBar
            position="fixed"
            style={{ top: "auto", bottom: 0 }}
            color="default"
          >
            <Toolbar variant="dense">
              <div className={classes.grow} />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Toolbar>
          </AppBar>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(F01Form);
