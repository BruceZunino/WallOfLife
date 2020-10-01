import React, { Component, Fragment } from 'react';
import Canvas from '../Canvas/canvas';
import Styles from './Home.css';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state={
        createWall: false
      }
    }

  onOpenProfile(){
    alert("Abierto")
  }

  onCreateWall(){
    this.setState({ createWall: true });
  }

    render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <nav class="navbar navbar-expand-lg navbar-light bg-light col-lg-12">
              <button type="button" style={{ height: "8vh", border: " none" }} onClick={() => this.onOpenProfile()} >
              <img src={require('../../assets/profile.png')} style={{ height: "8vh", border: " none" }}/>
              </button>
            </nav>
          </div>
          <div className="row canvas">
            <Canvas/>
          </div>
          {/* <div className="progress progress-bar-vertical" style={{ transform: 'rotate(270deg)', width: '30%', position: 'absolute'}}>
            <div className="progress-bar" role="progress-bar" style={{ }}> N of 300</div>
          </div> */}
        </div>
      );
    }
  }
  export default Home;