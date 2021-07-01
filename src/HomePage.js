import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import PrimaryAppBar from "./PrimaryAppBar";

import Profile from "./homepage/Profile";
import SalesContract from "./homepage/SalesContract";
import UpcomingAppointments from "./homepage/UpcomingAppointments";
import EmailTemplate from "./homepage/EmailTemplate";
import CreateNewPatient from "./homepage/CreateNewPatient";
import CostSheet from "./homepage/CostSheet";
import PackingList from "./homepage/PackingList";
import DeliveryOrder from "./homepage/DeliveryOrder";
import Invoice from "./homepage/Invoice";
import Documents from "./homepage/Documents";
import DeleteAppointment from "./homepage/DeleteAppointment";


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

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <PrimaryAppBar header_text={"Prosk™"} />
      <div style={{ marginTop: "70px" }}>
        <Grid container>
          <Grid item xs={12} sm={3} container>
            <Grid item xs={12} sm={12}>
              <Profile  />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} container>
            <Grid item xs={12} sm={4}>
              <SalesContract />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Invoice />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Documents  />
            </Grid>
            <Grid item xs={12} sm={4}>
              <UpcomingAppointments/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <EmailTemplate/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CreateNewPatient/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <DeleteAppointment/>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </div>
    </div>
  );
}
export default HomePage;
