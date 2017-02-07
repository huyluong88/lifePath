import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';

class selfProfile extends Component {
  constructor () {
    super()
    this.state = {
      doers:[],
      doer: {
        general: {},
        contact: {},
        beneficiaries: {},
        accountability: {},
        purpose: {},
      },
      ninetydayGoals: [],
      weeklyScore: [],
      yearand3years: [],
      open: false
    }
  }
  componentDidMount () {
  base.fetch('doers', {
    context: this,
    asArray: true,
    then: (data) => {
      console.log("data is", data)
      this.setState({
        doers: data
      })
    }
  })
}
logIn() {
    base.authWithPassword({
        email: this.email.value,
        password: this.password.value
    }, this.authStateChanged.bind(this)).catch(err => console.error(err))
}
logOut() {
  this.setState({
      userName: ''
  })
  base.unauth()
  this.email.value = '',
  this.password.value = ''
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
        const doerEmail = user.email
        const doer = this.state.doers.filter(doer=>{
          return (doer.contact.email == `${doerEmail}`)
        })
        console.log('matched email is ', doer[0].key)
        base.syncState(`/doers/${doer[0].key}`,{
          context: this,
           state: 'doer',
           then: (doer) => {
            this.setState ({
             userName: doerEmail,
             ninetydayGoals: this.state.doer.performance.ninetydayGoals,
             weeklyScore: this.state.doer.performance.weeklyScore,
             yearand3years: this.state.doer.performance.yearand3years
           })
         }
       })
      }
}

openEditName() {
  this.setState ({
    open: true
  })
}

handleClose = () => this.setState({open: !this.state.open});

changeName() {
  const otherName = this.newName.value
  console.log('here is ', this.doerObj)
  this.setState ({
    doer: {
      general: {
        firstName: otherName
      }
    }
  })
}

render (){
  console.log("self data is", this.state.doer)
    const actions = [
     <RaisedButton
       label="Close"
       primary={true}
       onClick={this.handleClose}
     />
   ];
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

    <div>
    <section hidden={this.state.userName}>
      <button
        type="submit"
        onClick={this.logIn.bind(this)}>Log In</button>
        <input
        ref={node => this.email = node}
        placeholder="email" />
        <input
        ref={node => this.password = node}
        placeholder="password"
        type='password' />
      </section>
      <button
        hidden={!this.state.userName}
        type="submit"
        onClick={this.logOut.bind(this)}>Log out</button>
      <div hidden={!this.state.userName}>
      <input ref={node => this.test = node} />
          <h2>Name</h2><RaisedButton label="Edit" primary={true} className="buttons"
            onClick={this.openEditName.bind(this)}/>
            <p>{this.state.doer.general.firstName} {this.state.doer.general.lastName}</p>
          <h2>Details</h2>
            <strong>Type of Entity: </strong><span>{this.state.doer.general.toE}</span><br/>
            <strong>Industry: </strong><span>{this.state.doer.general.industry}</span><br/>
            <strong>Award: </strong><span>{this.state.doer.general.award}</span>
          <h2>Purpose</h2>
            <strong>Our Story: </strong><span>{this.state.doer.purpose.ourStory}</span><br/>
            <strong>Focus/Mission: </strong><span>{this.state.doer.purpose.focusMission}</span><br/>
            <strong>niche: </strong><span>{this.state.doer.purpose.niche}</span>
            <h2>Contact Information</h2>
              <strong>email: </strong><span>{this.state.doer.contact.email}</span><br/>
              <strong>phone: </strong><span>{this.state.doer.contact.phone}</span><br/>
              <strong>website: </strong><span>{this.state.doer.contact.website}</span><br/>
              <h2>Performance</h2>
                <strong>90 Day Goals</strong>
                  <table className="tg">
                   <tr>
                     <th className="tg-yw4l">Category</th>
                     <th className="tg-yw4l">Owner</th>
                     <th className="tg-yw4l">S.M.A.R.T. Goals</th>
                     <th className="tg-yw4l">Date</th>
                     <th className="tg-yw4l">Date</th>
                     <th className="tg-yw4l">Goal Met</th>
                   </tr>
                   <tr>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr>{stuff.category}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr >{stuff.owner}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr >{stuff.smartGoals}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr >{stuff.dateSet}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr >{stuff.endDate}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr >{stuff.goalMet}</tr>)
                     })}
                   </td>
                   </tr>
                  </table><br/>
                  <strong>Weekly Score</strong>
                  <table className="tg">
                   <tr>
                     <th className="tg-yw4l">Category</th>
                     <th className="tg-yw4l">Owner</th>
                     <th className="tg-yw4l">Measurable</th>
                     <th className="tg-yw4l">Goal</th>
                     <th className="tg-yw4l">Week Begin</th>
                     <th className="tg-yw4l">End Week</th>
                   </tr>
                   <tr>
                   <td className="tg-6k2t">
                     {this.state.weeklyScore.map (stuff => {
                       return (<tr >{stuff.category}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.weeklyScore.map (stuff => {
                       return (<tr >{stuff.owner}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.weeklyScore.map (stuff => {
                       return (<tr >{stuff.measurable}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.weeklyScore.map (stuff => {
                       return (<tr >{stuff.goal}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.weeklyScore.map (stuff => {
                       return (<tr >{stuff.weekbegin}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.weeklyScore.map (stuff => {
                       return (<tr >{stuff.weekEnd}</tr>)
                     })}
                   </td>
                   </tr>
                  </table><br/>
                  <strong>1 and 3 Year Goal</strong>
                  <table className="tg">
                   <tr>
                     <th className="tg-yw4l">Category</th>
                     <th className="tg-yw4l">Owner</th>
                     <th className="tg-yw4l">S.M.A.R.T. Goals</th>
                     <th className="tg-yw4l">Date Set</th>
                     <th className="tg-yw4l">End Date</th>
                     <th className="tg-yw4l">Goal Met?</th>
                   </tr>
                   <tr>
                   <td className="tg-6k2t">
                     {this.state.yearand3years.map (stuff => {
                       return (<tr >{stuff.category}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.yearand3years.map (stuff => {
                       return (<tr >{stuff.owner}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.yearand3years.map (stuff => {
                       return (<tr >{stuff.smartGoals}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.yearand3years.map (stuff => {
                       return (<tr >{stuff.dateSet}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.yearand3years.map (stuff => {
                       return (<tr >{stuff.endDate}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.yearand3years.map (stuff => {
                       return (<tr >{stuff.goalMet}</tr>)
                     })}
                   </td>
                   </tr>
                  </table>
            </div>
            <Dialog
              title="Edit Name"
              actions={actions}
              open={this.state.open}
             >
             <input type="text" placeholder="change name" ref={element => this.newName = element}/>
             <RaisedButton label="Submit" primary={true} onClick={this.changeName.bind(this)}/>
             </Dialog>
    </div>
    </MuiThemeProvider>

  )
  }
}
export default selfProfile
