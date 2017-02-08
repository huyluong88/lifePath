import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Doers from './Doers'
import Donors from './Donors'
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import pic from './lifepathlogo.png';

const style = {
 margin: 12,
 backgroundColor: '#d15e29 ',
};
const style2 ={
 backgroundColor: '#d15e29 ',
}

class DoerProfile extends Component {

  constructor () {
    super()
    this.state = {
      name: {},
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
      yearand3years: [],
      value: 'a',
      open: false,
      open2: false
    }
  }
  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});
  componentDidMount () {
  base.fetch(`/doers/${this.props.params.name}`, {
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
componentWillReceiveProps (nextProps) {
 base.fetch(`/doers/${this.props.params.name}`, {
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
       yearand3years: data.performance.yearand3years,
       accountability: data.accountability,
       beneficiaries: data.beneficiaries
     })
   }
 })
}
handleSelect(index, last) {
   console.log('Selected tab: ' + index + ', Last tab: ' + last);
 }
render (){
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className='App' >
      <header className="App-header">
        <div className="logo">
          <img src= { pic }/>
        </div>
      </header>
        <Link to ="/">
        <RaisedButton label="Back to home" backgroundColor='#d15e29' className="buttons"/>
        </Link> <br />

          <div className="utilities">
               <RaisedButton label="Doers" backgroundColor='#d15e29 ' style={style} className="buttons"
                 onClick={this.handleToggle}/>

               <Drawer open={this.state.open}>
                   <AppBar showMenuIconButton={false} title="Doers" style={style2}/>
                   <Doers/>
               </Drawer>

               <RaisedButton label="Donors" backgroundColor='#d15e29 ' style={style} className="buttons"
                onClick={this.handleToggle2}/>
               <Drawer width={250} openSecondary={true} open={this.state.open2} >
                   <AppBar showMenuIconButton={false} title="Donors" style={style2}/>
                   <Donors />
               </Drawer>
          </div>
        <h1>{this.state.firstName}: Information</h1>
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={2}>
          <TabList>
                    <Tab className='tab'>About</Tab>
                    <Tab className='tab'>Training</Tab>
                    <Tab className='tab'>Performance</Tab>
                    <Tab className='tab'>Accountability</Tab>
          </TabList>
          <TabPanel>
            <h2>About</h2>
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

          </TabPanel>
          <TabPanel>
            <h2>Training</h2>
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <h2>Accountability</h2>
          </TabPanel>
        </Tabs>
      </div>
    </MuiThemeProvider>

  )
  }
}
export default DoerProfile
/////// `doers/${doer[0].key}`///////
