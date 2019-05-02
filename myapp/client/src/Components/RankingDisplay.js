import React, {Component} from "react"
import Ranks from './Ranks'
import '../Styles/RankingDisplay.css';

class RankingDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
        }
    }

    updateData(inData) {
        this.setState({
            data: inData,
        });
    }

    render() {
        return(
            <div className="rankingDisplayContainer">
                Ranking Display Goes Here!
                <Ranks data={this.state.data} />
            </div>
        );
    }
}

export default RankingDisplay;