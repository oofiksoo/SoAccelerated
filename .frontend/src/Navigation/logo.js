import React from "react";
import styled from "styled-components";
import logo from "./Logo.png";
const LgTxtCont = styled.div`
  display: flex;
`;
const LgBaseTxt = styled.div`
  img {
    position: absolute;
    left: 0%;
    top: 0.5%;
  }
  h2 {
    position: absolute;
    top: -1.4%;
    left: 4%;
    color: #00cc33;
    em {
      font-size: 1.2rem;
      color: #cc9900;
    }
    span {
      text-decoration: line-through;
      text-decoration-color: #cc9900;
    }
  }
  h4 {
    color: #00cc33;
    position: absolute;
    top: 0%;
    left: 5.5%;

    em {
      font-size: 1.2rem;
      color: #cc9900;
    }
  }
  .wrdsLft {
    position: absolute;
    top: 0%;
    left: 14%;
  }
`;

function Logo() {
  return (
    <LgTxtCont>
      <LgBaseTxt>
        <img src={logo} alt="logo" width="5%" />
        <h2>
          SOAccelerat<span>ed</span>
        </h2>{" "}
        <h4 className="wrdsRgt">
          <em> cial </em>
        </h4>
        <h4 className="wrdsLft">
          <em> ion </em>
        </h4>
      </LgBaseTxt>{" "}
    </LgTxtCont>
  );
}
export default Logo;
