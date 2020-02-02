import React from "react";
import { connect } from "react-redux";
import SideBar from "../Navigation/SideBar";
import Styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectsList from "./ProjectsList";
const SideBarCont = Styled.div`
padding:0.003rem;
width:10%;
`;
const ContentContainer = Styled.div`
padding:1%;
width:80%;
`;
const BodyContainer = Styled.div`
display:flex;
`;

function DashBoard(props) {
  return (
    <Router>
      <BodyContainer>
        <SideBarCont>
          <SideBar />
        </SideBarCont>
        <ContentContainer>
          <Route path="/projects" component={ProjectsList} />
          {console.log(props)}
        </ContentContainer>
      </BodyContainer>
    </Router>
  );
}
const mapStateToProps = state => {
  return {
    username: state.username,
    projects: state.projects,
    userid: state.userid,
    logintransaction: state.logintransaction,
    projecttransaction: state.projecttransaction,
    token: state.token
  };
};

export default connect(
  mapStateToProps,

  {}
)(DashBoard);
