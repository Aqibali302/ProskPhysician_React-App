import React from "react";

import { HashRouter as Router, Route, Link } from "react-router-dom";
import Demo from "./demo";
import App from "./App";
import App1 from "./App1";

import HomePage from "./HomePage";
import Appointments from "./Appointments";
import DeleteAppointmentTable from "./DeleteAppointmentTable";
import DeleteAppointmentTableList from "./DeleteAppointmentTableList";

import ReportsHeader from "./utilities/ReportsHeader";
import ReportsDepartment from "./utilities/ReportsDepartment";
import InitialsScreen from "./initials/InitialsScreen";
import SetupTwoFactor from "./SetupTwoFactor";

import MobileVerification from "./MobileVerification";
import ForgetPassword from "./ForgetPasswordEmail";
import MeetingRoom from "./MeetingRoom";
import TelemedicineAppointments from "./TelemedicineAppointments";
import InsuranceCardMain from "./InsuranceCardMain";
import ShowAllupcomingAppointments from "./ShowAllupcomingAppointments";
import ShowAllUpcomingAppointmentListView from "./ShowAllUpcomingAppointmentListView";
import ProvideIDCard from "./ProvideIDCard";
import ProvideInsuranceCard from "./ProvideInsuranceCard";
import ShowAllConsent from "./ShowAllConsent";
import Consentpdf from "./Consentpdf";
import SurveyData from "./SurveyData";
import SurveyScore from "./SurveyScore";
import MedicationData from "./MedicationData";
import MedicalHistory from "./MedicalHistory";
import EmailTemplateDetail from "./EmailTemplateDetail";
import NewPatientForm from "./NewPatientForm";
import Documents from "./Documents";
import PROsTrendAnalysis from "./PROsTrendAnalysis";





function Navigation() {
  return (
    <Router basename={"/Prosk"}>
      <Route exact path="/" component={App1} />
      <Route exact path="/1" component={App} />
      <Route exact path="/PROsTrendAnalysis" component={PROsTrendAnalysis} />
      <Route exact path="/demo/" component={Demo} />
      <Route exact path="/home/" component={HomePage} />
      <Route exact path="/R101/" component={ReportsHeader} />
      <Route exact path="/initials/" component={InitialsScreen} />
      <Route exact path="/MobileVerification/" component={MobileVerification} />
      <Route exact path="/SetupTwoFactor" component={SetupTwoFactor} />
      <Route exact path="/ResetPassword" component={ForgetPassword} />
      <Route exact path="/ReportsDepartment" component={ReportsDepartment} />
      <Route exact path="/Appointments" component={Appointments} />
      <Route exact path="/MeetingRoom" component={MeetingRoom} />
      <Route exact path="/TelemedicineAppointments" component={TelemedicineAppointments} />
      <Route exact path="/InsuranceCardMain" component={InsuranceCardMain} />
      <Route exact path="/ShowAllupcomingAppointments" component={ShowAllupcomingAppointments} />
      <Route exact path="/ShowAllUpcomingAppointmentListView" component={ShowAllUpcomingAppointmentListView} />
      <Route exact path="/ProvideIDCard" component={ProvideIDCard} />
      <Route exact path="/ProvideInsuranceCard" component={ProvideInsuranceCard} />
      <Route exact path="/ShowAllConsent" component={ShowAllConsent} />
      <Route exact path="/Consentpdf" component={Consentpdf} />
      <Route exact path="/SurveyData" component={SurveyData} />
      <Route exact path="/MedicationData" component={MedicationData} />
      <Route exact path="/SurveyScore" component={SurveyScore} />
      <Route exact path="/MedicalHistory" component={MedicalHistory} />
      <Route exact path="/Documents" component={Documents} />
      <Route exact path="/EmailTemplateDetail" component={EmailTemplateDetail} />
      <Route exact path="/NewPatientForm" component={NewPatientForm} />
      <Route exact path="/DeleteAppointmentTable" component={DeleteAppointmentTable} />
      <Route exact path="/DeleteAppointmentTableList" component={DeleteAppointmentTableList} />
    </Router>
  );
}
export default Navigation;
