import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';

class selfProfile extends Component {
  constructor () {
    super()
    this.state = {
      name: {},
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
  base.syncState(`/doers/${this.props.params.name}`, {
    context: this,
    then: (data) => {
      this.setState({
        name: data,
        firstName: data.general.firstName,
        lastName: data.general.lastName,
        toE: data.general.toE,
        industry: data.general.industry,
        award: data.general.award,
        ourStory: data.purpose.ourStory,
        focusMission: data.purpose.focusMission,
        niche: data.purpose.niche,
        email: data.contact.email,
        phone: data.contact.phone,
        website: data.contact.website,
        ninetydayGoals: data.performance.ninetydayGoals,
        weeklyScore: data.performance.weeklyScore,
        yearand3years: data.performance.yearand3years
      })
      console.log("what is", data)
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
    if (error) {
        alert('wrong password')
    } else if (user) {
        console.log('auth state changed ', user)
        this.setState({
            userName: user.email
        })
    }
}


render (){

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
                       return (<tr >{stuff.category}</tr>)
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


    </div>
  )
  }
}
export default selfProfile
