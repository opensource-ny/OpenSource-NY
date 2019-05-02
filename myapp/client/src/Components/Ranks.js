import React, {Component} from 'react'
import '../Styles/Ranks.css'

class Ranks extends Component{

    constructor(props){     //Assumes props to only contain a json formated PRPullData
        super(props);
        this.state = {
            data: this.props.data,
        }
    }

    render() {
        return(
            <div className="rankList">  
                Ranking Stats: '{this.state.data}'
            </div>
        );
    }
}

export default Ranks;