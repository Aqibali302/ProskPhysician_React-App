import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import pend from "./images/pend.png";
import Medicine from "./images/complete.png";
import review from "./images/review.png";

import {
    Card,
    ListGroup,
    CardHeader,
    Divider,
    CardActions,
    Typography,
    Avatar,
    CardContent,
    Badge,
    IconButton,
    Tooltip,
    LinearProgress,
    ListItemText,
    ListItemSecondaryAction,
    List,
    ListItem,
    ListItemAvatar,
    Button,
    Grid
  } from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "./images/contract.png";
import CommunityIcon from "./images/packing_list.png";
import GradeBookIcon from "./images/delivery_order.png";
import MyObjectivesIcon from "./images/invoice.png";
import LeavesIcon from "./images/cost_sheet.png";
import done from "./images/done.png";
import pending from "./images/pending.png";
import ID from "./images/id.png";
import issurance from "./images/issurance.png";

import sign from "./images/sign.png";
import survey from "./images/survey.png";
import medicalhistory from "./images/medical-history.png";
import med from "./images/med.png";
import allergy from "./images/Untitled-3.png";
import LeaveStatus from "./homepage/Profile";

import Workfellow from "./homepage/Workfellow";
import LeavesApproval from "./homepage/LeavesApproval";
import Initials from "./homepage/Initials";
import PrimaryAppBar from "./PrimaryAppBar";
import GradeBook from "./homepage/GradeBook";
import MyObjectives from "./homepage/MyObjectives";
import Community from "./homepage/Community";
import Loader from 'react-loader-spinner'
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
    window.location = "#/MenuPage/";
  };
  return (
    <div className={classes.root}>
              <AppBar position="fixed">
          <Toolbar variant="dense">
            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              
            </Typography>
            <div className={classes.grow} />
            <div>
            {/* <IconButton color="inherit" onClick={handleMenu}>
              <ExitToAppIcon />   Home
            </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
    </div>
  );
}
class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        IDCard:false,
        InsuranceCard:false,
        Consect:false,
        PMH:false,
        Medical:false,
        Survey:false,
        checkedB: true,
        AllergiesTrailing: "done.png",
        isSavedCalled:false,
        isOpenSnackbar: false,
        snackbarMessage: "",
        snackbarSeverity: "",
        firstName:localStorage.getItem("first_name"),
        LastName:localStorage.getItem("last_name"),
        appointment_id: localStorage.getItem("appointment_id"),
        user_id: localStorage.getItem("user_id"),
        date_of_birth: localStorage.getItem("date_of_birth"),
        baseUrl: "./images/",
        AllergiesStatus: (
          <Typography variant="title" style={{ color: "yellow" }}>
                 <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
          </Typography>
        ),
        IDCardStatus: (
          <Typography variant="title" style={{ color: "red" }}>
             <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
            {/* Not Submitted */}
          </Typography>
        ),
        InsuranceCardStatus: (
          <Typography variant="title" style={{ color: "red" }}>
                <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
          </Typography>
        ),
        ConsentsStatus: (
          <Typography variant="title" style={{ color: "red" }}>
                 <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
          </Typography>
        ),
        QuestionStatus: (
          <Typography variant="title" style={{ color: "red" }}>
                <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
          </Typography>
        ),
        PMHStatus: (
          <Typography variant="title" style={{ color: "red" }}>
                <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
          </Typography>
        ),
        MedicationsStatus: (
          <Typography variant="title" style={{ color: "yellow" }}>
               <img src={pend} height="60px" width="70px" style={{marginRight:"19px"}} />
          </Typography>
        ),
    };
    
  }
  handleListItemClick = (event) => {
    window.location = "#/Prosk/ProvideIDCard";
  };
  handleListItemClick2 = (event) => {
    console.log("aqib");
    window.location = "#/Prosk/ProvideInsuranceCard";
  };
  handleConsentClick = (event) => {
    window.location = "#/Prosk/ShowAllConsent";
  };
  handleSurveyClick = (event) => {
    window.location = "#/Prosk/SurveyData";
  };
  handlePMHClick = (event) => {
    window.location = "#/Prosk/MedicalHistory";
  };
  handleMedicationsClick = (event) => {
    window.location = "#/Prosk/MedicationData";
  };
  handleAllergiesClick = (event) => {
    window.location = "#/AllergiesForm";
  };
  handleSurveyClick9 = (event) => {
    window.location = "#/Prosk/SurveyScore";
  };
  handleMenu = (event) => {
    window.location = "#/Prosk/ShowAllUpcomingAppointmentListView";
  };
  Finish = (event) => {
    
    if(this.state.IDCard==false){
      window.location = "#/ProvideIDCard";
    }else if(this.state.InsuranceCard==false){
      window.location = "#/ProvideInsuranceCard";
    }else if(this.state.Consect==false){
      window.location = "#/Consent1";
    }else if(this.state.PMH==false){
      window.location = "#/PMH";
    }else if(this.state.Survey==false){
      window.location = "#/Survey";
    }else{
      this.setState({
        isSavedCalled:true
      });
      window.location = "#/ThankyouPage";
    }
  }

  MobileCheckUserExists = (event) => {
    const dataTomcat = new FormData();
    let url =localStorage.getItem("url") +"/MobileCheckUserExistsV2?appointment_id="+this.state.appointment_id+"&user_id="+this.state.user_id;
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
        console.log(url);
        if (result[0]["success"] == "1") {
          if (result[0]["is_registered"] == 1) {
            localStorage.setItem("UserID", result[0]["user_id"].toString());

            localStorage.setItem(
              "AppointmentID",
              result[0]["upcoming_appointment_id"].toString()
            );
            if (
              result[0]["is_id_front_uploaded"] == 1 &&
              result[0]["is_id_back_uploaded"] == 1
            ) {
              this.setState({
                IDCard:true,
                IDCardStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
                  <img src={Medicine}  height="100px" width="100px" />
                  </Typography>
                ),
              });
            }
            if (
              result[0]["is_insurance_front_uploaded"] == 1 &&
              result[0]["is_insurance_back_uploaded"] == 1
            ) {
              this.setState({
                InsuranceCard:true,
                InsuranceCardStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
<img src={Medicine}  height="100px" width="100px" />
                  </Typography>
                ),
              });
            }
            if (result[0]["IsConsentsExists"] == 1) {
              this.setState({
                Consect:true,
                ConsentsStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
        <img src={Medicine}  height="100px" width="100px" />
                  </Typography>
                ),
              });
            }
            if (
              result[0]["attempted_questions"] +
                result[0]["attempted_questions"] >
              18
            ) {
              this.setState({
                Survey:true,
                QuestionStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
        <img src={Medicine}  height="100px" width="100px" />
                  </Typography>
                ),
              });
            }
            if (
              result[0]["attempted_questions_pmh"] +
                result[0]["attempted_questions_pmh"] >
              50
            ) {
              this.setState({
                PMH:true,
                PMHStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
        <img src={Medicine}  height="100px" width="100px" />
                  </Typography>
                ),
              });
            }
            if ( result[0]["is_medication_available"]==1) {
              this.setState({
                Medical:true,
                MedicationsStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
        <img src={Medicine}  height="100px" width="100px" />
                  </Typography>
                ),
              });
            }
          } else {
            // window.location = "#/retailer/UserProfile/";
          }
        }
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  };

  MobileGetUserInfo() {
    let url =localStorage.getItem("url") +"/MobileConsentGetUserInformationv2?user_id=" +this.state.user_id;
    //let url="/WaveEdu/IndexExecuteVerifyCode";
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

        localStorage.setItem("first_name", result["first_name"] + "");
        localStorage.setItem("middle_name", result["middle_name"] + "");
        localStorage.setItem("last_name", result["last_name"] + "");
        localStorage.setItem(
          "last_appointment",
          result["last_appointment"] + ""
        );
        localStorage.setItem("email", result["email"] + "");
        localStorage.setItem("phone", result["phone"] + "");
        localStorage.setItem("date_of_birth", result["date_of_birth"] + "");
        localStorage.setItem("PID", localStorage.getItem("UserID"));
        localStorage.setItem("id_img_front", result["id_img_front"]+ "");
        localStorage.setItem("id_img_back", result["id_img_back"]+ "");
        localStorage.setItem("insurance_img_front", result["insurance_img_front"]+ "");
        localStorage.setItem("insurance_img_back", result["insurance_img_back"]+ "");
        localStorage.setItem("insurance_secondry_img_front", result["insurance_secondry_img_front"]+ "");
        localStorage.setItem("insurance_secondry_img_back", result["insurance_secondry_img_back"]+ "");
        localStorage.setItem("insurance_tertiary_img_front", result["insurance_tertiary_img_front"]+ "");
        localStorage.setItem("insurance_tertiary_img_back", result["insurance_tertiary_img_back"]+ "");
       this.MobileCheckUserExists();
       
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  componentDidMount() {
      console.log(this.state.user_id);
      console.log(this.state.appointment_id);
        this.MobileGetUserInfo();
 
   

}
  handleOpenSnackbar = (msg, severity) => {
    this.setState({
        isOpenSnackbar: true,
        snackbarMessage: msg,
        snackbarSeverity: severity,
    });
  };
//   homemenu = (event) => {
//     window.location = "#/MenuPage/";
//   };
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    this.setState({
        isOpenSnackbar: false,
    });
  };
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
            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Documents
            </Typography>
            <div className={classes.grow} />
            {/* <div>
            <IconButton color="inherit" onClick={this.homemenu}>
              <HomeIcon /><Typography
              color="inherit"
              noWrap
              
            >
              Home
            </Typography>
            </IconButton>
            </div> */}
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: "60px" }}>
        <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
          <Grid container>
            <Grid item xs={12} sm={12} container>
              <Grid item xs={12} sm={12}>
                <Card
                  style={{
                    marginLeft: "1%",
                    marginRight: "1%",
                    marginTop:"1%"
                  }}
                >
                  <List className={classes.root}>
                  <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handleConsentClick(event)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                               
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Sign Consents
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={sign}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.ConsentsStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handleListItemClick(event)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                              
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Provide ID Card
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={ID}
                                style={{ height: "50px", width: "50px" }}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.IDCardStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    <Card
                      style={{
                        marginLeft: "0%",
                        marginBottom:"-9px"
                      }}
                    >
                      <ListItem
                        button
                        
                        onClick={(event) => {this.handleListItemClick2(event)}}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                               
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Provide Insurance Card
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={issurance}
                                style={{ height: "50px", width: "50px" }}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.InsuranceCardStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <br />
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(Documents);
