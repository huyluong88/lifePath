import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';

class DonorSignUp extends Component {
  constructor(){
    super()
    this.state = {
      donors: [],
      disabled: true
    }
  }
componentDidMount(){
  base.syncState('donors',{
      state: 'donors',
      context: this,
      asArray: true
  })
}

addDonor(){
  let newDonor = {
    general: { firstName : this.firstname.value, lastName: this.lastname.value, toE: this.toE.value,
                industry: this.industry.value, interest: this.interest.value, award: this.award.value},
    purpose: { ourStory: this.ourStory.value, focusMission: this.focusMission.value, niche: this.niche.value},
    contact: { email: this.email.value, phone: this.phone.value, website: this.website.value},
    employees: {
        employee1: {
            employee1name: "",
            employee1pic: ""
        },
        employee2: {
            employee2name: "",
            employee2pic: ""
        }

  }
}
  let newDonorsArray = this.state.donors.concat(newDonor)
  this.setState({
    donors: newDonorsArray
  })
  this.props.router.push('/')
}



render (){
  return(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <section>
      <h1>General</h1>
        <input placeholder="firstName" ref={element => this.firstname = element}/>
        <input placeholder="lastName" ref={element => this.lastname = element}/>
        <input placeholder="toE" ref={element => this.toE = element}/>
        <input placeholder="industry" ref={element => this.industry = element}/>
        <input placeholder="interest" ref={element => this.interest = element}/>
        <input placeholder="award" ref={element => this.award = element}/>

      <h1>Purpose</h1>
      <input placeholder="ourStory" ref={element => this.ourStory = element}/>
      <input placeholder="focusMission" ref={element => this.focusMission = element}/>
      <input placeholder="niche" ref={element => this.niche = element}/>

      <h1>Contact</h1>
      <input placeholder="email" ref={element => this.email = element}/>
      <input placeholder="phone" ref={element => this.phone = element}/>
      <input placeholder="website" ref={element => this.website = element}/>

      <RaisedButton label="Submit" primary={true} onClick={this.addDonor.bind(this)}/>
    </section>
    </MuiThemeProvider>

  )
}


}

export default DonorSignUp
