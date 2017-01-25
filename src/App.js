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
      open2: false
    }
  }
  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});



  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <header>
            <img className="back" src= { pic2 }/>
            <img className="logo" src= { pic }/>
          </header>
          <div className="utilities">
            <RaisedButton label="Doers" primary={true} style={style} className="buttons"
              onClick={this.handleToggle}/>

              <Drawer open={this.state.open}>
                <AppBar showMenuIconButton={false} title="Doers" />
                <Doers />
              </Drawer>

            <RaisedButton label="Donors" primary={true} style={style} className="buttons"
            onClick={this.handleToggle2}/>
              <Drawer width={250} openSecondary={true} open={this.state.open2} >
                <AppBar showMenuIconButton={false} title="Donors" />
                <Donors />
              </Drawer>
          </div>

          <div className="signUp">

            <Link to ="/DoerSignUp"><RaisedButton label="Be a Doer" primary={true} style={style} className="buttons"/
            ></Link>

            <RaisedButton label="Be a Donor" primary={true} style={style} className="buttons"
            />

          </div>
          <footer>
          </footer>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
