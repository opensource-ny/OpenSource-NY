import React, { Component } from 'react';
import './Styles/App.css';
import HeaderImg from './Components/Header'
import Home from './Components/Home'
import Logo from './Images/OSNYdark.svg'

class App extends Component {

  render() {
    return (
      <div className="appBG">
        <HeaderImg/>
        <p className="instruct"><b>Instructions for the first field: </b> 
          Please enter information in the format of <i>github_user_name/repo_name</i>
        </p>
        {/* Render the newly fetched data insdie of this.state.data */}
        <Home/>
        <img className="logoInBG" src={Logo} alt="logo"/>
        <p className="centeredText"><b>OSNY</b> App</p>
      </div>
    );
  }
}

export default App;
