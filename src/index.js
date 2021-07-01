import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigation from "./Navigation";
import * as serviceWorker from "./serviceWorker";

import {MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";

import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import { lightBlue } from "@material-ui/core/colors";
const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: teal,
    secondary: lightBlue,
  },
  overrides: {
    MuiTypography: {
      caption: {
        lineHeight: "1.375em",
        fontSize: "0.74rem",
        color: "rgba(0, 0, 0, 0.54)",
      },
      body1: {
        fontSize: "0.875rem",
        lineHeight: "1.4em",
      },
    },
    MuiListItemText: {
      root: {
        padding: "0 16px",
      },
      multiline: {
        marginTop: "0 !important",
        marginBottom: "0 !important",
      },
    },
    MuiListItemAvatar: {
      root: {
        minWidth: "0 !important",
      },
      alignItemsFlexStart: {
        marginTop: "4px",
      },
    },
    MuiList: {
      padding: {
        paddingTop: "0 !important",
      },
    },
    MuiListItem: {
      secondaryAction: {
        paddingRight: "32px",
      },
    },
    MuiTableCell: {
      head: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "0.75rem",
        lineHeight: "3rem",
      },
      body: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "0.8125rem",
        fontWeight: 400,
      },
      root: {
        padding: "4px 56px 4px 24px",
      },
    },
  },
});




ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Navigation />
  </MuiThemeProvider>,
   document.getElementById("root")
);
//ReactDOM.render(<Navigation />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
