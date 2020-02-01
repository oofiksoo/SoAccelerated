import React from "react";
import { connect } from "react-redux";
import SideBar from "../Navigation/SideBar";
import Styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserList from "../components/UserList";
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

function DashBoard(...props) {
  return (
    <Router>
      <BodyContainer>
        <SideBarCont>
          <SideBar />
        </SideBarCont>
        <ContentContainer>
          {console.log(props)}
          <Route path="/users" component={UserList} props={props} />
        </ContentContainer>
      </BodyContainer>
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
)(DashBoard);
