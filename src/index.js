import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory} from 'react-router';
import App from './App';
import './index.css';
import DoerSignUp from './DoerSignUp';
import DonorSignUp from './DonorSignUp';
import DoerProfile from './DoerProfile';
import DonorProfile from './DonorProfile'
import doerLogin from './doerLogin';
import donorLogin from './donorLogin';

ReactDOM.render(
  <Router history={hashHistory}>
  <Route  path="/" component={App}/>
    <Route path="/DoerSignUp" component={DoerSignUp}/>
    <Route path="/DonorSignUp" component={DonorSignUp}/>
    <Route path="/donors/:name" component={DonorProfile}/>
    <Route path="/doers/:name" component={DoerProfile}/>
    <Route path="/doerLogin" component={doerLogin}/>
    <Route path="/donorLogin" component={donorLogin}/>
</Router>,
  document.getElementById('root')
);
