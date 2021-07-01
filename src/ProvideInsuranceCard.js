import React, { useState, useEffect } from "react";

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
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import * as moment from "moment";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles, withStyles } from "@material-ui/styles";
import PrimaryAppBar from "./PrimaryAppBar";
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
  width: "150px",
  height: "150px",
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


class ProvideInsuranceCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
            
      appointment_id: localStorage.getItem("AppointmentID"),
      PatientID:localStorage.getItem("PID"),
      FrontPreview:localStorage.getItem("insurance_img_front"),
      BackPreview:localStorage.getItem("insurance_img_back"),
      SecondaryFrontPreview:localStorage.getItem("insurance_secondry_img_front"),
      SecondayBackPreview:localStorage.getItem("insurance_secondry_img_back"),
      tetiaryFrontPreview:localStorage.getItem("insurance_tertiary_img_front"),
      tetiaryBackPreview:localStorage.getItem("insurance_tertiary_img_back")

    };
  }

  handleMenu = (event) => {
    window.location = "#/Prosk/Documents";
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
            <div className={classes.grow}> </div>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Insurance Card
            </Typography>
            <div className={classes.grow}> </div>
            <IconButton color="inherit" onClick={this.handleMenu}>
              <HomeIcon /> <Typography
                color="inherit"
                noWrap
              >
                Home
            </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
         {/* Primary */}
         {this.state.FrontPreview!=""&&this.state.BackPreview!=""?        <div
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%",marginTop:"20px" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
            Primary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
                 >
                        Front Side
                    </Typography> <br/>
                  <img id="first_dropzone1" src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_img_front")} style={{height:"150px",marginTop:"40px",width:"50%"}} />{" "}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
                 >
                        Back Side
                    </Typography> <br/>
                  <img id="second_dropzone1" name={localStorage.getItem('insurance_img_back')} src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_img_back")} style={{height:"150px",marginTop:"40px",width:"50%"}} />{" "}
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>:<div></div>}

          {/* secondary */}
          {this.state.SecondaryFrontPreview!=""&&this.state.SecondaryBackPreview!=""?          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
            Secondary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
                 >
                        Front Side
                    </Typography> <br/>
                <img id="first_dropzone1" src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_secondry_img_front")}  style={{height:"150px",marginTop:"40px",width:"50%"}} />{" "}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
                 >
                        Back Side
                    </Typography> <br/>
                  <img id="second_dropzone1" name={localStorage.getItem('insurance_secondry_img_back')} src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_secondry_img_back")}  style={{height:"150px",marginTop:"40px",width:"50%"}} />{" "}
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>                 
                </Grid>
              </CardContent>
            </Card>
          </div>:<div></div>}
          {/* third */}
          {this.state.tetiaryFrontPreview!=""&&this.state.tetiaryBackPreview!=""?          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
            Tertiary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
{/* img */}
<Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
                 >
                        Front Side
                    </Typography> <br/>
<img id="first_dropzone1" src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_tertiary_img_front")}  style={{height:"150px",marginTop:"40px",width:"50%"}} />{" "}

                  </Grid>
                  <Grid item xs={12} sm={4}>
{/* img */}
<Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
                 >
                        Back Side
                    </Typography> <br/>
<img id="second_dropzone1" name={localStorage.getItem('insurance_tertiary_img_back')} src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_tertiary_img_back")}   style={{height:"150px",marginTop:"40px",width:"50%"}} />{" "}

                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>                 
                </Grid>
              </CardContent>
            </Card>
          </div>:<div></div>}

      </div>
    );
  }
}

export default withStyles(useStyles)(ProvideInsuranceCard);
