import React, {Component} from "react"
import PullRequest from './PullRequest'
import '../Styles/PRdisplay.css';

class PRdisplay extends Component {

  constructor(props){
    super(props);

    this.state = {
      data: null,
      repoName: '',       // Expects this form: 'Github_user_name/repo_name' without the quotes
      githubUserName: '',
      error: null,
      loading: this.props.loading,
      githubPRsData: this.props.githubPRsData,
    }
  }

  resetFetchData() {
    this.setState({
      data: null,
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

  handleRepoChange(event) { // opensource-ny/OpenSource-NY
    //Validation, passes if it's this form: 'Github_user_name/repo_name' without the quotes
    let value = event.target.value;
    let better_value = value.replace(/ /g, '')  // strips white space, but should really remove leading and trailing white spaces

    if( (value.split("/").length - 1) === 1 ) {   // Checks for only one instance of '/'
      this.setState({
        repoName: better_value,
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

  handleInputChange(event){ 
    if( event.target.name === 'repoName' ) {
      this.handleRepoChange(event);
      return;
    }

    let value = event.target.value;               // strips white space, but should really remove leading and trailing white spaces
    let better_value = value.replace(/ /g, '')
    this.setState({   // For now assumes if input field refers to name == 'githubUserName'
      [event.target.name]: better_value
    });
  }

  handleRepoSubmit() {
    this.resetFetchData();
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
      });

      this.props.updateScoreBoard(this.state.githubPRsData);
    }).catch(error => {
      this.setState({
        error: error,
        loading: false
      })
    });
  }

  /* parse an array of json objects describing PR from github based on a condition
   * returns an array of json objects based on condition
   * returns the exact array as original if none of the condition matches
   * if key is undefined or null or empty string, return the original array as it is
   */
  parseGithubPRJson( githubPRJsonSet = this.githubPRsData, condition, key ) {
    var parsedPRSet = [];

    if( key === undefined || key === null || key === '' ) {
      return githubPRJsonSet;
    }

    if( condition === 'byAll' ) {
      return githubPRJsonSet;
    }

    if( condition === 'byName' ) {
      parsedPRSet = githubPRJsonSet.filter( eachElement => (
        eachElement.user.login === key
      ));
    }

    if( condition === 'byMergeStatus' && key === 'merged' ) {
      parsedPRSet = githubPRJsonSet.filter( eachElement => (
        eachElement.merged_at !== null
      ));
    }

    return parsedPRSet;
  }

  /* 
   * reports a list of PR base on the input array of github PR json objects
   */
  reportPRList( dataPR ) {
    if( dataPR === undefined ) {
      return(
        <div><h3>Array was undefined</h3></div>
      );
    }

    if( dataPR.length === 0 ) {
      return(
        <div><h3>Found no data</h3></div>
      );
    }

    return(
        dataPR.map( eachElement => (
          <PullRequest key={eachElement.id} content={eachElement}/>
        ))
    );
  }

  /* 
   * @arg eachElement should be a json object.
   * meant to be used by reportPRListDetailed's returning html stuff
   */
  reportMergeStatue( eachElement ) {
    if(eachElement.state === 'open') {
      return('Open');
    }
    
    if(eachElement.merged_at === null) {
      return('Rejected...');
    } else {
      return('Merged!');
    }
  }

  /* 
   * reports a list of PR and their merge status base on the input array of github PR json objects
   */
  reportPRListDetailed( dataPR ) {
    if( dataPR === undefined ) {
      return(
        <div><h3>Array was undefined</h3></div>
      );
    }

    if( dataPR.length === 0 ) {
      return(
        <div><h3>Found no data</h3></div>
      );
    }

    var githubPRsDataDetailed;

    githubPRsDataDetailed = dataPR.map(
      eachElement => (
        <PullRequest key={eachElement.id} content={eachElement}/>
      )
    );

    return githubPRsDataDetailed;
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      this.handleRepoSubmit();
    }
  }

  render(){
    let content;
    if(this.state.error === null){
      /* console.log(this.state.githubPRsData) */
      content = this.reportPRListDetailed( this.parseGithubPRJson(this.state.githubPRsData, 'byName', this.state.githubUserName) )
      /* content = this.state.githubPRsData.map((githubPRsData) => (
          <PullRequest key={githubPRsData.id} content={githubPRsData}/>
        )
      ) */
    } else {
      content = <div>
        <h2>{this.state.error.message}</h2>
        Error: {this.state.repoName} is invalid repository name.
      </div>
    }

    return(
        <div className="PRs">
          <div className="PullContainer">
            <div className="inputBox">

                <input className={(this.state.error ? 'warning' : 'good')} 
                  name="repoName"
                  type="text" 
                  placeholder="Enter Github repository name here" 
                  onChange={this.handleInputChange.bind(this)} 
                  onKeyPress={this.handleKeyPress.bind(this)}>
                </input>                                       {/* how to disable this when this.state.error is not null? */}

                <input className={(this.state.error ? 'warning' : 'good')} 
                  name="githubUserName"
                  type="text" 
                  placeholder="Enter Github username here" 
                  onChange={this.handleInputChange.bind(this)} 
                  onKeyPress={this.handleKeyPress.bind(this)}>
                </input>                                         {/* how to disable this when this.state.error is not null? */}

                <input className="submitBtn"
                  type="submit" 
                  value="Search"
                  disabled={this.state.error} 
                  onClick={this.handleRepoSubmit.bind(this)}>
                </input> 

            </div>
            
            <hr />
            {/* In the future, should only update output when submit button is hit or enter key is hit on input field. As of right now it constantly updates, which may not be good for us. */}
            {this.state.loading ? <h2>loading</h2> : <div></div>}
            {content}

        </div>
      </div>
    )
  }
}

export default PRdisplay