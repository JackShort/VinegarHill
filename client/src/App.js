import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Particles from 'react-particles-js';
import DocumentTitle from 'react-document-title';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
