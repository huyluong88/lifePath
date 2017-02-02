import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
class DoerSignUp extends Component {
  constructor(){
    super()
    this.state = {
      doers: [],
      disabled: false
    }
  }
componentDidMount(){
  base.syncState('doers',{
      state: 'doers',
      context: this,
      asArray: true
  })
}
addDoer() {
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
        let newDoer = {
            general: {
                firstName: this.firstname.value,
                lastName: this.lastname.value,
                toE: this.toE.value,
                industry: this.industry.value,
                award: this.award.value,
            },
            purpose: {
                ourStory: this.ourStory.value,
                focusMission: this.focusMission.value,
                niche: this.niche.value
            },
            contact: {
                email: this.email.value,
                phone: this.phone.value,
                website: this.website.value
            },
            key: this.state.doers.length,
            performance: {
                ninetydayGoals: [{
                    category: this.category.value,
                    owner: this.owner.value,
                    smartGoals: this.smartGoals.value,
                    dateSet: this.datestart.value,
                    endDate: this.datesend.value,
                    goalMet: this.goal.value
                }],
                weeklyScore: [{
                    category: this.weeklyCategory.value,
                    owner: this.weeklyOwner.value,
                    measurable: this.measurable.value,
                    goal: this.weeklyGoal.value,
                    weekbegin: this.weeklyDatestart.value,
                    weekEnd: this.weeklyDatesend.value
                }],
                yearand3years: [{
                    category: this.yearCategory.value,
                    owner: this.yearOwner.value,
                    smartGoals: this.yearSmartGoals.value,
                    dateSet: this.yearDatestart.value,
                    endDate: this.yearDatesend.value,
                    goalMet: this.yearGoal.value
                }]
            }
        }
        let newDoersArray = this.state.doers.concat(newDoer)
        base.createUser({
            email: this.email.value,
            password: password
        }, () => {
            alert('thanks for signing up!')
        })
        this.setState({
            doers: newDoersArray
        })
        this.props.router.push('/')
    }
}
render (){
  return(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <section className="trialdos">
      <h1>General</h1>
        <input placeholder="firstName" ref={element => this.firstname = element}/>
        <input placeholder="lastName" ref={element => this.lastname = element}/>
        Type of Entity:
        <select name='ToE' ref={element => this.toE = element}>
          <option value='Company'>Company</option>
          <option value='Foundation'>Foundation</option>
          <option value='Non-Profit'>Non-Profit</option>
        </select>
        <input placeholder="industry" ref={element => this.industry = element}/>
        <input placeholder="award" ref={element => this.award = element}/>
      <h1>Purpose</h1>
      <input placeholder="ourStory" ref={element => this.ourStory = element}/>
      <input placeholder="focusMission" ref={element => this.focusMission = element}/>
      <input placeholder="niche" ref={element => this.niche = element}/>
      <h1>Performance</h1>
        <p><strong>Just One Goal for Each section</strong></p>
          <h3>90 Day Goals</h3>
          Category:
            <select ref={element => this.category = element}>
              <option value='Marketing'>Marketing</option>
              <option value='Donor Development'>Donor Development</option>
              <option value='Operations'>Operations</option>
              <option value='Strategy'>Strategy</option>
              <option value='Culture'>Culture</option>
              <option value='Finance'>Finance</option>
              <option value='Accounting'>Accounting</option>
              <option value='Legal'>Legal</option>
            </select>
            <input placeholder="Owner" ref={element => this.owner = element}/>
            <input placeholder="S.M.A.R.T. Goals" ref={element => this.smartGoals = element}/>
            Date Started: <input type="date"  ref={element => this.datestart = element}/>
            Date End: <input type="date"  ref={element => this.datesend = element}/>
            Goal Met:
            <select ref={element => this.goal = element}>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <h3>Weekly Scorecard</h3>
            <select ref={element => this.weeklyCategory = element}>
              <option value='Marketing'>Marketing</option>
              <option value='Donor Development'>Donor Development</option>
              <option value='Operations'>Operations</option>
              <option value='Strategy'>Strategy</option>
              <option value='Culture'>Culture</option>
              <option value='Finance'>Finance</option>
              <option value='Accounting'>Accounting</option>
              <option value='Legal'>Legal</option>
            </select>
            <input placeholder="Owner" ref={element => this.weeklyOwner = element}/>
            <input placeholder="Measurable" ref={element => this.measurable = element}/>
            <input placeholder="Goal" ref={element => this.weeklyGoal = element}/>
            Date Started: <input type="date"  ref={element => this.weeklyDatestart = element}/>
            Date End: <input type="date"  ref={element => this.weeklyDatesend = element}/>
            <h3>1 and 3 year goals</h3>
            <select ref={element => this.yearCategory = element}>
              <option value='Marketing'>Marketing</option>
              <option value='Donor Development'>Donor Development</option>
              <option value='Operations'>Operations</option>
              <option value='Strategy'>Strategy</option>
              <option value='Culture'>Culture</option>
              <option value='Finance'>Finance</option>
              <option value='Accounting'>Accounting</option>
              <option value='Legal'>Legal</option>
            </select>
            <input placeholder="Owner" ref={element => this.yearOwner = element}/>
            <input placeholder="S.M.A.R.T. Goals" ref={element => this.yearSmartGoals = element}/>
            Date Started: <input type="date"  ref={element => this.yearDatestart = element}/>
            Date End: <input type="date"  ref={element => this.yearDatesend = element}/>
            Goal Met:
            <select ref={element => this.yearGoal = element}>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
      <h1>Contact</h1>
      <input placeholder="email" ref={element => this.email = element}/>
      <input placeholder="phone" ref={element => this.phone = element}/>
      <input placeholder="website" ref={element => this.website = element}/>
      <input
      ref={node => this.password = node}
      placeholder="password"
      type='password' />
      <RaisedButton label="Submit" primary={true} onClick={this.addDoer.bind(this)}/>
    </section>
    </MuiThemeProvider>
  )
}
}
export default DoerSignUp
