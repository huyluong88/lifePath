import React, { Component } from 'react';
import { Link } from 'react-router';
import base  from './config';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import pic from './lifepathlogo.png';
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
    }
  }
  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});

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

          <div className="utilities">
            <RaisedButton label="Doers" primary={true} style={style} className="buttons"
              onClick={this.handleToggle}/>

              <Drawer open={this.state.open}>
                <AppBar showMenuIconButton={false} title="Doers" />
                  <Doers/>

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
          <footer>
          </footer>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
