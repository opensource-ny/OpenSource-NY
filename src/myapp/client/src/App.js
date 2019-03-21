import React, { Component } from 'react';
import './App.css';
import HeaderImg from './Components/Header'

class App extends Component {
  state = {
    data: null,
    repoName: '',       // Expects this form: 'Github_user_name/repo_name' without the quotes
    error: null,
    loading: false,
    githubPRsData: []
  }

  resetState() {
    this.setState({
      data: null,
      repoName: '',       
      error: null,
      loading: false,
      githubPRsData: []
    })
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then( res => { 
        this.setState({data: res.express},
        //console.log("This ran")
      )})
      .catch( err => console.log(err) );
  }

  // Fetches our GET route from the express server. (Note the route we are fetching matches the GET route from server.js)
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    //console.log("calling back end happened");
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
    if( (value.split("/").length - 1) === 1 ) { 
      //console.log(value);
      this.setState({
        repoName: value,
        error: null
      });
    } else {  /* invalid pathname */
      try{
        throw new Error('Invalid repo name');
      } 
      catch(error) {
        this.setState({
          repoName: '',
          error: error
        });
      };
      
    }
    
  }

  handleRepoSubmit() {// if repo dones't exist?
    //console.log(this.state.repoName);

    this.setState({ loading: true });

    fetch(`https://api.github.com/repos/${this.state.repoName}/pulls?state=all`).then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(`Cannot find any data on repo ${this.state.repoName}`);
      }
    }).then(pullData => {
      //console.log(pulls);
      this.setState({ 
        githubPRsData: pullData,
        loading: false
      })
    }).catch(error => {
      this.setState({
        error: error,
        loading: false
      })
    });

  }

  reportPRList() {
    return(
        this.state.githubPRsData.map( githubPRsData => (
          <div key={githubPRsData.id}>
            <h3><a href={githubPRsData.url}>{githubPRsData.id}</a></h3>
            <p>{githubPRsData.title}</p>
          </div>
        ))
    );
  }

  render() {
    return (
      <div className="App">
        <HeaderImg/>
        {/* Render the newly fetched data insdie of this.state.data */}
        <p className="App-intro">Something here:{this.state.data}</p>

        <div className="PRs">
          <input className={(this.state.error ? '' : 'Warning')} type="text" placeholder="opensource-ny/OpenSource-NY" onChange={this.handleRepoChange.bind(this)}></input>
          <input type="submit" disabled={this.state.error} onClick={this.handleRepoSubmit.bind(this)}></input>
        
          {this.state.loading ? <h2>loading ...</h2> : ''}
          {this.state.error ? <h2>{this.state.error.message}</h2> : ''}
          {this.reportPRList()}

        </div>

      </div>
    );
  }
}

export default App;
