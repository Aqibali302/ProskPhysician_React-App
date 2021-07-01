import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo1 from "./logo1.png";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
const styles = theme => ({
  root: {
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={40} />
          </IconButton>
          <Typography variant="h6" color="inherit">
            UCL School of Management Sciences
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("/WaveEdu/IndexExecuteVerifyCode", {
    method: "POST",
    body: data
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(
      result => {
        if (result.success == 1) {
          this.props.history.push("/home/");
        } else if (result.error == 1) {
          alert(result.error_message);
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        alert(error);
      }
    );
}
function MobileVerification(props) {
  const { classes } = props;
  const [state, setState] = React.useState({
    checkedB: true
  });
  function LoginUser1() {
    props.history.push("/home/");
  }
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const dataTomcat=new FormData(event.target);



    let url="https://localhost/cms/authentication/C40VerifyCode";
    //let url="/WaveEdu/IndexExecuteVerifyCode";
    fetch(url, {
      method: "POST",
      body: dataTomcat,
      headers:new Headers({
       
        'Authorization': 'Bearer '+localStorage.getItem('token')
      })
      
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        result => {
          if (result.success == 1) {
            /* global.menu=[
                {name:'danish yazdani',id:1},
                {name:'awais ali',id:2},
                ];  
                */
            window.features = result.features;
            localStorage.setItem("features", JSON.stringify(result.features));
            console.log(JSON.parse(localStorage.getItem("features")));
          //  props.history.push("/home/");
           verifyCodeTomcat(dataTomcat);
          } else if (result.error == 1) {
            alert(result.error_message);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
       // error => {
        //  alert('error:'+error.status);
       // }
      )
      .catch(error => error.status==401?alert("Invalid/Expired token, Please login again to continue"):alert('An error occured: '+error.status));
  }
  function verifyCodeTomcat(data) {

    
    //let url="http://localhost/cms/authentication/C40VerifyCode";
    let url="/WaveEdu/IndexExecuteVerifyCode";
    fetch(url, {
      method: "POST",
      body: data,
      
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        result => {
          if (result.success == 1) {
            /* global.menu=[
                {name:'danish yazdani',id:1},
                {name:'awais ali',id:2},
                ];  
                */
            //window.features = result.features;
            //localStorage.setItem("features", JSON.stringify(result.features));
            //console.log(JSON.parse(localStorage.getItem("features")));
            
            props.history.push("/home/");
          } else if (result.error == 1) {
            alert(result.error_message);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          alert(error);
        }
      );
  }
  
  return (
    <div className={classes.root}>
      <DenseAppBar classes={classes} />
      <Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid style={{ textAlign: "center", marginTop: "7%" }} item xs={12}>
              <Typography
                color="primary"
                style={{ textAlign: "left" }}
                variant="subtitle1"
                style={{ marginBottom: "-1%" }}
              >
                A code has been sent to google authenticator. Please type it
                here
              </Typography>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Grid
                  style={{ textAlign: "center", marginTop: "2%" }}
                  item
                  xs={12}
                >
                  <TextField
                    autoFocus
                    id="verification_code"
                    name="verification_code"
                    label="Verification Code"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: 350 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginTop: "2%", marginLeft: "2%" }}
                  >
                    Login
                  </Button>
                </Grid>
              </div>

              <br />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

MobileVerification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MobileVerification);
