import React, { Component } from 'react';
import Styles from './Login.css'
import ViewImg from '../ViewImg/ViewImg'

class Login extends Component {
    constructor(props) {
      super(props);
      this.state={
      }
    }

    goHome(){
        window.location.href = '/home';
    }
  
    render() {
      return (
          <div className="container-fluid">
            <ViewImg/>
            <div className="row" style={{ height:'100vh', width: '100vw'}}>
                <form className="formLogin" style={{ position: 'absolute', left: '50%', top: '40%',  transform: 'translate(-50%, -50%)', backgroundColor: 'white', textAlign: '-webkit-center', width: '20vw', height: '35vh', borderRadius: '3%'}}>
                    <h1 style={{marginTop: '4vh'}}>Lorem Impsum</h1>
                    <p style={{marginTop: '6vh'}}>Lorem Impsum</p>
                    <div class=" passInput">
                      <input type="password" className="form-control passInput" style={{ width: '60%', marginTop: '2vh'}} id="Password" placeholder="Code"/>
                    </div>
                    <button type="button" className="btn btn-primary loginButton" style={{width: '50%', marginTop: '3vh'}} onClick={this.goHome}>ENTER</button>
                    <div>
                    </div>
                </form>
            </div>
          </div>
      );
    }
  }
  export default Login;