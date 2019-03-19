import React, { Component } from 'react';
import './App.css';
import HeaderImg from './Header'

class App extends Component {
  state = {
    data: null,
    repoName: '',       // Expects this form: 'Github_user_name/repo_name' without the quotes
    repoValid: false,
    loading: false,
    githubPRsInfo: []
  }

  resetState() {
    this.setState({
      data: null,
      repoName: '',       
      repoValid: false,
      loading: false,
      githubPRsInfo: []
    })
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then( res => { 
        this.setState({data: res.express},
        console.log("This ran")
      )})
      .catch( err => console.log(err) );
  }

  // Fetches our GET route from the express server. (Note the route we are fetching matches the GET route from server.js)
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    console.log("calling back end happened");
    if( response.status !== 200 ) {
      throw Error(body.message)
    }

    return body;
  }

  handleRepoChange(event) {
    this.resetState();
    // Validation, passes if it's this form: 'Github_user_name/repo_name' without the quotes
    // Validation, checks if repo is accessible
    const value = event.target.value;
    //if( !value.includes('/') ) {      // must also check that it only has one instance of it
    if( (value.split().length - 1) === 1 ) { 
      console.log(value);
      this.setState({
        repoName: value,
        repoValid: false
      });
    } else if(false/* valid pathname */) {

    } else {
      this.setState({
        repoName: value,
        repoValid: true
      });
    }
    
  }

  handleRepoSubmit() {// if repo dones't exist?
    console.log(this.state.repoName);

    this.setState({ loading: true });

    const pulls = fetch(`https://api.github.com/repos/${this.state.repoName}/pulls?state=all`).then(res => {
      return res.json();
    }).then( pulls => {
      //console.log(pulls);
      this.setState({ 
        githubPRsInfo: pulls,
        loading: false
      })
    } );

  }

  reportPRList() {
    {
      console.log(this.state.githubPRsInfo.length);
      // if map (contain info about pr) is empty, have it output some message about it
      if(this.state.githubPRsInfo.length !== undefined) {
        return(
            this.state.githubPRsInfo.map( githubPRsInfo => (
              <div key={githubPRsInfo.id}>
                <h3><a href={githubPRsInfo.url}>{githubPRsInfo.id}</a></h3>
                <p>{githubPRsInfo.title}</p>
              </div>
            ))
        );
      } else {
        return(
          <h3>
            No information!
          </h3>
        );
      }
    }
  }

  render() {
    return (
      <div className="App">
        <HeaderImg/>
        {/* Render the newly fetched data insdie of this.state.data */}
        <p className="App-intro">Something here:{this.state.data}</p>

        <div className="PRs">
          <input className={(this.state.repoValid ? '' : 'Warning')} type="text" placeholder="opensource-ny/OpenSource-NY" value={this.state.repo} onChange={this.handleRepoChange.bind(this)}></input>
          <input type="submit" disabled={!this.state.repoValid} onClick={this.handleRepoSubmit.bind(this)}></input>
        
          {this.state.loading ? <h2>loading</h2> : ''}
          {
            // if map (contain info about pr) is empty, have it output some message about it
            /* if(this.state.githubPRsInfo.length !== 0) {
              this.state.githubPRsInfo.map( githubPRsInfo => (
                <div key={githubPRsInfo.id}>
                  <h3><a href={githubPRsInfo.url}>{githubPRsInfo.id}</a></h3>
                  <p>{githubPRsInfo.title}</p>
                </div>
              ))
            } */
            
          }
          {this.reportPRList()}

        </div>

      </div>
    );
  }
}

export default App;
