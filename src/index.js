import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory} from 'react-router';
import App from './App';
import './index.css';
import DoerSignUp from './DoerSignUp'

ReactDOM.render(
  <Router history={hashHistory}>
  <Route  path="/" component={App}/>
  <Route path="/:DoerSignUp" component={DoerSignUp}/>
</Router>,
  document.getElementById('root')
);
