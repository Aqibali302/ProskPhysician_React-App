import React from "react";
import ReactDOM from "react-dom";
import {
  Card,
  CardHeader,
  Divider,
  CardActions,
  Button,
  Typography,
  Avatar,
  CardContent,
  List,
  Badge,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  withStyles,
  Tooltip
} from "@material-ui/core";
import HelpIcon from "../images/contract.png";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";

import av4 from "../images/4.png";
import av5 from "../images/5.png";
import { Link } from "react-router-dom";
const styles = theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  smallAvatar: {
    width: 27,
    height: 27
  }
});
function SalesContract(props) {
  const classes = props.classes;
function Appointments(event){
  window.location = "#/Appointments";
}
  return (
    <Card style={{ marginLeft: "10px", marginRight: "10px", marginTop: "10px" }}>
      <CardHeader
        title={<Typography color="primary" ><Link to="/Appointments"  style={{color:"currentcolor",textDecoration:"blink"}}>Appointments</Link></Typography>
      }
        avatar={<Avatar className={classes.bigAvatar} src={HelpIcon} />}
      />

      <CardContent
        style={{ display: "block", height: "140px", marginTop: "-20px" }}
      >
        <List>
          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                //src={av4}
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
                    Pending
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                //src={av5}
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
                    Pending
                  </Typography>
                </React.Fragment>
              }
            />
            
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                //src={av5}
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
                   Michael Faraday
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    
                    style={{ paddingLeft: "2px" }}
                  >
                    Pending
                  </Typography>
                </React.Fragment>
              }
            />
            
          </ListItem> */}
        </List>
      </CardContent>
      <Divider variant="middle" />
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <div>
          <Tooltip title="Start/Resume">
            <IconButton aria-label="New" >
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="In Progress">
            <IconButton aria-label="In Progress">
              <Badge color="primary" badgeContent={4}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Action Awaited">
            <IconButton aria-label="Action Awaited">
              <Badge color="primary" badgeContent={4}>
                <ScheduleIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </CardActions>
    </Card>
  );
}
export default withStyles(styles)(SalesContract);
