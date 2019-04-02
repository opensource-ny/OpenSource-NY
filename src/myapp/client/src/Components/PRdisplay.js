import React, {Component} from "react"
import PullRequest from './PullRequest'
import '../Styles/PRdisplay.css';

class PRdisplay extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: null,
      repoName: '',       // Expects this form: 'Github_user_name/repo_name' without the quotes
      dataValid: false,
      loading: false,
      githubPRsInfo: [],
      error: "",
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

  handleDataChange(event) { // opensource-ny/OpenSource-NY
    //Validation, passes if it's this form: 'Github_user_name/repo_name' without the quotes
    let value = event.target.value;
    let better_value = value.replace(/ /g, '')
    if( !value.includes('/') ) {      // must also check that it only has one instance of it
      console.log(better_value);
      this.setState({
        repoName: better_value,
        dataValid: false
      });
    } else {
      this.setState({
        repoName: better_value,
        dataValid: true
      });
    }
    
  }

  handleDataSubmit(){ // if repo dones't exist?
    console.log(this.state.repoName);
    let repository = this.state.repoName.replace(/ /g, "")
    this.setState({
        repoName: repository,
        loading: true
    })

    const pulls = fetch(`https://api.github.com/repos/${this.state.repoName}/pulls?state=all`).then(res => {
      return res.json();
    }).then( pulls => {
      //console.log(pulls);
      if(pulls.message === "Not Found"){
        this.setState({
          error: pulls.message,
          loading: false,
        })
      } else {
        this.setState({ 
          error: "",
          githubPRsInfo: pulls,
          loading: false
        })
      }
    })
    .catch((error) => {
      this.setState({
        error: error
      })
    })

  }

  handleKeyPress(e) {
    if(e.key === 'Enter' && this.state.dataValid) {
      this.handleDataSubmit();
    }
  }

  render(){
    let content
    if(this.state.error === ""){
      console.log(this.state.githubPRsInfo)
      content = this.state.githubPRsInfo.map((githubPRsInfo) => (
          <PullRequest key={githubPRsInfo.id} content={githubPRsInfo}/>
        )
      )
    } else {
      content = <div>
        Error: {this.state.repoName} is invalid repository name.
      </div>
    }

    return(
        <div className="PRs">
          <div className="PullContainer">
            <div className="inputBox">
                <input className={(this.state.dataValid ? 'good' : 'warning')} type="text" placeholder="opensource-ny/OpenSource-NY" value={this.state.repo} onChange={this.handleDataChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}></input>
                <input className="submitBtn" type="submit" disabled={!this.state.dataValid} onClick={this.handleDataSubmit.bind(this)}></input>
            </div>
            <hr />
            {this.state.loading ? <h2>loading</h2> : <div></div>}
            {content}
          </div>
        </div>
    )
  }
}

export default PRdisplay