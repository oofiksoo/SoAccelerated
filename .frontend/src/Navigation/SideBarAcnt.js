import React from "react";
import Styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
import logo from "./logo.svg";

const AcntCont = Styled.div`
display:flex;
flex-direction:column;
padding: 20% 0;
h3{
    font-size:.7rem;
    text-align:center;
    color:white;
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
    font-size:.56rem;
    border:2px solid white;
    border-radius: 1rem;
    padding:.2rem .3rem;
}
`;
const AcntNav = Styled.div`
display:flex;
`;
const AcntItem = Styled.div`
margin:.3rem;
`;

function SideBarAcnt() {
  return (
    <AcntCont>
      <h3> Account Info: </h3>{" "}
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
export default SideBarAcnt;
