import { Router, Route, hashHistory } from 'react-router';
import App from './App.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))
