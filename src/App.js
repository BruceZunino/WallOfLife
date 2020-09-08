import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import ViewImg from './components/ViewImg/ViewImg.js';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/data" exact component={ViewImg} />
    </Router>
  );
}

export default App;
