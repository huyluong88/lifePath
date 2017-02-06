import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import firebase from './config'

const style = {
  marginLeft: 20,
}
const style2 ={
  backgroundColor: '#5b453b',
  // width: 200,
}
const style3 = {
  marginLeft: 300,
  marginRight: 300,
}

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

addDonor(e){
  const firstName = this.firstN.input.value
  const lastName = this.lastN.input.value
  const password = this.password.input.value
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.readAsDataURL(file)
  let donorsArr = this.state.donors.length
  const storageRef = firebase.storage().ref(`${donorsArr}`)
  const task = storageRef.put(file)

  if (firstName.length === 0 && lastName.length === 0) {
      alert('enter a first and last name')
  } else if (firstName.length < 2 && lastName.length < 2) {
      alert('enter a valid name')
  } else if (password.length < 6) {
      alert('password must be 6 or more characters')
  } else {
  let newDonor = {
    general: { firstName : this.firstN.input.value, lastName: this.lastN.input.value, toE: this.toE.value,
                industry: '', interest: '', award: ''},
    purpose: { ourStory: '', focusMission: '', niche: ''},
    contact: { email: this.email.input.value, phone: '', website: ''},
    key: this.state.donors.length,
    employees: {
        employee1: {
            employee1name: '',
            // employee1pic: this.employee2l.value
        },
        employee2: {
            employee2name: '',
            // employee2pic: this.employee2f.value
        }

  }
}

  let newDonorsArray = this.state.donors.concat(newDonor)
  base.createUser({
      email: this.email.input.value,
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
    <AppBar
    title="Create your Donor account"
    showMenuIconButton={false}
    style={style2}
    />
     <TextField
      className='input'
      ref={input => this.firstN = input}
      floatingLabelText="First Name"
      type="text"
      style={style}

      />
      <Divider style={style3} />
     <TextField
      ref={input => this.lastN = input}
      floatingLabelText="Last Name"
      type="text"
      style={style}
     />
     <Divider style={style3} />
     <TextField
      ref={input => this.email = input}
      floatingLabelText="email"
      type="text"
      style={style}
     />
     <Divider style={style3}/>
     <TextField
      ref={input => this.password = input}
      floatingLabelText="password"
      type="password"
      style={style}
     /> <br />
     <Divider style={style3}/>

     Type of Entity<br />
     <select className='select-style' name='ToE' ref={element => this.toE = element}>
       <option value='Company'>Company</option>
       <option value='Foundation'>Foundation</option>
       <option value='Non-Profit'>Non-Profit</option>
     </select> <br />
     <Divider style={style3}/>

     <input type='file' ref={element => this.photo = element} onChange={(e)=>this.addDonor(e)}/>
   <RaisedButton label="Submit"
   backgroundColor ='#d15e29'
   onClick={this.addDonor.bind(this)}/>


    </section>
    </MuiThemeProvider>

  )
}


}

export default DonorSignUp
// <h1>General</h1>
//   <input placeholder="firstName" ref={element => this.firstname = element}/>
//   <input placeholder="lastName" ref={element => this.lastname = element}/>
//   <input placeholder="toE" ref={element => this.toE = element}/>
//   <input placeholder="industry" ref={element => this.industry = element}/>
//   <input placeholder="interest" ref={element => this.interest = element}/>
//   <input placeholder="award" ref={element => this.award = element}/>
//
// <h1>Purpose</h1>
// <input placeholder="ourStory" ref={element => this.ourStory = element}/>
// <input placeholder="focusMission" ref={element => this.focusMission = element}/>
// <input placeholder="niche" ref={element => this.niche = element}/>
//
// <h1>Contact</h1>
// <input placeholder="email" ref={element => this.email = element}/>
// <input placeholder="phone" ref={element => this.phone = element}/>
// <input placeholder="website" ref={element => this.website = element}/>
// <input placeholder="employee1 name" ref={element => this.employee1f = element}/>
//
// <input placeholder="employee2 name" ref={element => this.employee2f = element}/>
//
//
// <input
// ref={node => this.password = node}
// placeholder="password"
// type='password' />
//       <RaisedButton label="Submit" primary={true} onClick={this.addDonor.bind(this)}/>
