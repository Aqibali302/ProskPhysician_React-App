import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepButton
} from "@material-ui/core";

import AccountOpeningIcon from "../images/699313-icon-42-note-add-512.png";
import CashReceiptsIcon from "../images/cash-in-hand.png";
import GeneralLedgerIcon from "../images/cbr-financial-reporting-icon-01.png";
import ChartofAccountsIcon from "../images/021_120_layout_wireframe_grid_sitemap_structure_list_thread_2-512.png";
import CashPaymentsIcon from "../images/hand_cash_give_receive_money_payment_shop-512.png";
import GeneralJournalIcon from "../images/reports-icon.png";
import JournalVoucherIcon from "../images/icon_order-entry.png";
import BankReceiptsIcon from "../images/icon-home-direct-to-bank.png";
import TrialBalanceIcon from "../images/117980_math_512x512.png";
import RevenueCollectionIcon from "../images/380-3801594_once-we-have-created-steady-revenue-streams-and.png";
import BankPaymentsIcon from "../images/Cheque128px.png"; //Cheque128px.png
import StudentLedgerIcon from "../images/report_0.png";

import { makeStyles, withStyles } from "@material-ui/styles";
import PrimaryAppBar from "../PrimaryAppBar";

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
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  bigAvatar: {
    margin: 10
  },
  inline: {
    display: "inline"
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px"
  }
}));

const classes = makeStyles(theme => ({
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
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  bigAvatar: {
    margin: 10
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
function getSteps() {
  return ["Accounts", "Transactions", "Ledgers"];
}

function ActionTile(props) {
  return (
    <Card
      className={classes.card}
      style={{
        margin: "0px 10px 10px 10px",
        cursor: "pointer",
        height: "100px"
      }}
      onClick={event => (window.location = props.form)}
    >
      <CardHeader
        title={<Typography color="primary">{props.title}</Typography>}
        subheader={props.subtitle}
        avatar={<Avatar className={classes.bigAvatar} src={props.icon} />}
      />
    </Card>
  );
}
function D22Dashboard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  const classes = useStyles();
  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  const handleStep = step => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University College Lahore"} />
      <div style={{ marginTop: "80px" }}>
        <Grid container>
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={12}>
            <Stepper nonLinear orientation="horizontal">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={handleStep(index)} active={true}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} container style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F27Form/0"
                view="#F27Form"
                title="Account Opening"
                subtitle="Define and categorise accounts in Assets, Liabilities, Capital, Revenue and Expenses"
                icon={AccountOpeningIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F30Form/0"
                view="#F21Reports"
                title="Cash Receipts"
                subtitle="Cash and petty cash inflows other than fee revenue"
                icon={CashReceiptsIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#R29Reports"
                view="#F18Reports"
                title="General Ledger"
                subtitle="Monitor transaction activity of all types for the period"
                icon={GeneralLedgerIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#R28Reports"
                view="#R28Reports"
                title="Chart of Accounts"
                subtitle="List of accounts categorised in four levels"
                icon={ChartofAccountsIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F32Form/0"
                view="#F21Reports"
                title="Cash Payments"
                subtitle="Cash outflows and petty expenses"
                icon={CashPaymentsIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#R36Reports"
                view="#R36Reports"
                title="General Journal"
                subtitle="Define fee structure for each degree program in the session"
                icon={GeneralJournalIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F35Form/0"
                view="#F16Reports"
                title="Journal Voucher"
                subtitle="Excpetional and adjusting transactions"
                icon={JournalVoucherIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F33Form/0"
                view="#F21Reports"
                title="Bank Receipts"
                subtitle="Bank inflows other than regular fee revenue"
                icon={BankReceiptsIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#R31Reports"
                view="#R31Reports"
                title="Trial Balance"
                subtitle="Standard accounting trial balance for any level"
                icon={TrialBalanceIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F03Form/0"
                view="#F03Reports"
                title="Revenue Collection"
                subtitle="Manage control accounts that integrate with fee management"
                icon={RevenueCollectionIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F34Form/0"
                view="#F15Reports"
                title="Bank Payments"
                subtitle="Bank outflows and supplier payments, excluding payroll"
                icon={BankPaymentsIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F12Reports"
                view="#F12Reports"
                title="Student Ledger"
                subtitle="Accounts ledger of students"
                icon={StudentLedgerIcon}
                introduction=""
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default D22Dashboard;
