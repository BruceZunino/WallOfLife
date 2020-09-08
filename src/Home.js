import React, { Component, Fragment } from 'react';
import './App.css';
import Canvas from './components/canvas';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state={
        delete: false,
        canvas: "myCanvas"
      }
    }
  
    render() {
      return (
        <div>
          <Fragment>
            <h3 style={{ textAlign: 'center' }}>Draw here below</h3>
            <div className="main">
              <div className="color-guide">
              </div>
              <Canvas/>
            </div>
          </Fragment>
        </div>
      );
    }
  }
  export default Home;