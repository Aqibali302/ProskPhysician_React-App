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
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from "@material-ui/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControl from "@material-ui/core/FormControl";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

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
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
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


class MedicationData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment_id: localStorage.getItem("AppointmentID"),
      user_id: localStorage.getItem("user_id"),
      MedicationData:[],
      SurgeryList:[],

    };
  }
  MobileGetUserConsentData() {
    let url =localStorage.getItem("url") +"/MobileGetDoneSurveys?appointment_id=" +this.state.appointment_id+"&type_id=1";
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
            MedicationData:result["medication"],
        });
        console.log(this.state.MedicationData)
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }


  MobileGeSugeryList() {
    let url =localStorage.getItem("url") +"/MobileGetQuestionMarks?appointment_id=" +this.state.appointment_id+"&patient_id="+this.state.user_id;
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
          SurgeryList:result["surgery_list"],
        });
console.log(this.state.SurgeryList)
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  handleMenu = (event) => {
    window.location = "#/Prosk/ShowAllUpcomingAppointmentListView";
  };



  componentDidMount() {
      this.MobileGetUserConsentData();
      this.MobileGeSugeryList();

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
         Medication
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
            <Grid container={8} style={{padding:"18px"}}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center",fontWeight:"bold",color:"teal" }}
            >
           Medication
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:"18px",fontWeight:"bold",color:"#009688"}}> Medication</TableCell>
                        <TableCell align="center" style={{fontSize:"18px",fontWeight:"bold",color:"#009688"}}>Dosage</TableCell>
                        <TableCell align="center" style={{fontSize:"18px",fontWeight:"bold",color:"#009688"}}>Dosage Form</TableCell>
                    </TableRow>
                    </TableHead>
                        <TableBody>
             {this.state.MedicationData.map((Medication)=>
                      <TableRow key={Medication.medicine_name}>
                            <TableCell   component="th" scope="row">  {Medication.medicine_name} </TableCell>
                            <TableCell align="center" style={{fontSize:"15px"}} >{Medication.dosage}</TableCell>
                            <TableCell align="center"  style={{fontSize:"15px"}}>   {Medication.dosage_form}</TableCell>
                            </TableRow>

                )}
                        </TableBody>
      </Table>
    </TableContainer>
            </Grid>
            <Grid container={8} style={{padding:"18px"}}>
           <Grid item xs={12} sm={12}>
           <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "left",fontWeight:"bold",color:"teal" }}
            >
           Surgery
            </Typography>
            {this.state.SurgeryList!=""?this.state.SurgeryList.map((SurgeryListHeading,index)=>
                 <Fragment key={index}>
                 <Typography
                            style={{color:"black",padding:2}}
                            >
                           {SurgeryListHeading.surgery_name}
                          </Typography>
               </Fragment>
                ):<div>
                  <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center",fontWeight:"bold" }}
            >
           No Surgeries
            </Typography>
                  </div>}
           </Grid>
            </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(useStyles)(MedicationData);
