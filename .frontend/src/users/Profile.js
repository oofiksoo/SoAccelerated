import React, { Component } from "react";
import Styled from "styled-components";
import { connect } from "react-redux";

import { getProfile, editProfile } from "../actions/actionCreators";
const ProfilePage = Styled.div`
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
const DataStatusContainer = Styled.div`
display:flex;
flex-direction:column;
margin-left:150px;
padding:1%;
width:80%;
justify-content:center;
border-radius:20px;
}
`;
const ProfileContainer = Styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border-radius:20px;
p{
  text-align:center;
  color:white;
}
form{
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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiletransaction: false,
      errors: [],
      touched: [],
      values: []
    };
  }
  componentDidMount() {
    this.props.getProfile(this.props.userid);
  }

  render() {
    if (!this.props.profiletransaction) {
      return (
        <DataStatusContainer>
          <h1> Please Wait.... </h1>
          <h3> Loading Your Profile Data </h3>
        </DataStatusContainer>
      );
    }

    return (
      <ProfilePage>
        <h2>Update profile settings below:</h2>
        <ProfileContainer>
          <form className="profile-form">
            <p>Username:{this.props.username}</p>
            <label className="profile-label">
              <p> Company: </p>
            </label>
            <input
              className="profile-field"
              type="text"
              name="company"
              placeholder={this.props.profile.company}
            />
            {this.state.touched.company && this.state.errors.company && (
              <span className="error"> {this.state.errors.company} </span>
            )}
            <label className="signup-label">
              <p> Change Password: </p>
            </label>
            <input
              className="profile-field"
              type="password"
              name="password"
              placeholder="Password"
            />
            {this.state.touched.password && this.state.errors.password && (
              <span className="error"> {this.state.errors.password} </span>
            )}
            <button className="registerBTN" type="submit">
              Submit
            </button>
          </form>
        </ProfileContainer>
      </ProfilePage>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    profile: state.profile,
    userid: state.userid,
    logintransaction: state.logintransaction,
    projecttransaction: state.projecttransaction,
    profiletransaction: state.profiletransaction,
    token: state.token
  };
};
export default connect(mapStateToProps, { getProfile, editProfile })(Profile);
