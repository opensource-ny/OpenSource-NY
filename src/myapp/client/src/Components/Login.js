import React, {Component} from "react"
import './App.css'

class Login extends Component{
    constructor(){
        super()
        this.state={
            userName: "",
            passWord: ""
        }
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick(event){
        const{name, value} = event.target
        this.setState({[name]:value})
    }

    render(){
        return(
            <div>
                <form className="login">
                    <input
                        type = "text"
                        placeholder = "Username"
                        name = "userName"
                        value = {this.state.userName}
                        onChange = {this.handleClick}
                    />
                    
                    <input
                        type = "password"
                        placeholder = "Password"
                        name = "passWord"
                        value = {this.state.passWord}
                        onChange = {this.handleClick}
                    />

                    <button>Sign In</button>
                </form>
            </div>
        )
    }
}

export default Login