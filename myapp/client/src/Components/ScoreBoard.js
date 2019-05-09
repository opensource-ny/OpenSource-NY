import React, {Component} from "react"
import Ranks from './Ranks'
import '../Styles/ScoreBoard.css';

class ScoreBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: this.props.error,
            loading: this.props.loading,
            githubPRsData: this.props.githubPRsData,
        }
    }

    render() {
        let content;
        if(this.state.error === null){
            content = <Ranks githubPRsData={this.props.githubPRsData} scoreOption="mergedPR" />
        } else {
            content = <div>
                <h2>{this.state.error.message}</h2>
                Error: Something went wrong.
            </div>
        }

        return(
            <div className="scoreBoardContainer">
                Score board Goes Here!
                {this.state.loading ? <h2>loading</h2> : <div></div>}
                {content}
            </div>
        );
    }
}

export default ScoreBoard;