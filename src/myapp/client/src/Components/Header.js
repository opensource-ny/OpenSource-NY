import React from "react"
import './App.css';
import Login from './Login'

function Header(){
    return(
        <div className="header">
            <p className="title">OpenSource NY App</p>
            <Login />
        </div>
    )
}

export default Header