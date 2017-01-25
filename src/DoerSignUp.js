import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';

class DoerSignUp extends Component {
  constructor(){
    super()
    this.state = {
      doers: [],
      disabled: true
    }
  }
componentDidMount(){
  base.syncState('doers',{
      state: 'doers',
      context: this,
      asArray: true
  })
}

addDoer(){
  let newDoer = {
    general: { firstName : this.firstname.value, lastName: this.lastname.value }
  }
  let newDoersArray = this.state.doers.concat(newDoer)

  this.setState({
    doers: newDoersArray
  })
  this.props.router.push('/')
}



render (){
  return(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <section>
      <input placeholder="firstName" ref={element => this.firstname = element}/>
      <input placeholder="lastName" ref={element => this.lastname = element}/>
      <RaisedButton label="Add" primary={true} onClick={this.addDoer.bind(this)}/>
    </section>
    </MuiThemeProvider>

  )
}


}

export default DoerSignUp
