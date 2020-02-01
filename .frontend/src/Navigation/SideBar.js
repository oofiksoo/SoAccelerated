import React from "react";
import Styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
import SideBarAcnt from "./SideBarAcnt";

const SideBarCont = Styled.div`
display:flex;
flex-direction:column;
align-items:center;
background-color:#0099cc;
border-radius:0 0 5rem 0;
padding: 10% 0%;
height:80vh;
`;

const SideBarItem = Styled.div`
display:flex;
  justify-content:center;
  align-items:center;
  padding: 0.3rem;
  margin:.3rem;
  height: .6rem;
  width: 70%;
  color: #cc3300;
  border 2px solid white;
  border-radius:.5rem;
  white-space:nowrap;
  p{
    text-decoration:none;
    color:white;
    font-size:.7rem;
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
      </AcntCont>{" "}
      <SideBarItem>
        <NavLink exact to="/">
          <p> Home </p>{" "}
        </NavLink>{" "}
      </SideBarItem>{" "}
      <SideBarItem>
        <NavLink to="">
          <p> My Projects </p>{" "}
        </NavLink>{" "}
      </SideBarItem>{" "}
      <SideBarItem>
        <NavLink to="">
          <p> My Opportunities </p>{" "}
        </NavLink>{" "}
      </SideBarItem>{" "}
      <SideBarItem>
        <NavLink to="/">
          <p> My Accelleration </p>{" "}
        </NavLink>{" "}
      </SideBarItem>{" "}
      <SideBarItem>
        <NavLink to="/">
          <p> More </p>{" "}
        </NavLink>{" "}
      </SideBarItem>{" "}
      <Route exact path="/" /> <Route path="/symptoms" />
      <Route path="/strains" /> <Route path="/recomendations" />
      <Route path="/DisplayDispensary" />
    </SideBarCont>
  );
}
export default SideBar;
