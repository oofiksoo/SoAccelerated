import React from "react";
import Styled from "styled-components";
import { Form, Field, withFormik } from "formik";

import * as Yup from "yup";

import { connect } from "react-redux";

import * as actionCreators from "../actions/actionCreators";
const RegCont = Styled.div`
display:flex;
align-self:center;
justify-content:center;
flex-direction:column;
margin:5% auto;
background-color:black;
padding:1%;
width:60%;
color:white;
padding:1%;
border-radius:20px;
height:70vh;
h1{
  text-align:center;
}
h2{
  text-align:center;
}
`;
const RegisterContainer = Styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border-radius:20px;
p{
  text-align:center;
  color:white;
}
Form{
  border:2px solid white;
  margin:5%;
  padding:5%;
  border-radius:2%;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.registerBTN{
  display:flex;
  align-self:center;
  justify-content:center;
  padding:4%;
  margin:5%;
  height:20%;
  background-color:black;
  color:white;
  border:2px solid white;
  border-radius:5px;
  :hover{
  background-color:white;
  color:#0099cc;
  }
}
`;
const SignUp = ({ errors, touched, values, userSignup, history }) => {
  const handleSignupSubmit = e => {
    e.preventDefault();

    userSignup(values, history);
  };

  return (
    <RegCont>
      <h1>Welcome To SoAccelerated!</h1>
      <h2>Please Create An Account To Continue:</h2>
      <RegisterContainer>
        <Form className="signup-form" onSubmit={handleSignupSubmit}>
          <label className="signup-label">
            <p> Create Username: </p>{" "}
          </label>
          <Field
            className="signup-field"
            type="text"
            name="username"
            placeholder="username"
          />
          {touched.username && errors.username && (
            <span className="error"> {errors.username} </span>
          )}
          <label className="signup-label">
            {" "}
            <p> Create Password: </p>
          </label>
          <Field
            className="signup-field"
            type="password"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <span className="error"> {errors.password} </span>
          )}
          <button className="registerBTN" type="submit">
            Register
          </button>
        </Form>
      </RegisterContainer>
    </RegCont>
  );
};

const FormikSignup = withFormik({
  mapPropsToValues({ username, email, password }) {
    return {
      username: username || "",

      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string()

      .min(2, "Need at least 2 characters")

      .max(24, "No more than 24 characters")

      .required("User Name is required"),

    password: Yup.string()

      .min(4, "Need at least 4 characters")

      .required("Password is required")
  })
})(SignUp);

export default connect(state => state, actionCreators)(FormikSignup);
