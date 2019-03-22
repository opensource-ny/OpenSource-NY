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
      )})
      .catch( err => console.log(err) );
  }

  // Fetches our GET route from the express server. (Note the route we are fetching matches the GET route from server.js)
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if( response.status !== 200 ) {
      throw Error(body.message)
    }

    return body;
  }

  handleRepoChange(event) {
    this.resetState();
    const value = event.target.value;

    if( (value.split("/").length - 1) === 1 ) { 
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

  handleRepoSubmit() {
    this.setState({ loading: true });

    fetch(`https://api.github.com/repos/${this.state.repoName}/pulls?state=all`).then(response => {
      if(response.ok) {
        return response.json();   // This object if an json which contain an array of PR in json format.
      } else {
        throw new Error(`Cannot find any data on repo ${this.state.repoName}`);
      }
    }).then(pullData => {    // Does the first return from fetch gets transfered to this function? Because of the then? It does!
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

  /* 
   * reports a list of PR
   */
  reportPRList() {
    return(
        this.state.githubPRsData.map( eachElement => (
          <div key={eachElement.id}>
            <h3><a href={eachElement.url}>{eachElement.id}</a></h3>
            <p>{eachElement.title}</p>
            <p>----------------------------</p>
          </div>
        ))
    );
  }

  /* 
   * @arg eachElement should be a json object.
   * meant to be used by reportPRListDetailed's returning html stuff
   */
  reportMergeStatue( eachElement ) {
    if(eachElement.merged_at === null) {
      return('Rejected...');
    } else {
      return('Merged!');
    }
  }

  /* 
   * reports a list of PR and their merge status
   */
  reportPRListDetailed() {
    var githubPRsDataDetailed;

    githubPRsDataDetailed = this.state.githubPRsData.map(
      eachElement => (
          <div key={eachElement.id}>
            <h3><a href={eachElement.url}> {eachElement.id} </a></h3>
            <p> {eachElement.title} </p>
            <p> By: {eachElement.user.login} </p>
            <p> Merged status: { this.reportMergeStatue(eachElement) } </p>
            <p>----------------------------</p>
          </div>
      )
    );

    return githubPRsDataDetailed;
  }

  render() {
    return (
      <div className="App">
        <HeaderImg/>
        {/* Render the newly fetched data insdie of this.state.data */}
        <p className="App-intro">Something here:{this.state.data}</p>

        <div className="PRs">
          <input className={(this.state.error ? 'Warning' : '')} type="text" placeholder="opensource-ny/OpenSource-NY" onChange={this.handleRepoChange.bind(this)}></input>
          <input type="submit" disabled={this.state.error} onClick={this.handleRepoSubmit.bind(this)}></input>  {/* Also make it on enter key */}
        
          {this.state.loading ? <h2>loading ...</h2> : ''}
          {this.state.error ? <h2>{this.state.error.message}</h2> : ''}
          {this.reportPRListDetailed()}

        </div>

      </div>
    );
  }
}

export default App;
