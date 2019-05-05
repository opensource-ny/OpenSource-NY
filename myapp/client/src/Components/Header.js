import React from "react"
import '../Styles/Header.css';
import Logo from '../Images/icon.png'

function Header(){
    return(
        <div className="header">
            <p className="title">OpenSource NY App</p>
            <img src={Logo} alt="Icon"/>
        </div>
    )
}

export default Header