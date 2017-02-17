import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import firebase from './config'
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
const style2 = {
    backgroundColor: '#d15e29 ',
}

class DoerProfile extends Component {

    constructor() {
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
            success: '',
            outcome: '',
            ninetydayGoals: [],
            weeklyScore: [],
            yearand3years: [],
            training: [],
            beneficiaries: [],
            open: false,
            open2: false,
            testingPhoto: 'nothing yet',
        }
    }
    handleToggle = () => this.setState({
        open: !this.state.open
    });
    handleToggle2 = () => this.setState({
        open2: !this.state.open2
    });
    componentDidMount() {
        let storageRef = firebase.storage();
        let starsRef = storageRef.ref(`doer/${this.props.params.name}`);
        starsRef.getDownloadURL().then((url) => {
            console.log('DL is ', url)
            const testingPic = url
            console.log('DL 2 is ', testingPic)
            this.setState({
                testingPhoto: testingPic
            })
        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object_not_found':
                    console.log('file does not exist')
                    break;
                case 'storage/unauthorized':
                    console.log('no permission')
                    break;
                case 'storage/canceled':
                    console.log('cancelled the upload')
                    break;
                case 'storage/unknown':
                    console.log('unknow occured')
                    break;
            }
        })

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
                    training: data.training,
                    beneficiaries: data.beneficiaries,
                    success: data.success,
                    outcome: data.outcome
                })
                console.log("what is", data)
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let storageRef = firebase.storage();
        let starsRef = storageRef.ref(`doer/${this.props.params.name}`);
        starsRef.getDownloadURL().then((url) => {
            console.log('DL is ', url)
            const testingPic = url
            console.log('DL 2 is ', testingPic)
            this.setState({
                testingPhoto: testingPic
            })
        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object_not_found':
                    console.log('file does not exist')
                    break;
                case 'storage/unauthorized':
                    console.log('no permission')
                    break;
                case 'storage/canceled':
                    console.log('cancelled the upload')
                    break;
                case 'storage/unknown':
                    console.log('unknow occured')
                    break;
            }
        })
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
                    training: data.training,
                    beneficiaries: data.beneficiaries,
                    success: data.success,
                    outcome: data.outcome
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
        <div className='App'>
            <header className="App-header">
                <div className="logo">
                    <img src={ pic }/>
                </div>
            </header>

            <div className="utilities">
                <RaisedButton label="Home" backgroundColor='#d15e29' className="buttons" href='/' style={style}/>

                <RaisedButton label="Doers" backgroundColor='#d15e29 ' style={style} className="buttons" onClick={this.handleToggle}/>

                <Drawer open={this.state.open} containerClassName='testDraw'>
                    <AppBar showMenuIconButton={false} title="Doers" style={style2}/>
                    <Doers/>
                </Drawer>

                <RaisedButton label="Donors" backgroundColor='#d15e29 ' style={style} className="buttons" onClick={this.handleToggle2}/>
                <Drawer width={250} openSecondary={true} open={this.state.open2} containerClassName='testDraw'>
                    <AppBar showMenuIconButton={false} title="Donors" style={style2}/>
                    <Donors />
                </Drawer>
            </div>
            <h1>{this.state.firstName}: Information</h1><br/>
            <img src={this.state.testingPhoto}/>
            <Tabs onSelect={this.handleSelect} selectedIndex={2}>
                <TabList>
                    <Tab className='tab'>Training</Tab>
                    <Tab className='tab'>Beneficiaries</Tab>
                    <Tab className='tab'>About</Tab>
                    <Tab className='tab'>Performance</Tab>
                </TabList>
                <TabPanel>
                    <h2>Training</h2>
                    {this.state.training.map (info => { return (
                    <div>
                        {info.trainerName} <a href={info.trainerLink}>{info.trainerLink}</a>
                    </div>) })}
                    <br/>
                </TabPanel>

                <TabPanel>
                    <h2>Beneficiaries</h2>
                    {this.state.beneficiaries.map (info => { return (
                    <p>
                        {info.beneficiariesName}
                    </p>) })}
                </TabPanel>

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
                    <h2>Performance</h2>

                    <section className="info">
                    <strong>Our Definition for Success</strong><br/>
                    <span>{this.state.success}</span><br/>
                    </section>

                    <section className="info">
                    <strong>Our Expected Outcome</strong><br/>
                    <span>{this.state.outcome}</span><br/>
                    </section>

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
                                {this.state.ninetydayGoals.map (stuff => { return (
                                <tr>{stuff.category}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.ninetydayGoals.map (stuff => { return (
                                <tr>{stuff.owner}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.ninetydayGoals.map (stuff => { return (
                                <tr>{stuff.smartGoals}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.ninetydayGoals.map (stuff => { return (
                                <tr>{stuff.dateSet}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.ninetydayGoals.map (stuff => { return (
                                <tr>{stuff.endDate}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.ninetydayGoals.map (stuff => { return (
                                <tr>{stuff.goalMet}</tr>) })}
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
                                {this.state.weeklyScore.map (stuff => { return (
                                <tr>{stuff.category}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.weeklyScore.map (stuff => { return (
                                <tr>{stuff.owner}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.weeklyScore.map (stuff => { return (
                                <tr>{stuff.measurable}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.weeklyScore.map (stuff => { return (
                                <tr>{stuff.goal}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.weeklyScore.map (stuff => { return (
                                <tr>{stuff.weekbegin}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.weeklyScore.map (stuff => { return (
                                <tr>{stuff.weekEnd}</tr>) })}
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
                                {this.state.yearand3years.map (stuff => { return (
                                <tr>{stuff.category}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.yearand3years.map (stuff => { return (
                                <tr>{stuff.owner}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.yearand3years.map (stuff => { return (
                                <tr>{stuff.smartGoals}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.yearand3years.map (stuff => { return (
                                <tr>{stuff.dateSet}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.yearand3years.map (stuff => { return (
                                <tr>{stuff.endDate}</tr>) })}
                            </td>
                            <td className="tg-6k2t">
                                {this.state.yearand3years.map (stuff => { return (
                                <tr>{stuff.goalMet}</tr>) })}
                            </td>
                        </tr>
                    </table>
                </TabPanel>
            </Tabs>
        </div>
    </MuiThemeProvider>
  )
  }
}
export default DoerProfile
