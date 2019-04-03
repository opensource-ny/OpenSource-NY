import React, { Component } from 'react';
import './Styles/App.css';
import HeaderImg from './Components/Header'
import Home from './Components/Home'

class App extends Component {

  render() {
    return (
      <div className="App">
        <HeaderImg/>
        {/* Render the newly fetched data insdie of this.state.data */}
        <Home/>
      </div>
    );
  }
}

export default App;
