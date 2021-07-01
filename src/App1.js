import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo1 from "./logo_white.png";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Link } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { properties } from "./properties.js";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
          Prosk™
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

class LoginArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedB: true,
      username: "",
      password: "",
    };
    localStorage.setItem("url", properties.url);
  }
  handleChange = (event) => {
    this.setState({
      checkedB: event.target.checked,
    });
  };
  username = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  password = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  loginVerificationCode() {
    const dataTomcat = new FormData();
    dataTomcat.append("verification_code", 1111);

    let url = localStorage.getItem("url") + "/hsa/authentication/C40VerifyCode";

    fetch(url, {
      method: "POST",
      body: dataTomcat,
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        (result) => {
          if (result.success == 1) {
            if (result) {
              window.features = result.features;
              localStorage.setItem("features", JSON.stringify(result.features));
              console.log(JSON.parse(localStorage.getItem("features")));
              this.props.history.push("/home/");
            }
          } else if (result.error == 1) {
            alert(result.error_message);
          }
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // error => {
        //  alert('error:'+error.status);
        // }
      )
      .catch((error) =>
        error.status == 401
          ? alert("Invalid/Expired token, Please login again to continue")
          : alert("An error occured: " + error.status)
      );
  }
  handleSubmit(event, state) {
    const data = new FormData(event.target);
    event.preventDefault();
    if(this.state.username=="admin" && this.state.password=="admin123"){
      this.props.history.push("/home/");
    }else{
      alert("Incorrect Credentials");
    }
   
  }

  

  ResetPassword() {
    this.props.history.push("/ResetPassword/");
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DenseAppBar classes={classes} />
        <Grid>
          <Grid item xs={12}>
            <form
              id="myForm"
              name="myForm"
              onSubmit={(event) => this.handleSubmit(event, this.state)}
              encType={"application/json"}
              key="myForm"
            >
              <Grid
                style={{ textAlign: "center", marginTop: "10%" }}
                item
                xs={12}
              >
                <Grid container>
                  <Grid xs={5} />
                  <Grid xs={2} style={{ textAlign: "center" }}>
                    <Typography
                      color="primary"
                      style={{ textAlign: "center", marginBottom: "-1%" }}
                      variant="h6"
                    >
                      Log in to <b>Prosk™</b>
                    </Typography>
                  </Grid>
                </Grid>

                <TextField
                  id="user_id"
                  name="username"
                  label="User ID"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: 300 }}
                  value={this.state.username}
                  onChange={this.username}
                />
                <br />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  margin="normal"
                  style={{ width: 300 }}
                  value={this.state.password}
                  onChange={this.password}
                />
                <br />
                <br />

                <Button
                  style={{ marginLeft: "16em" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Login
                </Button>

                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedB}
                      onChange={this.handleChange}
                      value="checkedB"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <br />
                <Grid container>
                  <Grid xs={5} />
                  <Grid xs={2}>
                    <Divider variant="middle" />
                  </Grid>
                </Grid>
                <Link to={"ForgetPassword"}>
                  <Button
                    color="primary"
                    variant="text"
                    style={{ textTransform: "none" }}
                    onClick={this.ResetPassword}
                  >
                    Forgot ID or password?
                  </Button>
                </Link>
                <br />
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(LoginArea);
