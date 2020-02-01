import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import NavBar from "./Navigation/NavBar";
import PrivateRoute from "./utils/PrivateRoute";
import DashBoard from "./dashboard/Dashboard";
function App(props) {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={LogIn} />
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={SignUp} />
      <PrivateRoute path="/dashboard" component={DashBoard} props={props} />
    </Router>
  );
}
const mapStateToProps = state => {
  return {
    username: state.username,
    users: state.users,
    logintransaction: false,
    usertransaction: false,
    token: state.token
  };
};

export default connect(
  mapStateToProps,

  {}
)(App);
