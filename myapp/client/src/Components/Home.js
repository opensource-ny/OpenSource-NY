import React, {Component} from "react"
import PRdisplay from './PRdisplay'
import RankingDisplay from './RankingDisplay'
import '../Styles/App.css';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: null,
    }
  }

  updateRank() {
    let contentTruck;
    contentTruck = PRdisplay.parseGithubPRJson("byAll");
    console.log(contentTruck);
    console.log("updateRank ran");
  }

  render(){
    return(
      <div className="content">
        <PRdisplay />
        <RankingDisplay data="yiyiyi"/>
      </div>
    )
  }
}

export default Home