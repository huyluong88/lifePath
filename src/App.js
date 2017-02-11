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
import doerLogin from './doerLogin';
import FlatButton from 'material-ui/FlatButton';

const style = {
    margin: 12,
    backgroundColor: '#d15e29',
};
const style2 = {
    backgroundColor: '#d15e29',
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            open2: false,
        }
    }
    handleToggle = () => this.setState({
        open: !this.state.open
    });
    handleToggle2 = () => this.setState({
        open2: !this.state.open2
    });

  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
          <div className="App">
              <header className="App-header">
                <div className="logo">
                  <img className='logoPic' src= { pic }/>
                </div>
                <div className='link'>
                  <Link className='link' to="/doerLogin">Doer login</Link>
                  <Link className='link' to="/donorLogin">Donor login</Link>
                </div>
              </header>

              <div className="utilities">
                  <RaisedButton label="Doers" backgroundColor='#d15e29' style={style} className="buttons"
                    onClick={this.handleToggle}/>

                  <Drawer open={this.state.open} containerClassName='testDraw'>
                      <AppBar showMenuIconButton={false} title="Doers" style={style2}/>
                      <Doers/>
                  </Drawer>

                  <RaisedButton label="Donors" backgroundColor='#d15e29' style={style} className="buttons"
                   onClick={this.handleToggle2}/>
                  <Drawer width={250} openSecondary={true} open={this.state.open2} containerClassName='testDraw' >
                      <AppBar className='appBar' showMenuIconButton={false} title="Donors" style={style2}/>
                      <Donors />
                  </Drawer>
              </div>

              <div className="signUp">
                  <Link to ="/DoerSignUp"><RaisedButton label="Be a Doer" backgroundColor='#d15e29' style={style} className="buttons"/>
                  </Link>
                  <Link to ="/DonorSignUp"><RaisedButton label="Be a Donor" backgroundColor='#d15e29' style={style} className="buttons"/>
                  </Link>
              </div>
            </div>

            <footer className='footer'>
            </footer>
      </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
