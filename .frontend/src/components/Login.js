import React from "react";
import Styled from "styled-components";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
const LoginCont = Styled.div`
display:flex;
align-self:center;
justify-content:center;
flex-direction:column;
margin:5% auto;
background-color:#0099cc;
padding:1%;
width:60%;
color:white;
padding:1%;
border-radius:20px;
height:70vh;
h1{
  text-align:center;
}
`;
const LoginContainer = Styled.div`
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
.loginBtn{
  display:flex;
  align-self:center;
  justify-content:center;
  padding:2%;
  margin:5%;
  height:20%;
  width:30%;
  background-color:#0099cc;
  color:white;
  border:2px solid white;
  border-radius:5px;
  :hover{
  background-color:white;
  color:#0099cc;
  }
}
`;
const Login = ({ errors, touched, values, userLogin, history }) => {
  const handleLoginSubmit = e => {
    e.preventDefault();
    userLogin(values, history);
  };
  return (
    <LoginCont>
      <h1>Welcome To SoAccellerated!</h1>
      <LoginContainer>
        <Form className="login-form" onSubmit={handleLoginSubmit}>
          <label className="login-label">
            <p>USERNAME: </p>
          </label>
          <Field
            className="login-field"
            type="username"
            name="username"
            placeholder="username"
          />
          {touched.username && errors.username && (
            <span className="error"> {errors.username} </span>
          )}
          <label className="login-label">
            <p>PASSWORD: </p>
          </label>
          <Field
            className="login-field"
            type="password"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <span className="error"> {errors.password} </span>
          )}
          <button className="loginBtn"> Login </button>
        </Form>
      </LoginContainer>
    </LoginCont>
  );
};

const FormikLogin = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",

      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("username is required"),

    password: Yup.string()

      .min(4, "Need at least 4 characters")

      .required("Password is required")
  })
})(Login);

export default connect(state => state, actionCreators)(FormikLogin);
