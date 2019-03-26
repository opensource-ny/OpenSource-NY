import React , {Component} from 'react';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: "Open Source NY"
        }
    }

    render(){
        return(
            <div className = "home">
                <div>{this.state.title}</div>
                <div>Home</div>
            </div>
        )
    }
}

export default Home