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
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  withStyles,
  Tooltip,
  Badge
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";
import av3 from "../images/3.jpg";
import Quiz from "../images/grade_book_quiz.png";
import Assignments from "../images/my_objectives_training.png";
import MidTerm from "../images/grade_book_mid_term.png";
import CommunityIcon from "../images/packing_list.png";
import ModuleIcon from "../images/my_objectives_module.png";
import av4 from "../images/4.png";
import av5 from "../images/5.png";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
function PackingList(props) {
  const classes = props.classes;

  return (
    <Card style={{ marginLeft: "10px", marginRight: "10px", marginTop: "10px" }}>
      <CardHeader
        title={<Typography color="primary">Medical History</Typography>}
        avatar={<Avatar className={classes.bigAvatar} src={CommunityIcon}  />}
      />

      <CardContent
        style={{ display: "block", height: "150px", marginTop: "-20px" }}
      >
        <List>
          <ListItem alignItems="flex-start">
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
            
          </ListItem>
        </List>
      </CardContent>
      <Divider variant="middle" />
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <div>
          <Tooltip title="New Request">
            <IconButton aria-label="New">
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
export default withStyles(styles)(PackingList);
