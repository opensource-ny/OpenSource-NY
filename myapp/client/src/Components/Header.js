import React from "react"
import '../Styles/Header.css';
import Logo from '../Images/OSNY-Logov2.svg'

function Header(){
    return(
        <div>
            <div className="navBG">
                <div className="logoStyle">
                    <a href="."><b>OSNY</b> App</a>
                </div>
                <div className="optionStyle">
                    <a href="https://github.com/opensource-ny/OpenSource-NY">GitHub</a>
                    <a href="https://github.com/opensource-ny/OpenSource-NY/blob/master/README.md">About</a>
                </div>
                <a href=".">
                    <img className="logo" src={Logo} alt="Icon"/>
                </a>
            </div>
        </div>
        /*<div className="header">
            <p className="title">OpenSource NY App</p>
            <img src={Logo} alt="Icon"/>
        </div>*/
    )
}

export default Header