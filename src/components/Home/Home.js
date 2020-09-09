import React, { Component, Fragment } from 'react';
import Canvas from '../Canvas/canvas';
import Styles from './Home.js';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state={
        delete: false,
        canvas: "myCanvas"
      }
    }

  onOpenProfile(){
  }

    render() {
      return (
        <div className="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button type="button" onClick={() => this.onOpenProfile()} >
            <img src={require('../../assets/profile.png')} style={{ height: "8vh", border: " 0px" }}/>
            </button>
          </nav>
          <div className="progress progress-bar-vertical">
            <div className="progress-bar" role="progress-bar"> N of 300</div>
          </div>
          <Canvas/>
        </div>
      );
    }
  }
  export default Home;