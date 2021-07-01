import React, { useState, useEffect,Fragment } from "react";
import {
  Grid,
  Card,
  IconButton,
  CardHeader,
  Typography,
  CardContent,
  Avatar,
  Stepper,
  Step,
  Image,
  StepButton,
  CircularProgress,
  Divider,
  ListItem,
  ListItemText
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from "@material-ui/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@material-ui/core/InputBase';
import FormControl from "@material-ui/core/FormControl";

import { useDropzone } from "react-dropzone";

const useStyles = (theme) => ({
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
  bigAvatar: {
    margin: 10,
  },
  inline: {
    display: "inline",
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
});

const classes = makeStyles((theme) => ({
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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bigAvatar: {
    margin: 10,
  },

  inline: {
    display: "inline",
  },
  card: {
    marginLeft: "50%",
    marginRight: "50%",
    marginTop: "10px",
  },
}));
function getSteps() {
  return ["Front ID Card", "Back ID Card"];
}
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};


class MedicalHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment_id: localStorage.getItem("AppointmentID"),
      patient_id: localStorage.getItem("PID"),
      MedicalHistory:[],
      SurveyAnswers:[],
      Question:[],
      Answer:[],
      SurveyAnswer:[],
      fileLabel:[],
      ModuleData:[],
      filter: "",

    };
  }
  MobileGetUserConsentData() {
    let url =localStorage.getItem("url") +"/MobileGetQuestionMarks?appointment_id=" +this.state.appointment_id+"&type_id="+this.state.patient_id;
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
          MedicalHistory:result["medical_history"],
        });

console.log(this.state.MedicalHistory)
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  Consent(filename){
      console.log(filename)
      localStorage.setItem("file_name", filename);
        window.location = "#/Prosk/Consentpdf";
  }
  handleMenu = (event) => {
    window.location = "#/Prosk/ShowAllUpcomingAppointmentListView";
  };
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };



  componentDidMount() {
      this.MobileGetUserConsentData();

  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton color="inherit" onClick={this.handleMenu}>
              <ArrowBackIcon /> <Typography
                color="inherit"
                noWrap
              >
                Back
            </Typography>
            </IconButton>
            <div className={classes.grow}> </div>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
                Medical Hiastory
            </Typography>
            <div className={classes.grow}> </div>
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={{ marginTop: "60px"}}
          direction="row"
          justify="center"
          alignItems="center"
        >
            <Card style={{ width: "98%" }}>
                <CardContent>
                <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ fontWeight:"bold",color:"black",fontFamily:"arial", }}
            >
              Positive Review
            </Typography>
                {this.state.MedicalHistory!=""?this.state.MedicalHistory.map((MedicalHistoryHeading,index)=>
                 <Fragment key={index}>
                   <span>
                     {MedicalHistoryHeading.type_id=="1"? <Typography
                            style={{color:"black",padding:2}}
                            >
                           {MedicalHistoryHeading.review}
                          </Typography>:<div></div>}
                   </span>
               </Fragment>
                ):<div></div>}
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ fontWeight:"bold",color:"black",fontFamily:"arial", }}
            >
              Negative Review
            </Typography>
                {this.state.MedicalHistory!=""?this.state.MedicalHistory.map((MedicalHistoryHeading,index)=>
                 <Fragment key={index}>

                   <span>
                     {MedicalHistoryHeading.type_id=="2"? <Typography
                            style={{color:"black",padding:2}}
                            >
                           {MedicalHistoryHeading.review}
                          </Typography>:<div></div>}
                   </span>
               </Fragment>
                ):<div></div>}
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ fontWeight:"bold",color:"black",fontFamily:"arial", }}
            >
             Not Reported
            </Typography>
                {this.state.MedicalHistory!=""?this.state.MedicalHistory.map((MedicalHistoryHeading,index)=>
                 <Fragment key={index}>
                   <span>
                     {MedicalHistoryHeading.type_id=="3"? <Typography
                            style={{color:"black",padding:2}}
                            >
                           {MedicalHistoryHeading.review}
                          </Typography>:<div></div>}
                   </span>
               </Fragment>
                ):<div></div>}
            </Grid>
            
        </Grid>
                </CardContent>
            </Card>
        </Grid>

      </div>
    );
  }
}

export default withStyles(useStyles)(MedicalHistory);
