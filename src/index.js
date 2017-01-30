import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory} from 'react-router';
import App from './App';
import './index.css';
import DoerSignUp from './DoerSignUp';
import DonorSignUp from './DonorSignUp';
import DoerProfile from './DoerProfile';

ReactDOM.render(
  <Router history={hashHistory}>
  <Route  path="/" component={App}/>
  <Route path="/DoerSignUp" component={DoerSignUp}/>
  <Route path="/doers/:name" component={DoerProfile}/>
  <Route path="/DonorSignUp" component={DonorSignUp}/>
  <Route path="/doers/:name" component={DoerProfile}/>
</Router>,
  document.getElementById('root')
);
