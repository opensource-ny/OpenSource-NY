import React, {Component} from 'react'
import '../Styles/PullRequest.css'

class PullRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            PRnumber: this.props.content.id,
            PRtitle: this.props.content.title,
            PRlink: this.props.content.url,
            PRstatus: this.props.content.status,
            PRmerge: this.props.content.merged_at
        }
    }

    render(){
        let merge_status
        if(this.state.PRstatus === "open"){
            merge_status = <div>
                Open
            </div>
        } else {
            if(this.state.PRmerge === null){
                merge_status = <div className="rejected">
                    Rejected
                </div>
            } else {
                merge_status = <div className="merged">
                    Merged
                </div>
            }
        }
        return(
            <div className="pullRequest">
                {merge_status}
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