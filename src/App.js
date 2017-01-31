import React, { Component } from 'react';
import { Link } from 'react-router';
import base  from './config';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import pic from './lifepathlogo.png';
import pic2 from './sadkids.jpg'
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Doers from './Doers'
import Donors from './Donors'
import AppBar from 'material-ui/AppBar';

const style = {
  margin: 12,
};

class App extends Component {
  constructor(){
    super()
    this.state = {
      open: false,
      open2: false,
      userProfile: '',
      userName: '',
      name: ''
    }
  }
  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});
  logIn() {
      base.authWithPassword({
          email: this.email.value,
          password: this.password.value
      }, this.authStateChanged.bind(this)).catch(err => console.error(err))
  }
  logOut() {
    this.setState({
        userName: ''
    })
    base.unauth()
}

  authStateChanged(error, user) {
      if (error) {
          alert('wrong password')
      } else if (user) {
          console.log('auth state changed ', user)
          this.setState({
              userName: user.email
          })
      }
  }

openProfile(doer){
  this.setState({
    name: doer.general.firstName
  })
}



  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <header className="App-header">
            <div className="logo">
            <img src= { pic }/>
            </div>
          </header>
          <Link to="/selfProfile">Your profile</Link>
          <form hidden={this.state.userName}>
            <button
              type="submit"
              onClick={this.logIn.bind(this)}>Log In</button>
              <input
              ref={node => this.email = node}
              placeholder="email" />
              <input
              ref={node => this.password = node}
              placeholder="password"
              type='password' />
            </form>
            <button
              hidden={!this.state.userName}
              type="submit"
              onClick={this.logIn.bind(this)}>Log out</button>

            {this.state.userName}
          <div className="utilities">


            <RaisedButton label="Doers" primary={true} style={style} className="buttons"
              onClick={this.handleToggle}/>

              <Drawer open={this.state.open}>
                <AppBar showMenuIconButton={false} title="Doers" />
                  <Doers
                  onChange={this.openProfile.bind(this)}
                  />

              </Drawer>

            <RaisedButton label="Donors" primary={true} style={style} className="buttons"
            onClick={this.handleToggle2}/>
              <Drawer width={250} openSecondary={true} open={this.state.open2} >
                <AppBar showMenuIconButton={false} title="Donors" />
                  <Donors />
              </Drawer>
          </div>

          <div className="signUp">

            <Link to ="/DoerSignUp"><RaisedButton label="Be a Doer" primary={true} style={style} className="buttons"/>
            </Link>

            <Link to ="/DonorSignUp"><RaisedButton label="Be a Donor" primary={true} style={style} className="buttons"/>
            </Link>

          </div>
          {this.state.name}
          <footer>
          </footer>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
