import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';
class selfProfile extends Component {
  constructor () {
    super()
    this.state = {
      doers:[],
      doer: {},
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
      ninetydayGoals: [],
      weeklyScore: [],
      yearand3years: []
    }
  }
  componentDidMount () {
  base.fetch('doers', {
    context: this,
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
             userName: this.email.value,
             firstName: this.state.doer.general.firstName,
             lastName: this.state.doer.general.lastName,
             toE: this.state.doer.general.toE,
             industry: this.state.doer.general.industry,
             award: this.state.doer.general.award,
             ourStory: this.state.doer.purpose.ourStory,
             focusMission: this.state.doer.purpose.focusMission,
             niche: this.state.doer.purpose.niche,
             email: this.state.doer.contact.email,
             phone: this.state.doer.contact.phone,
             website: this.state.doer.contact.website,
             ninetydayGoals: this.state.doer.performance.ninetydayGoals,
             weeklyScore: this.state.doer.performance.weeklyScore,
             yearand3years: this.state.doer.performance.yearand3years
           })
         }
       })
      }
}
handleEdit(e){
if(e.keyCode === 13){
  const toe = this.test.value
  this.setState({
    award: toe
  })
}
}
render (){
  console.log("self data is", this.state.doer)
  return (
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
          <h2>Name</h2>
            <p>{this.state.firstName} {this.state.lastName}</p>
          <h2>Details</h2>
            <strong>Type of Entity: </strong><span>{this.state.toE}</span><br/>
            <strong>Industry: </strong><span>{this.state.industry}</span><br/>
            <strong>Award: </strong><span contentEditable= {true} onKeyUp={this.handleEdit.bind(this)}>{this.state.award}</span>
          <h2>Purpose</h2>
            <strong>Our Story: </strong><span>{this.state.ourStory}</span><br/>
            <strong>Focus/Mission: </strong><span>{this.state.focusMission}</span><br/>
            <strong>niche: </strong><span>{this.state.niche}</span>
            <h2>Contact Information</h2>
              <strong>email: </strong><span>{this.state.email}</span><br/>
              <strong>phone: </strong><span>{this.state.phone}</span><br/>
              <strong>website: </strong><span>{this.state.website}</span><br/>
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
                   <td className="tg-6k2t" contentEditable={true}>
                     {this.state.ninetydayGoals.map (stuff => {
                       return (<tr>{stuff.category}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t" contentEditable={true}>
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
    </div>
  )
  }
}
export default selfProfile
