import React, { Component } from 'react';
import Styles from './Login.css'

class Login extends Component {
    constructor(props) {
      super(props);
      this.state={
      }
    }

    skipLogin(){
        window.location.href = '/home';
    }
  
    render() {
      return (
          <div className="container-fluid">
            <div className="row justify-content-center logoContainer">
                <img className="logo col-lg-5" src={require('../../assets/not.png')} />
            </div>
            <div className="row justify-content-center">
                <form className="formLogin">
                    <div class="form-group emailinput">
                    <input type="email" className="form-control emailInput col-lg-12" id="Email" aria-describedby="emailHelp" placeholder="Email"/>
                    </div>
                    <div class="form-group passInput">
                    <input type="password" className="form-control passInput col-lg-12" id="Password" placeholder="Password"/>
                    </div>
                    <button type="button" className="btn btn-primary loginButton col-lg-12" onClick={this.goHome}>Sing in</button>
                    <div>
                    {/* <a className="TextRegister">Don't have an account yet?</a> */}
                    <button type="button" className="btn btn-primary registerButton col-lg-12" onClick={this.goRegister}>Sign up</button>
                    </div>
                </form>
            </div>
            <div className="row">
                <button type="button offset-4" class="btn-lg btn-primary skipButton" onClick={ () => this.skipLogin()}>Skip Login</button>
            </div>
          </div>
      );
    }
  }
  export default Login;