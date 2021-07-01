import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import Medicine from "./images/thankyou.png";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { properties } from "./properties.js";
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
  Table,
  Button
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/Home";

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
class EmailTemplateDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        type_val: "1",
        Type_dropdown: [],
        EmailData:[],
        checkboxvalue:"",
        UpdatedBy:"1234",
        isFieldShow:false,
        PName:"<PatientName>"
    };
    localStorage.setItem("url", properties.url);
  }
  handleMenu = (event) => {
    window.location = "#/Prosk/home/";
  };
  check=(event)=>{
    this.setState({ isFieldShow: true });
    console.log(this.state.type_val)
    let url =localStorage.getItem("url") +"/alpha/GetAppointmentTypeEmailData?id="+this.state.type_val;
    console.log(url);
    fetch(url, {
      method: "POST",
      //  body: dataTomcat,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        this.setState({
          checkboxvalue:result["Get_EmailData_Types"][0]["label"].replaceAll("<linebreak><linebreak>",'\n\n').replaceAll("<linebreak>","\n").replaceAll('�','<RegisterTradeMark>'),
        });
        console.log(this.state.checkboxvalue)
      })
      .catch((error) => alert("An error occured: " + error));
  }
  
  EmailTypeId() {
    let url =localStorage.getItem("url") +"/alpha/GetAppointmentType";
    console.log(url);
    fetch(url, {
      method: "POST",
      //  body: dataTomcat,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        this.setState({
          Type_dropdown:result["Get_Appointments_Types"],
        });
        console.log(this.state.Type_dropdown)
      })
      .catch((error) => alert("An error occured: " + error));
  }
  componentDidMount() {

    this.EmailTypeId();
    this.setState({ isFieldShow: true });
    console.log(this.state.type_val)
    this.check();
  }
  renderTypeOptions() {
    return this.state.Type_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.id}>
          {dt.label}
        </MenuItem>
      );
    });
  }
  Update= (event) => {
    event.preventDefault();
    console.log(this.state.checkboxvalue.replace(/(?:\r\n|\r|\n)/g, '<linebreak>'));
    let url =localStorage.getItem("url") +"/alpha/EmailTypeDataUpdate?id=" +this.state.type_val +"&email_data=" +this.state.checkboxvalue.replace(/(?:\r\n|\r|\n)/g, '<linebreak>') +"&updated_by=" +this.state.UpdatedBy;
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
        console.log(result)
        if (result["success"] == "1") {
          alert("Email Template Updated");
          window.location.reload();
        } else {
          alert(result["error_message"]);
        }
      })
      .catch((error) => alert("An error occured: " + error));
  }
  handleChange = (event) => {
    this.setState({
        type_val: event.target.value
    },()=>{
      this.check();
    });
    console.log("aqib2");
    console.log(this.state.type_val);

}
TextAreaChange = (event) => {
  this.setState({
    checkboxvalue: event.target.value
  });
}
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form>
        <AppBar position="fixed">
          <Toolbar variant="dense">

            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
                Email Template
            </Typography>
            <div className={classes.grow} />
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
              <CardContent>
                <Grid container spacing={8}>
                <Grid item xs={12}>
                        <FormControl
                          style={{ width: "90%" }} className={classes.formControl}>
                          <InputLabel htmlFor="TypeID">Select Patient Type</InputLabel>
                          <Select
                            IconComponent="false"
                            style={{ width: "110%" }}
                            value={this.state.type_val}
                            onChange={this.handleChange}
                            autoWidth
                            required
                            inputProps={{
                              name: "TypeID",
                              id: "TypeID"
                            }}
                          >
                            {this.renderTypeOptions()} 
                          </Select>
                        </FormControl>
                      </Grid>
                </Grid>
                <div style={{width:"86rem"}}>
                {
                          this.state.isFieldShow?
                          
                          <Grid container spacing={4} >
                              <Grid item xs={12} sm={9} style={{marginBottom:"13px",marginLeft:"28px"}}>
                          <TextareaAutosize
                          aria-label="maximum height"
                          value={this.state.type_val==1?this.state.checkboxvalue:this.state.checkboxvalue}
                          onChange={this.TextAreaChange} 
                          rowsMin={3}
                          style={{width:"66rem",height:"29rem",fontSize:"13px"}}
/>
                          </Grid>
                              <Grid item xs={12} md={2}>
                                  <div style={{border:"Solid 1px teal",width:"10rem",marginLeft:"14px"}}>
                                  <Typography
                                color="inherit"
                                noWrap
                                style={{  textAlign: "center",fontSize:"15px",fontWeight:"bold",backgroundColor:"#009688",color:"white"}}
                                >
                                  Tags
                                </Typography>
                                {/* Info */}
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                       {"<PatientName>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                  {"<RegisterTradeMark>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                  {"<AppointmentDate>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                  {"<AppointmentTime>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                   {"<WebLink>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                  {"<Chrome>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                 {"<PlayStore>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                    {"<AppStore>"}
                                </Typography>
                                <Typography
                                color="inherit"
                                noWrap
                                style={{ textAlign: "left",padding:"5px",fontWeight:"bold" }}
                                >
                                    {"<PatientPhone>"}
                                </Typography>
                                  </div>
                              </Grid>
                          </Grid>
                        :<div></div>
                      }
                </div>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.Update}
                    style={{marginRight:"10px"}}
                    >Update
          </Button>
                </Toolbar>
              </AppBar>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(EmailTemplateDetail);
