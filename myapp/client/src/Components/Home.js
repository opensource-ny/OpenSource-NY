import React, {Component} from "react"
import PRdisplay from './PRdisplay'
import ScoreBoard from './ScoreBoard'
import '../Styles/App.css';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      error: null,
      loading: false,
      githubPRsData: [],
    }
  }

  updateScoreBoard(githubPRsData) {
    this.setState({ githubPRsData: githubPRsData });
  }

  render(){
    return(
      <div className="content">
        <PRdisplay error={this.state.error} loading={this.state.loading} githubPRsData={this.state.githubPRsData} updateScoreBoard={this.updateScoreBoard.bind(this)} />
        <ScoreBoard error={this.state.error} loading={this.state.loading} githubPRsData={this.state.githubPRsData} />
      </div>
    )
  }
}

export default Home