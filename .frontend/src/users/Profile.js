import React, { Component } from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { axiosWithAuthMultiForm } from "../utils/axiosWithAuthMultiForm";

import {
  getProfile,
  editProfile,
  getProfilePic
} from "../actions/actionCreators";
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
      profilepictransaction: false,
      errors: [],
      image_file: null,
      image_preview: "",
      touched: [],
      profile: [],
      values: []
    };
  }
  componentDidMount() {
    this.props.getProfile(this.props.userid);
    //this.props.getProfilePic(this.props.userid);
    console.log(this.props);
  }
  handleSubmit = e => {
    this.props.editProfile(this.props.userid);
    this.handleSubmitFile();
  };

  handleImagePreview = e => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];

    this.setState({
      image_preview: image_as_base64,
      image_file: [this.props.image_file, image_as_files]
    });
  };

  // Image/File Submit Handler
  handleSubmitFile = e => {
    if (this.state.image_file !== null) {
      e.preventDefault();
      let image_file = new FormData();
      image_file.append("file", this.state.image_file);

      axiosWithAuthMultiForm()
        .post(`/users/${this.props.userid}/image`, image_file)
        .then(res => {
          console.log(`Success` + res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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
          <form className="profile-form" onSubmit={this.handleSubmit}>
            <div>
              {/* image preview */}
              <img src={this.state.image_preview} alt="image preview" />

              {/* image input field */}
              <input
                type="file"
                name="file"
                onChange={this.handleImagePreview}
              />
              <label>Upload file</label>
              <input
                type="submit"
                onClick={this.handleSubmitFile}
                value="Submit"
              />
            </div>
            <p>Username:{this.props.profile.username}</p>
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
    image_file: state.image_file,
    image_preview: state.image_preview,
    username: state.username,
    profile: state.profile,
    userid: state.userid,
    logintransaction: state.logintransaction,
    projecttransaction: state.projecttransaction,
    profiletransaction: state.profiletransaction,
    profilepictransaction: state.profiletransaction,
    token: state.token
  };
};
export default connect(mapStateToProps, {
  getProfile,
  editProfile,
  getProfilePic
})(Profile);
