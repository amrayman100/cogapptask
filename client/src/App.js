import React, { Component } from 'react';
import './App.css';
import MainRoutes from './MainRoutes'
import MainMenu from './MainMenu';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      len: 0,
      isLoaded: false
    
    };

    }
  



  render() {
    return (
      <div className="App">
        <MainMenu/>
       <MainRoutes/>
      </div>
    );
  }
}

export default App;
