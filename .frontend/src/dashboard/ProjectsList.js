import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectList } from "../actions/actionCreators";
import Styled from "styled-components";
const ProjectListContainer = Styled.div`
display:flex;
flex-direction:column;
margin-left:150px;
padding:1%;
width:80%;
justify-content:center;
border-radius:20px;
.addProjectBtn{
  display:flex;
  justify-content:center;
  white-space:nowrap;
  width:110px;
  height:50px;
  background-color:black;
  color:white;
  border:2px solid white;
  border-radius:10px;
  :hover{
  background-color:white;
  border:2px solid black;
  color:black;
  }
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
const ProjectCardContainer = Styled.div`
display:flex;
flex-wrap:wrap;
margin:1%;
justify-content:center;
}
`;
const ProjectCard = Styled.div`
display:flex;
flex-direction:column;
margin:1%;
justify-content:center;
border:2px solid white;
border-radius:20px;
}
`;

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projecttransaction: false
    };
  }
  componentDidMount() {
    this.props.getProjectList();
  }
  render() {
    if (!this.props.projecttransaction) {
      return (
        <DataStatusContainer>
          <h1> Please Wait.... </h1>
          <h3> Loading Your Project List </h3>
        </DataStatusContainer>
      );
    }
    return (
      <ProjectListContainer>
        <button className="addProjectBtn">Submit Project</button>
        <h1> My Projects: </h1>
        {console.log(this.props)}
        <ProjectCardContainer>
          {this.props.projects.map(project => (
            <ProjectCard key={project.id}>
              <h3> {project.project_name} </h3>
              <p>{project.project_description}</p>
            </ProjectCard>
          ))}
        </ProjectCardContainer>
      </ProjectListContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    username: state.username,
    projects: state.projects,
    userid: state.userid,
    logintransaction: state.logintransaction,
    projecttransaction: state.projecttransaction,
    token: state.token
  };
};
export default connect(mapStateToProps, { getProjectList })(ProjectList);
