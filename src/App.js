import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Client from './graphql_client.js';
import star from './star.jpeg';

console.log(star);
function Repository(props){  
  if (props.repos!= undefined){
    const listItems = props.repos.map((repo) =>
    <li>{repo.name} <a href={repo.url}>{repo.name}</a>  Last updated {repo.updatedAt.substring(0,10)}  <img src= {star} alt="star" style={{width: 20,height: 20}}/> {repo.starCount}
    </li> 
  );
  
    return (
      <div className="List">
        <h3>{props.text}</h3>
         <ul>{listItems}</ul>
         
      </div>
  );
  }
else 
  { return null;}
}

function Info(props){
  return (
    <div className="Info">
          <br></br>
      <div className="UserInfo">
        <img className="Avatar"
             src={props.avatar.avatarUrl}
             alt={props.avatar.text} />
        <div className="UserInfo-name">
          <p>Github profile : {props.login}</p>
        </div>
      </div>
    </div>
  );
}

const avatar = {
    text: 'Hello buddy!',
    avatarUrl: 'http://placekitten.com/g/200/200'
};

const info = {
  text: "Check out my repositories : "};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: "",
      repos: []
    };
    this.processResponse = this.processResponse.bind(this);
    Client.query(query, this.processResponse);
  }

  processResponse(response){
    var edges = response.data.viewer.repositories.edges;
    var repos = [];
    var login = response.data.viewer.login;
    for (var i = 0; i < edges.length; i++) {
        var node = edges[i].node;
        var repo={};
        repo.name = node.name;
        repo.url = node.url;
        repo.starCount = node.stargazers.totalCount;
        repo.updatedAt = node.updatedAt;
        repos.push(repo);  
    }
    this.setState({
            login: login,
            repos: repos
        });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <div className="User-info">
          <Info login = {this.state.login} avatar={avatar}/>
        </div>
        <div className="Repository">
          <Repository repos={this.state.repos} text={info.text}/>       
        </div>
      </div>
    );
  }
}

var query = `{
  viewer {
    login
    repositories(first: 5, privacy: PUBLIC, orderBy: {field: CREATED_AT, direction: ASC}) {
      edges {
        node {
          id
          name
          url
          updatedAt
          stargazers {
            totalCount
          }
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
        }
      }
    }
  }
}`;

export default App;
