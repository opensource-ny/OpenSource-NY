import React, {Component} from 'react'
import '../Styles/PullRequest.css'

class PullRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            PRnumber: this.props.content.id,
            PRtitle: this.props.content.title,
            PRlink: this.props.content.url,
            PRstatus: "",
        }
    }

    render(){
        return(
            <div className="pullRequest">
                <div className="prNumber">
                    <a href={this.state.PRlink}>{this.state.PRnumber}</a>
                </div>
                {" "}
                <div className="prTitle">
                    {this.state.PRtitle}
                </div>
            </div>
        )
    }
}

export default PullRequest