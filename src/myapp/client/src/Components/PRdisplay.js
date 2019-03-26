import React, {Component} from "react"
import PullRequest from './PullRequest'
import '../Styles/App.css';

class PRdisplay extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: null,
      repoName: '',       // Expects this form: 'Github_user_name/repo_name' without the quotes
      dataValid: false,
      loading: false,
      githubPRsInfo: []
    }

    this.handleDataChange = this.handleDataChange.bind(this)
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

  handleDataChange(event) {
    //Validation, passes if it's this form: 'Github_user_name/repo_name' without the quotes
    const value = event.target.value;
    if( !value.includes('/') ) {      // must also check that it only has one instance of it
      console.log(value);
      this.setState({
        repoName: value,
        dataValid: false
      });
    } else {
      this.setState({
        repoName: value,
        dataValid: true
      });
    }
    
  }

  handleDataSubmit(){ // if repo dones't exist?
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

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      this.handleDataSubmit();
    }
  }

  render(){
    return(
        <div className="PRs">
          <div className="PullContainer">
            <input className={(this.state.dataValid ? '' : 'Warning')} type="text" placeholder="opensource-ny/OpenSource-NY" value={this.state.repo} onChange={this.handleDataChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}></input>
            <input type="submit" disabled={!this.state.dataValid} onClick={this.handleDataSubmit.bind(this)}></input>
            {this.state.loading ? <h2>loading</h2> : ''}
            {
              this.state.githubPRsInfo.map( githubPRsInfo => (
                  <PullRequest key={githubPRsInfo.id} content={githubPRsInfo}/>
                )
              )
            }
          </div>
        </div>
    )
  }
}

export default PRdisplay