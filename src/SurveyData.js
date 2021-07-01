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


class SurveyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment_id: localStorage.getItem("AppointmentID"),
      patient_id: localStorage.getItem("PID"),
      SurveyQuestion:[],
      SurveyAnswers:[],
      Question:[],
      Answer:[],
      SurveyAnswer:[],
      fileLabel:[],
      ModuleData:[]

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
            SurveyQuestion:result["review_system_list"],
        });
console.log(this.state.SurveyQuestion)
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
           Review of System
            </Typography>
            <div className={classes.grow}> </div>
            {/* <IconButton color="inherit" onClick={this.handleMenu}>
              <HomeIcon /> <Typography
                color="inherit"
                noWrap
              >
                Home
            </Typography>
            </IconButton> */}
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
              
                {this.state.SurveyQuestion!=""?this.state.SurveyQuestion.map((SurveyQuestionHeading,index)=>
                 <Fragment key={index}>
                 {index ? <Divider variant="fullWidth" /> : ""}
                 
                   <span style={{color:"black", fontSize:"20px", padding:8}}>
                   <b >{SurveyQuestionHeading.review_label}</b>
                     <br/>
                    {SurveyQuestionHeading.data.map((SurveyQuestion,index1)=>
                       <Fragment key={index1}>
                         
                          <Typography
                            style={{color:SurveyQuestion.type_id=="1"?"red":"black",padding:0,listStyle:"none",textDecoration:"none",display:"inline",marginLeft:"20px",}}
                            >
                           {SurveyQuestion.review}
                          </Typography>
                             
                     <br/>
                       </Fragment>
                    )}
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

export default withStyles(useStyles)(SurveyData);
