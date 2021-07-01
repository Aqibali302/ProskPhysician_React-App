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

import InstitutionSetupIcon from "../images/institution_setup.png";
import CampusFacilityIcon from "../images/campus_facility.png";
import FacultyIcon from "../images/faculty_school.png";
import DegreeProgramsIcon from "../images/degree_programs.png";
import QualificationFrameworkIcon from "../images/qualification_framework.png";
import SemesterSetupIcon from "../images/semester_setup.png";
import ProgramDurationIcon from "../images/program_duration.png";
import CourseDisciplinesIcon from "../images/course_discipline.png";
import DepartmentsIcon from "../images/departments.png";
import FeeStructureIcon from "../images/fee_structure.png";
import EligibleIcon from "../images/eligible_icon.png";
import ActivateSessionIcon from "../images/activate_session.png";
import ServiceFeeIcon from "../images/service_fee.png";
import SchemeOfStudyIcon from "../images/scheme_of_study.png";

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
  return ["Core Definitions", "Degree Programs", "Session Activation"];
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
                form="#F12Form/0"
                view="#F12Reports"
                title="Academic Session"
                subtitle="Create academic sessions"
                icon={InstitutionSetupIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F21Form/0"
                view="#F21Reports"
                title="Offered Degree Programs"
                subtitle="Select degree programs being offered for the academic session"
                icon={DegreeProgramsIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F18Form/0"
                view="#F18Reports"
                title="Fee Structure Heads"
                subtitle="List all revenue heads for fee structure"
                icon={FeeStructureIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F09Form/0"
                view="#F09Reports"
                title="Department against Faculty/School"
                subtitle="List departments in Faculties and Schools for each academic session"
                icon={CourseDisciplinesIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F23Form/0"
                view="#F23Reports"
                title="Eligibility Criteria"
                subtitle="Customize eligibility criteria of degree programs being offered in the academic session"
                icon={EligibleIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F22Form/0"
                view="#F22Reports"
                title="Fee Structure"
                subtitle="Define fee structure for each degree program in the session"
                icon={FeeStructureIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F16Form/0"
                view="#F16Reports"
                title="Program Streams Categories"
                subtitle="List and categorize program streams e.g. Compulsory Courses, General Courses, Discipline Specific"
                icon={SemesterSetupIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F24Form/0"
                view="#F24Reports"
                title="Scheme of Study"
                subtitle="Create scheme of study for each degree program in the academic session"
                icon={SchemeOfStudyIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F17Form/0"
                view="#F17Reports"
                title="Service Fee"
                subtitle="List revenue heads against services e.g. Lost Student Card"
                icon={ServiceFeeIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F14Form/0"
                view="#F14Reports"
                title="Session Qualification Framework"
                subtitle="Customize qualification framework for each academic session"
                icon={QualificationFrameworkIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F15Form/0"
                view="#F15Reports"
                title="Credit Hours & Contact Hours"
                subtitle="Specify equivalence criteria between Credit Hours and Contact Hours"
                icon={SemesterSetupIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F12Reports"
                view="#F12Reports"
                title="Activate Session"
                subtitle="Activate or deactivate academic sessions"
                icon={ActivateSessionIcon}
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
