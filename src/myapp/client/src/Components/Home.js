import React, {Component} from "react"
import PullRequest from './PullRequest'
import PRdisplay from './PRdisplay'
import '../Styles/App.css';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <div className="content">
        <PRdisplay/>
      </div>
    )
  }
}

export default Home