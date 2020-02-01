import React from "react";
import { connect } from "react-redux";
import SideBar from "../Navigation/SideBar";
import Styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
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
        <ContentContainer>{console.log(props)}</ContentContainer>
      </BodyContainer>
    </Router>
  );
}
const mapStateToProps = state => {
  return {
    username: state.username,
    users: state.users,
    userid: state.userid,
    logintransaction: state.logintransaction,
    usertransaction: state.usertransaction,
    token: state.token
  };
};

export default connect(
  mapStateToProps,

  {}
)(DashBoard);
