import React, { Component } from "react";
import { connect } from "react-redux";
import { displayUserList } from "../actions/actionCreators";
import Styled from "styled-components";
const UserListContainer = Styled.div`
display:flex;
flex-direction:column;
padding:1%;
width:80%;
background-color:#0099cc;
padding:1%;
justify-content:center;
border-radius:20px;
}
`;
const UserCard = Styled.div`
display:flex;
margin:1%;
width:20%;
justify-content:center;
border:2px solid white;
border-radius:20px;
}
`;
const UserCardContainer = Styled.div`
display:flex;
flex-wrap:wrap;
margin:1%;
justify-content:center;
}
`;
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertransaction: false
    };
  }
  componentDidMount() {
    this.props.displayUserList();
  }
  render() {
    if (!this.props.usertransaction) {
      return (
        <div className="status">
          <h3> Loading User Data </h3>
        </div>
      );
    }
    return (
      <UserListContainer>
        <h1> Registered Users: </h1>
        <UserCardContainer>
          {this.props.users.map(user => (
            <UserCard key={user.id}>
              <p> {user.username} </p>
            </UserCard>
          ))}
        </UserCardContainer>
      </UserListContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users,
    usertransaction: state.usertransaction
  };
};
export default connect(mapStateToProps, { displayUserList })(UserList);
