import React from "react";
import Styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
import logo from "./logo.svg";
import { connect } from "react-redux";
const AcntCont = Styled.div`
display:flex;
flex-direction:column;
padding: 20%;
align-items:center;
h3{
    font-size:.7rem;
    text-align:center;
    color:white;
    white-space: nowrap;
}
img{
  border:2px solid white;
    border-radius: 10%;
}
a{
    text-decoration:none;
    color:white;
}
p{
  display:flex;
  align-items:center;
  padding:5px;
    font-size:.56rem;
    border:2px solid white;
    border-radius: 1rem;
    
}
`;
const AcntNav = Styled.div`
display:flex;
`;
const AcntItem = Styled.div`
margin:.5rem;
`;

function SideBarAcnt(props) {
  return (
    <AcntCont>
      <h3> Hello, {props.username} </h3>
      <img src={logo} alt="AcntImg" height="100px" width="100px" />
      <AcntNav>
        <AcntItem>
          <NavLink exact to="/Profile">
            <p> Profile </p>{" "}
          </NavLink>{" "}
        </AcntItem>{" "}
        <AcntItem>
          <NavLink to="/Settings">
            <p> Settings </p>{" "}
          </NavLink>{" "}
        </AcntItem>{" "}
      </AcntNav>{" "}
      <Route exact path="/Profile" /> <Route path="/Profile" />
      <Route path="/Settings" /> <Route path="/Settings" />
    </AcntCont>
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
)(SideBarAcnt);
