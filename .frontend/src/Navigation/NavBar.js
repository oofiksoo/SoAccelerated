import React from "react";
import { connect } from "react-redux";
import Styled from "styled-components";
import { Link, Route } from "react-router-dom";
import Logo from "./logo.js";
import { userLogout } from "../actions/actionCreators";
const NavBarContainer = Styled.div`
display:flex;
background-color:black;
padding:1%;
justify-content:flex-end;
height:50px;
`;
const NavBarItem = Styled.div`
  display:flex;
  justify-content:space-around;
  align-items:center;
  padding: 0.5rem;
  margin: .5rem 1.3rem;
  width:6%;
  color: black;
  border: 2px solid white;
  cursor:pointer;
  border-radius:.5rem;
  :hover{
    background-color:white;
    color:black;
    p{
      color:black;
    }
    }
  p{
    text-decoration:none;
    color:white;
    font-size:.7rem;
    white-space: nowrap;
  }
  a{
    text-decoration:none;
  }
`;

function NavBar(props) {
  return (
    <NavBarContainer>
      <Logo />
      <NavBarItem>
        <Link to="/Register">
          <p>Register</p>
        </Link>
      </NavBarItem>
      <NavBarItem>
        <Link to="/Login">
          <p>Login</p>
        </Link>
      </NavBarItem>
      <NavBarItem>
        <Link to="/logout" onClick={() => props.userLogout()}>
          <p>Log Out</p>
        </Link>
      </NavBarItem>
      <Route exact path="/" />
    </NavBarContainer>
  );
}
const mapStateToProps = state => {
  return {
    username: state.username,
    projects: state.projects,
    userid: state.userid,
    logintransaction: false,
    projecttransaction: false,
    token: state.token
  };
};
export default connect(mapStateToProps, { userLogout })(NavBar);
