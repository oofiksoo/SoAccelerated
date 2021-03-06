import React from "react";
import Styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
import SideBarAcnt from "./SideBarAcnt";

const SideBarCont = Styled.div`
display:flex;
flex-direction:column;
align-items:center;
background-color:black;
border-radius:0 0 5rem 0;
padding: 10%;
height:85vh;
width:200px;
`;

const SideBarItem = Styled.div`
display:flex;
  justify-content:center;
  align-items:center;
  padding: 1rem;
  margin:.3rem;
  height: .6rem;
  width: 70%;
  color: black;
  border 2px solid white;
  border-radius:.5rem;
  white-space:nowrap;
  cursor:pointer;
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
    font-size:1rem;
  }
  a{
    text-decoration:none;
  }
`;
const AcntCont = Styled.div`
display:flex;
`;

function SideBar() {
  return (
    <SideBarCont>
      <AcntCont>
        <SideBarAcnt />
      </AcntCont>
      <SideBarItem>
        <NavLink to="/projects">
          <p> My Projects </p>
        </NavLink>
      </SideBarItem>
      <SideBarItem>
        <NavLink to="">
          <p> My Opportunities </p>
        </NavLink>
      </SideBarItem>
      <SideBarItem>
        <NavLink to="/">
          <p> My Accelleration </p>
        </NavLink>
      </SideBarItem>
      <SideBarItem>
        <NavLink to="/">
          <p> More </p>
        </NavLink>
      </SideBarItem>
      <SideBarItem>
        <NavLink exact to="/dashboard">
          <p> Home </p>
        </NavLink>
      </SideBarItem>
      <Route exact path="/" />
    </SideBarCont>
  );
}
export default SideBar;
