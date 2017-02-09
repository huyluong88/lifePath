import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import firebase from './config'
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import pic from './lifepathlogo.png';

const style = {
  marginLeft: 20,
  width: 300,
  underlineStyle: {
    borderColor: '#d15e29',
  },
  floatingLabelStyle: {
    color: 'black',
  },
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
      disabled: false,
      open: false,
      value: '',
      uploadImage: ''
    }
  }
componentDidMount(){
  base.syncState('donors',{
      state: 'donors',
      context: this,
      asArray: true
  })
}
handleImageChange(e) {
  e.preventDefault()
  let reader = new FileReader()
  let file = e.target.files[0];
  this.setState({
    uploadImage: file
  })
 }

addDonor(e){
  const firstName = this.firstN.input.value
  const lastName = this.lastN.input.value
  const password = this.password.input.value
  // let reader = new FileReader();
  // let file = e.target.files[0];
  let donorsArr = this.state.donors.length
  const storageRef = firebase.storage().ref(`donor/${donorsArr}`)
  const task = storageRef.put(this.state.uploadImage)

  if (firstName.length === 0 && lastName.length === 0) {
      alert('enter a first and last name')
  } else if (firstName.length < 2 && lastName.length < 2) {
      alert('enter a valid name')
  } else if (password.length < 6) {
      alert('password must be 6 or more characters')
  } else {
  let newDonor = {
          general: {
              organization: this.organization.input.value,
              firstName: this.firstN.input.value,
              lastName: this.lastN.input.value,
              toE: this.toE.value,
              industry: '',
              interest: '',
          },
          purpose: {
              ourStory: '',
              focusMission: '',
              niche: ''
          },
          contact: {
              email: this.email.input.value,
              phone: '',
              website: ''
          },
          key: this.state.donors.length,
          employees: [
            {employeeName: "Add employees"}
          ],
          training: [
              {trainerName: "Name of Trainer", trainerLink: "URL"},
          ]
}

  let newDonorsArray = this.state.donors.concat(newDonor)
  base.createUser({
      email: this.email.input.value,
      password: password
  }, () => {
      // alert('thanks for signing up!')
      this.setState({
        open: true
      },()=>{
        this.firstN.input.value = '',
        this.lastN.input.value ='',
        // this.photo.element.value ='',
        this.email.input.value ='',
        this.password.input.value=''
      })
    })
  this.setState({
    donors: newDonorsArray
  })
}
}



render (){
  return(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <section className='userCreation'>
    <header className="App-header">
      <div className="logo">
        <img src= { pic }/>
      </div>
    </header>
    <h1>Create your Donor account</h1>
    <TextField
     className='input'
     ref={input => this.organization = input}
     floatingLabelText="Organization Name"
     type="text"
     style={style}
     floatingLabelStyle={style.floatingLabelStyle}
     underlineFocusStyle={style.underlineStyle}/> <br/>
     <TextField
      className='input'
      ref={input => this.firstN = input}
      floatingLabelText="First Name"
      type="text"
      style={style}
      floatingLabelStyle={style.floatingLabelStyle}
      underlineFocusStyle={style.underlineStyle}/> <br/>

     <TextField
      ref={input => this.lastN = input}
      floatingLabelText="Last Name"
      type="text"
      style={style}
      floatingLabelStyle={style.floatingLabelStyle}
      underlineFocusStyle={style.underlineStyle}/> <br/>

     <TextField
      ref={input => this.email = input}
      floatingLabelText="email"
      type="text"
      style={style}
      floatingLabelStyle={style.floatingLabelStyle}
      underlineFocusStyle={style.underlineStyle}/> <br/>

     <TextField
      ref={input => this.password = input}
      floatingLabelText="password"
      type="password"
      style={style}
      floatingLabelStyle={style.floatingLabelStyle}
      underlineFocusStyle={style.underlineStyle}/> <br/>

      <div className='userSignUp2'>
     Type of Entity<br />
     <select className='select-style' name='ToE' ref={element => this.toE = element}>
       <option value='Company'>Company</option>
       <option value='Foundation'>Foundation</option>
       <option value='Non-Profit'>Non-Profit</option>
     </select> <br />
     <h1>Upload your profile image</h1>
     <input type='file' ref={element => this.photo = element} onChange={(e)=>this.handleImageChange(e)}/>
   </div>

   <div className='userSignUp'>

     <RaisedButton label="Submit"
     backgroundColor ='#d15e29'
     className="buttons"
     onClick={this.addDonor.bind(this)}/>
     <Link to ="/donorLogin">
     <RaisedButton label="Login" backgroundColor='#d15e29' className="buttons"/>
     </Link>
   </div>
   <Snackbar
     open={this.state.open}
     message="Thank you for signing up"
     autoHideDuration={5000}
     />
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
