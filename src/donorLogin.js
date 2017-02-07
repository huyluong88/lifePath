import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import firebase from './config'
c

const style2 ={
  backgroundColor: '#5b453b',
  // width: 200,
}

class donorLogin extends Component {
  constructor () {
    super()
    this.state = {
      donors:[],
      donor: {
        contact: {},
        general: {},
        purpose: {}
      },
      employee1: {},
      employee2: {},
      open: false,
      open2: false,
      open3: false,
      open4: false,
      testingPhoto: 'nothing yet'
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
if(error){
  alert('wrong password')
} else if(user){
        const donorEmail = user.email
        const donor = this.state.donors.filter(donor=>{
          return (donor.contact.email == `${donorEmail}`)
        })
        let storageRef = firebase.storage();
        let starsRef = storageRef.ref(`donor/${donor[0].key}`);
        starsRef.getDownloadURL().then((url) => {
            // Insert url into an <img> tag to "download"
            console.log('DL is ', url)
            const testingPic = url
            console.log('DL 2 is ', testingPic)
            this.setState({
                testingPhoto: testingPic
            })
        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object_not_found':
                    // File doesn't exist
                    console.log('file does not exist')
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log('no permission')
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    console.log('cancelled the upload')
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    console.log('unknow occured')
                    break;
            }
        })

        base.syncState(`/donors/${donor[0].key}`,{
          context: this,
           state: 'donor',
           then: (donor) => {
            this.setState ({
             userName: donorEmail,
             employee1: this.state.donor.employees.employee1,
             employee2: this.state.donor.employees.employee2
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

openEditName() {
  this.setState ({
    open: true
  })
}

changeName() {
  this.setState ({
    donor: {
      general: {
        firstName: this.newName.value,
        lastName: this.newLastName.value
      }
    }
  })
}

openEditDetails() {
  this.setState ({
    open2: true
  })
}

changeDetails() {
  this.setState ({
    donor: {
      general: {
        toE: this.newToE.value,
        industry: this.newIndustry.value,
        interest: this.newInterest.value,
        award: this.newAward.value
      }
    }
  })
}

openPurpose() {
  this.setState({
    open3: true
  })
}

changePurpose() {
  this.setState ({
    donor: {
      purpose: {
        ourStory: this.newStory.value,
        focusMission: this.newFocus.value,
        niche: this.newNiche.value
      }
    }
  })
}

openContact(){
  this.setState({
    open4: true
  })
}

changeContact () {
  this.setState ({
    donor: {
      contact: {
        phone: this.newPhone.value,
        website: this.newWebsite.value
      }
    }
  })
}

handleClose = () => this.setState({open: !this.state.open});
handleClose2 = () => this.setState({open2: !this.state.open2});
handleClose3 = () => this.setState({open3: !this.state.open3});
handleClose4 = () => this.setState({open4: !this.state.open4});
render (){
  const actions = [
   <RaisedButton
     label="Close"
     primary={true}
     onClick={this.handleClose}
   />
 ];

 const actions2 = [
  <RaisedButton
    label="Close"
    primary={true}
    onClick={this.handleClose2}
  />
];

const actions3 = [
 <RaisedButton
   label="Close"
   primary={true}
   onClick={this.handleClose3}
 />
];

const actions4 = [
<RaisedButton
  label="Close"
  primary={true}
  onClick={this.handleClose4}
/>
];
  console.log("self data is", this.state.donor)
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

    <div>
    <h1>Login into your Donor account</h1>

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

          <img src={this.state.testingPhoto}/>
          <section className="info">
          <h2>Name</h2>
          <FlatButton label="Edit Name" primary={true}
            onClick={this.openEditName.bind(this)}/>
          </section>
            <p>{this.state.donor.general.firstName} {this.state.donor.general.lastName}</p>


            <section className="info">
            <h2>Details</h2>
            <FlatButton label="Edit Details" primary={true}
              onClick={this.openEditDetails.bind(this)}/>
            </section>
            <strong>Type of Entity: </strong><span>{this.state.donor.general.toE}</span><br/>
            <strong>Industry: </strong><span>{this.state.donor.general.industry}</span><br/>
            <strong>Interest: </strong><span>{this.state.donor.general.interest}</span><br/>
            <strong>Award: </strong><span>{this.state.donor.general.award}</span>


            <section className="info">
            <h2>Purpose</h2>
            <FlatButton label="Edit Purpose" primary={true}
              onClick={this.openPurpose.bind(this)}/>
            </section>
            <strong>Our Story: </strong><span>{this.state.donor.purpose.ourStory}</span><br/>
            <strong>Focus/Mission: </strong><span>{this.state.donor.purpose.focusMission}</span><br/>
            <strong>niche: </strong><span>{this.state.donor.purpose.niche}</span>


            <section className="info">
            <h2>Contact Information</h2>
            <FlatButton label="Edit Contact Info" primary={true}
              onClick={this.openContact.bind(this)}/>
            </section>
              <strong>email: </strong><span>{this.state.donor.contact.email}</span><br/>
              <strong>phone: </strong><span>{this.state.donor.contact.phone}</span><br/>
              <strong>website: </strong><span>{this.state.donor.contact.website}</span><br/>


              <h2>Employees</h2>
              <strong>employee1: </strong><span>{this.state.employee1.employee1name}</span><br/>
              <strong>employee2: </strong><span>{this.state.employee2.employee2name}</span><br/>
            </div>

            <Dialog
              title="Change Both First & Last Name"
              actions={actions}
              open={this.state.open}
             >
             <input type="text" placeholder="change first name"
             ref={element => this.newName = element}/><br/>
             <input type="text" placeholder="change last name"
             ref={element => this.newLastName = element}/><br/>
             <RaisedButton label="Submit" primary={true} onClick={this.changeName.bind(this)}/>
             </Dialog>

             <Dialog
                title="Change All Details"
                actions={actions2}
                open={this.state.open2}>
                <input type="text" placeholder="change Type of Entity"
                ref={element => this.newToE = element}/><br/>
                <input type="text" placeholder="Industry"
                ref={element => this.newIndustry = element}/><br/>
                <input type="text" placeholder="Interest"
                ref={element => this.newInterest = element}/><br/>
                <input type="text" placeholder="Award"
                ref={element => this.newAward = element}/><br/>
                <RaisedButton label="Submit" primary={true} onClick={this.changeDetails.bind(this)}/>
             </Dialog>

             <Dialog
                title="Change All Purpose Sections"
                actions={actions3}
                open={this.state.open3}>
                <input type="text" placeholder="change Type of Story"
                ref={element => this.newStory = element}/><br/>
                <input type="text" placeholder="Focus/Mission"
                ref={element => this.newFocus = element}/><br/>
                <input type="text" placeholder="Niche"
                ref={element => this.newNiche = element}/><br/>
                <RaisedButton label="Submit" primary={true} onClick={this.changePurpose.bind(this)}/>
             </Dialog>

             <Dialog
                title="Change All Contact Information"
                actions={actions4}
                open={this.state.open4}>
                <input type="text" placeholder="change phone"
                ref={element => this.newPhone = element}/><br/>
                <input type="text" placeholder="change website"
                ref={element => this.newWebsite = element}/><br/>
                <RaisedButton label="Submit" primary={true} onClick={this.changeContact.bind(this)}/>
             </Dialog>

    </div>
    </MuiThemeProvider>

  )
  }
}
export default donorLogin
