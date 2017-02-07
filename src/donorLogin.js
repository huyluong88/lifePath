import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

const style2 ={
  backgroundColor: '#5b453b',
  // width: 200,
}

class donorLogin extends Component {
  constructor () {
    super()
    this.state = {
      donors:[],
      donor: {},
      userName: '',
      firstName: '',
      lastName: '',
      toE: '',
      industry: '',
      award: '',
      ourStory: '',
      focusMission: '',
      niche: '',
      email: '',
      phone: '',
      website: '',
      employee1: '',
      employee2: ''
    }
  }
  componentDidMount () {
  base.fetch('donors', {
    context: this,
    then: (data) => {
      console.log("data is", data)
      this.setState({
        donors: data
      })
    }
  })
}
logIn() {
    base.authWithPassword({
        email: this.email.input.value,
        password: this.password.input.value
    }, this.authStateChanged.bind(this)).catch(err => console.error(err))
}
logOut() {
  this.setState({
      userName: ''
  })
  base.unauth()
  this.email.input.value = '',
  this.password.input.value = ''
}
authStateChanged(error, user) {
console.log('error is ', error)
console.log('user is ', user)
if(error){
  alert('wrong password')
} else if(user){
  //fetch data in componentDidMount and store it in an Array
  //get email value from login user
  //filter email value against the Array to retrieve the key?
  //finally use that key to syncState with firebase?
        console.log('user is ', user.email)
        const donorEmail = user.email
        const donor = this.state.donors.filter(donor=>{
          return (donor.contact.email == `${donorEmail}`)
        })
        console.log('matched email is ', donor[0].key)
        base.syncState(`/donors/${donor[0].key}`,{
          context: this,
           state: 'donor',
           then: (donor) => {
            this.setState ({
             userName: this.email.input.value,
             firstName: this.state.donor.general.firstName,
             lastName: this.state.donor.general.lastName,
             toE: this.state.donor.general.toE,
             industry: this.state.donor.general.industry,
             award: this.state.donor.general.award,
             ourStory: this.state.donor.purpose.ourStory,
             focusMission: this.state.donor.purpose.focusMission,
             niche: this.state.donor.purpose.niche,
             email: this.state.donor.contact.email,
             phone: this.state.donor.contact.phone,
             website: this.state.donor.contact.website,
             employee1: this.state.donor.employees.employee1.employee1name,
             employee2: this.state.donor.employees.employee2.employee2name
           })
         }
       })
      }
}
// handleEdit(e){
// if(e.keyCode === 13){
//   const toe = this.test.value
//   this.setState({
//     award: toe
//   })
// }
// }
render (){
  console.log("self data is", this.state.donor)
  return (
    <div>
    <AppBar
    title="Login into your Donor account"
    showMenuIconButton={false}
    style={style2}
    />

    <section hidden={this.state.userName}>
        <TextField
         ref={input => this.email = input}
         floatingLabelText="email"
         type="text"
        />
        <TextField
         ref={input => this.password = input}
         floatingLabelText="password"
         type="password"
        />
        <RaisedButton
        label='Login'
        backgroundColor='#d15e29'
        onClick={this.logIn.bind(this)}/>

      </section>
      <RaisedButton
      label="Logout"
      hidden={!this.state.userName}
      backgroundColor='#d15e29'
      disabled={true === !this.state.userName}
      onClick={this.logOut.bind(this)}/>

      <div hidden={!this.state.userName}>
          <h2>Name</h2>
            <p>{this.state.firstName} {this.state.lastName}</p>
          <h2>Details</h2>
            <strong>Type of Entity: </strong><span>{this.state.toE}</span><br/>
            <strong>Industry: </strong><span>{this.state.industry}</span><br/>
            <strong>Award: </strong><span>{this.state.award}</span>
          <h2>Purpose</h2>
            <strong>Our Story: </strong><span>{this.state.ourStory}</span><br/>
            <strong>Focus/Mission: </strong><span>{this.state.focusMission}</span><br/>
            <strong>niche: </strong><span>{this.state.niche}</span>
            <h2>Contact Information</h2>
              <strong>email: </strong><span>{this.state.email}</span><br/>
              <strong>phone: </strong><span>{this.state.phone}</span><br/>
              <strong>website: </strong><span>{this.state.website}</span><br/>
              <h2>Employees</h2>
              <strong>employee1: </strong><span>{this.state.employee1}</span><br/>
              <strong>employee2: </strong><span>{this.state.employee2}</span><br/>

            </div>
    </div>
  )
  }
}
export default donorLogin
