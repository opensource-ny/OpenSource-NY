import React, {Component} from 'react'
import '../Styles/RankElement.css'

class RankElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            name: this.props.name,
            score: this.props.score,
        }
    }

    render() {

        return(
            <div className="rankElement">
                <div className="ranks">
                    #{this.state.rank + 1} 

                    {this.state.name}

                    {this.score}
                </div>

                {/* <div className="username">
                    {this.state.name}
                </div>

                <div className="score">
                    {this.score}
                </div> */}
            </div>
        );
    }
}

export default RankElement