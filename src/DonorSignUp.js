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
  const firstName = this.firstname.value
  const lastName = this.lastname.value
  const password = this.password.value
  if (firstName.length === 0 && lastName.length === 0) {
      alert('enter a first and last name')
  } else if (firstName.length < 2 && lastName.length < 2) {
      alert('enter a valid name')
  } else if (password.length < 6) {
      alert('password must be 6 or more characters')
  } else {
  let newDonor = {
    general: { firstName : this.firstname.value, lastName: this.lastname.value, toE: this.toE.value,
                industry: this.industry.value, interest: this.interest.value, award: this.award.value},
    purpose: { ourStory: this.ourStory.value, focusMission: this.focusMission.value, niche: this.niche.value},
    contact: { email: this.email.value, phone: this.phone.value, website: this.website.value},
    key: this.state.donors.length,
    employees: {
        employee1: {
            employee1name: this.employee1f.value,
            // employee1pic: this.employee2l.value
        },
        employee2: {
            employee2name: this.employee2f.value,
            // employee2pic: this.employee2f.value
        }

  }
}

  let newDonorsArray = this.state.donors.concat(newDonor)
  base.createUser({
      email: this.email.value,
      password: password
  }, () => {
      alert('thanks for signing up!')
  })
  this.setState({
    donors: newDonorsArray
  })

  this.props.router.push('/')
}
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
      <input placeholder="employee1 name" ref={element => this.employee1f = element}/>

      <input placeholder="employee2 name" ref={element => this.employee2f = element}/>


      <input
      ref={node => this.password = node}
      placeholder="password"
      type='password' />


      <RaisedButton label="Submit" primary={true} onClick={this.addDonor.bind(this)}/>
    </section>
    </MuiThemeProvider>

  )
}


}

export default DonorSignUp
