import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { withStyles } from "@material-ui/core/styles";

import {
  Card,
  CardHeader,
  Button,
  Typography,
  Avatar,
  CardContent,
  Grid,
  LinearProgress,
  Divider,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import av from "../images/1.jpg";
import av2 from "../images/2.png";
import av3 from "../images/3.jpg";
import av4 from "../images/4.png";
import av5 from "../images/5.png";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  progress: {
    margin: theme.spacing(12),
    color: "#00695c"
  },
  linearColorPrimary: {
    backgroundColor: "#b2dfdb"
  },
  linearBarColorPrimary: {
    backgroundColor: "#00695c"
  },
  // Reproduce the Facebook spinners.

  facebook1: {
    color: "#eef3fd"
  },
  facebook2: {
    color: "#6798e5",
    animationDuration: "550ms",
    position: "absolute",
    left: 0
  },
  avatar: {
    margin: 10
  },
  avatarGrey: {
    margin: 10,
    tintColor: "gray",

    opacity: 0.3,
    width: 30,
    height: 30
  },
  smallAvatar: {
    width: 30,
    height: 30
  },
  td: {
    textAlign: "center"
  },
  action: {
    display: "flex"
  },
  handCursor: {
    cursor: "pointer",
    listStyleType: "square"
  },
  handCursorHeading: {
    cursor: "pointer",
    textDecoration: "underline"
  },
  linkBody1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.46429em",
    fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
  }
});

// Create the chart
const options = {
  chart: {
    type: "bar"
  },
  title: {
    text: "Leaves"
  },
  xAxis: {
    categories: ["Casual", "Sick", "Annual"]
  },
  yAxis: {
    min: 0,
    title: {
      text: "Taken vs Available"
    }
  },
  legend: {
    reversed: true
  },
  plotOptions: {
    series: {
      stacking: "normal"
    }
  },
  series: [
    {
      name: "Available",
      data: [5, 16, 4]
    },
    {
      name: "Taken",
      data: [10, 8, 12]
    }
  ]
};
function ChartExample(props) {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
function Profile(props) {
  const classes = props.classes;

 function Appointments(event){
  window.location = "#/Appointments";
  }
  return (
    <Card
      style={{ marginLeft: "10px", marginRight: "10px", marginTop: "10px" }}
    >
      <CardHeader
        avatar={<Avatar aria-label="Recipe" src={av} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Danish Islam"
        subheader="Medical Cordinator"
      />

      <CardContent
        style={{ display: "block", height: "440px", marginTop: "0px" }}
      >
        <Typography variant="caption">Quick Links</Typography>
        <Divider variant="fullWidth" />
        <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
          <Link className={`${classes.handCursor} ${classes.linkBody1}`}
          onClick={Appointments}
          >
            Appointments
          </Link>
          <br />
          <Link className={`${classes.handCursor} ${classes.linkBody1}`}>
          Telemedicine Sessions
          </Link>
          <br />
          <Link className={`${classes.handCursor} ${classes.linkBody1}`}>
            Documents
          </Link>
        </div>
        <br />



        <Typography variant="caption">Upcoming Appointment</Typography>
        <Divider variant="fullWidth" />

        <List style={{ marginLeft: "-5px", marginTop: "10px" }}>
          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                // src={av4}
                className={classes.smallAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="legend"
                  className={classes.inline}
                  color="textPrimary"
                >
                  John de Lancie
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    
                    style={{ paddingLeft: "2px" }}
                  >
                    06/25/2020
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction style={{ top: "45%", right: 5}} >
              <Typography variant="caption" className={classes.inline}>
                10:00am
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                // src={av5}
                className={classes.smallAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="legend"
                  className={classes.inline}
                  color="textPrimary"
                >
                 John Smit
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    
                    style={{ paddingLeft: "2px" }}
                  >
                    06/25/2020
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction style={{ top: "45%", right: 5}} >
              <Typography variant="caption" className={classes.inline}>
                10:24am
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                // src={av3}
                className={classes.smallAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="legend"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Michael faraday
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    
                    style={{ paddingLeft: "2px" }}
                  >
                     06/25/2020
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction style={{ top: "45%", right: 5}} >
              <Typography variant="caption" className={classes.inline}>
                09:45am
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                // src={av2}
                className={classes.smallAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="legend"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Shane Watson
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    
                    style={{ paddingLeft: "2px" }}
                  >
                    06/25/2020
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction style={{ top: "45%", right: 5}} >
              <Typography variant="caption" className={classes.inline}>
                05:45am
              </Typography>
            </ListItemSecondaryAction>
          </ListItem> */}
        </List>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.actions}>
        <Button
          disabled
          color={"primary"}
          style={{ marginLeft: "auto", textTransform: "none" }}
        >
          View All
        </Button>
      </CardActions>
    </Card>
  );
}
export default withStyles(styles)(Profile);
