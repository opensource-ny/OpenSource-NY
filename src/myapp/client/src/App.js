import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then( res => { 
        this.setState({data: res.express},
        console.log("This ran")
      )})
      .catch( err => console.log(err) );
  }

  // Fetches our GET route from the express server. (Note the route we are fetching matches the GET route from server.js)
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    console.log("calling back end happened");
    if( response.status !== 200 ) {
      throw Error(body.message)
    }

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>

        {/* Render the newly fetched data insdie of this.state.data */}
        <p className="App-intro">Something here:{this.state.data}</p>
      </div>
    );
  }
}

export default App;
