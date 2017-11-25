import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Clock />
      </MuiThemeProvider>
    );
  }
}

export default App;
