import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home/Home';
import ViewImg from './components/ViewImg/ViewImg.js';
import Login from './components/Login/Login.js';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/data" exact component={ViewImg} />
    </Router>
  );
}

export default App;
