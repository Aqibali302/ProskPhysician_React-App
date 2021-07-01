import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import Medicine from "./images/thankyou.png";
import GaugeChart from 'react-gauge-chart'
import TextField from "@material-ui/core/TextField";
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
  colors,
  Button,
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import DoneIcon from "@material-ui/icons/Done";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Chart from "react-google-charts";
import loader from "./images/loder.gif";

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
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <div className={classes.grow} />
          <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <ExitToAppIcon />   Logout
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
class PROsTrendAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointment_id: localStorage.getItem("AppointmentID"),
      ProblemAreaId: localStorage.getItem("problem_area_id"),
      patient_id: localStorage.getItem("PID"),
      pain: [],
      Physical_function: [],
      Depression: [],
      Hip_Score: [],
      Knee_Score: [],
      mental_Score:[],
      Physical_score:[],
    };
  }
  handleMenu = (event) => {
    window.location = "#/Prosk/ShowAllUpcomingAppointmentListView";
  };
  ServeyScoring = () => {
     let url =localStorage.getItem("url") +"/MobileGetQuestionMarks?appointment_id=" +this.state.appointment_id+"&patient_id="+this.state.patient_id;
    // let url ="https://dev.myprosk.com/MobileGetQuestionMarks?appointment_id=2357&patient_id=1312";
    fetch(url, {
      method: "GET",
      //body: data
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(url);
            this.setState({
                 pain:result["pain_interference_graph_survey_data"],
               Physical_function:  result["physical_graph_survey_data"],
               Depression:  result["depression_graph_survey_data"],
               Hip_Score:  result["hip_graph_survey_data"],
               Knee_Score:  result["knee_graph_survey_data"],
               mental_Score:  result["promise10_mental_graph_survey_data"],
               Physical_score:  result["promise10_phsical_graph_survey_data"],
            })
            console.log("ABC==>");
            console.log(this.state.pain)

        },
        (error) => {
          alert(error)
        }
      )
  }
  componentDidMount() {

    this.ServeyScoring();
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form>
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
                PROs Trend Analysis
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
                <Grid spacing={8}>
                   {/*------------------------------------------------------------------------------------  */}
                   {this.state.Physical_score!=""?<Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        PROMIS Physical Score
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                    <Chart
                width={'500'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.Physical_score}
                options={{
                  title: '',
                  legend: { position: 'top' },
                  width:510
                }}
                rootProps={{ 'data-testid': '41' }}
              />
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>:<div></div>}

                     {/*---------------------------------------------------------------------------------------  */}
                   {this.state.mental_Score!=""?<Grid container spacing={2} >
                   <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}s
                      >
                       PROMIS Mental Score
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                    <Chart
                          width={'500'}
                          height={'300px'}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={this.state.mental_Score}
                          options={{
                            title: '',
                            legend: { position: 'top' },
                            width:510
                          }}
                          rootProps={{ 'data-testid': '41' }}
                        />
                    
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>

                   </Grid>:<div></div>}

                    {/* ------------------------------------------------------------------------------------------ */}

                    {this.state.Physical_function!=""?<Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Physical Function
          </Typography>
                    </Grid>


                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                    <Chart
                width={'500'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.Physical_function}
                options={{
                  title: '',
                  legend: { position: 'top' },
                  width:510
                }}
                rootProps={{ 'data-testid': '41' }}
              />
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>:<div></div>}

                  {/* ------------------------------------------------------------------------------------------ */}

                    {this.state.pain!=""?<Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}s
                      >
                        Pain Interface
          </Typography>
                    </Grid>


                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                      
                    <Chart
                width={'500'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.pain}
                options={{
                  title: '',
                  legend: { position: 'top' },
                  width:510
                }}
                rootProps={{ 'data-testid': '41' }}
              />
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>:<div></div>}
                 

                  {this.state.Hip_Score !="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Hip Score
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>

                    <Grid item xs={4} sm={4}>
                    <Chart
                width={'500'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.Hip_Score}
                options={{
                  title: '',
                  legend: { position: 'top' },
                  width:510
                }}
                rootProps={{ 'data-testid': '41' }}
              />
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                  </Grid> : <div></div>}

                  

                  {this.state.Knee_Score !=""? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Knee Score
          </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                    <Chart
                width={'500'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.Knee_Score}
                options={{
                  title: '',
                  legend: { position: 'top' },
                  width:510
                }}
                rootProps={{ 'data-testid': '41' }}
              />
                       
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                  </Grid> : <div></div>}

                  

                    {this.state.Depression!=""?<Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Depression
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>

                    <Grid item xs={4} sm={4}>
                    <Chart
                width={'500'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.Depression}
                options={{
                  title: '',
                  legend: { position: 'top' },
                  width:510
                }}
                rootProps={{ 'data-testid': '41' }}
              />
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>:<div></div>}
                   
                </Grid>
              </CardContent>
            </Card>
            
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(PROsTrendAnalysis);
