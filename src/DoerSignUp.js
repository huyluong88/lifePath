import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import './index.css';
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
const style2 = {
    backgroundColor: '#5b453b',
    // width: 200,
}
const style3 = {
    marginLeft: 300,
    marginRight: 300,
}


class DoerSignUp extends Component {
    constructor() {
        super()
        this.state = {
            doers: [],
            disabled: false,
            open: false,
            uploadImage: ''
        }
    }
    componentDidMount() {
        base.syncState('doers', {
            state: 'doers',
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
    addDoer(e) {
        e.preventDefault()
        const firstName = this.firstN.input.value
        const lastName = this.lastN.input.value
        const password = this.password.input.value
        let doersArr = this.state.doers.length
        const storageRef = firebase.storage().ref(`doer/${doersArr}`)
        const task = storageRef.put(this.state.uploadImage)
        if (firstName.length === 0 && lastName.length === 0) {
            alert('enter a first and last name')
        } else if (firstName.length < 2 && lastName.length < 2) {
            alert('enter a valid name')
        } else if (password.length < 6) {
            alert('password must be 6 or more characters')
        } else {
            let newDoer = {
                general: {
                    organization: this.organization.input.value,
                    firstName: this.firstN.input.value,
                    lastName: this.lastN.input.value,
                    toE: this.toE.value,
                    industry: "",
                    award: "",
                },
                purpose: {
                    ourStory: "",
                    focusMission: "",
                    niche: ""
                },
                contact: {
                    email: this.email.input.value,
                    phone: "",
                    website: ""
                },
                success: "Definie Sucess",
                outcome: "Define Outcome",
                beneficiaries: [{
                    beneficiariesName: "Add Beneficiary Name"
                }, ],
                training: [{
                    trainerName: "Name of Trainer",
                    trainerLink: "URL"
                }, ],
                key: this.state.doers.length,
                performance: {
                    ninetydayGoals: [{
                        category: "Fundraising",
                        owner: "Esther",
                        smartGoals: "Donors Calls",
                        dateSet: "06-03-2016",
                        endDate: "07-14-2016",
                        goalMet: "Yes"
                    }],
                    weeklyScore: [{
                        category: "Marketing",
                        owner: "Jewel",
                        measurable: "Facebook Post",
                        goal: "2",
                        weekbegin: "06-03-2016",
                        weekEnd: "07-14-2016"
                    }],
                    yearand3years: [{
                        category: "Finance/Acct",
                        owner: "Michael",
                        smartGoals: "Reconcile Accounts",
                        dateSet: "06-03-2016",
                        endDate: "07-14-2016",
                        goalMet: "No"
                    }]
                }
            }
            let newDoersArray = this.state.doers.concat(newDoer)
            base.createUser({
                email: this.email.input.value,
                password: password
            }, () => {
                this.setState({
                    open: true
                }, () => {
                    this.firstN.input.value = '',
                        this.lastN.input.value = '',
                        this.email.input.value = '',
                        this.password.input.value = '',
                        this.organization.input.value = ''
                })
            })
            this.setState({
                doers: newDoersArray
            })
        }
    }

    handleFile(e) {
        let reader = new FileReader()
        let file = e.target.files[0];
        const storageRef = firebase.storage().ref('File')
        const task = storageRef.put(file)
    }


render (){
  console.log('doers in DB ', this.state.doers.length)

  return(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <section className="userCreation">
        <header className="App-header">
            <div className="logo">
                <img src={ pic }/>
            </div>
        </header>

        <h1>Create your Doer account</h1>
        <TextField className='input' ref={input=> this.organization = input} floatingLabelText="Organization Name" type="text" style={style} floatingLabelStyle={style.floatingLabelStyle} underlineFocusStyle={style.underlineStyle}/> <br/>
            <TextField className='input' ref={input=> this.firstN = input} floatingLabelText="First Name" type="text" style={style} floatingLabelStyle={style.floatingLabelStyle} underlineFocusStyle={style.underlineStyle}/> <br/>
                <TextField ref={input=> this.lastN = input} floatingLabelText="Last Name" type="text" style={style} floatingLabelStyle={style.floatingLabelStyle} underlineFocusStyle={style.underlineStyle} /> <br/>
                    <TextField ref={input=> this.email = input} floatingLabelText="email" type="text" style={style} floatingLabelFixed={false} floatingLabelStyle={style.floatingLabelStyle} underlineFocusStyle={style.underlineStyle} /> <br/>
                        <TextField ref={input=> this.password = input} floatingLabelText="password" type="password" style={style} floatingLabelStyle={style.floatingLabelStyle} underlineFocusStyle={style.underlineStyle} /> <br />

                            <div className='userSignUp2'>
                                Type of Entity:
                                <select className='select-style' name='ToE' ref={element=> this.toE = element}>
              <option value='Company'>Company</option>
              <option value='Foundation'>Foundation</option>
              <option value='Non-Profit'>Non-Profit</option>
            </select> <br/>
                                <h1>Upload your profile image</h1>
                                <input className='upload' type='file' ref={element=> this.photo = element} onChange={(e)=>this.handleImageChange(e)}/>

                            </div>
                            <div className='userSignUp'>
                                <RaisedButton label="Submit" backgroundColor='#d15e29' className='subButtons' onClick={this.addDoer.bind(this)}/> <br/>

                                <Link to="/doerLogin">
                                <RaisedButton label="Login" backgroundColor='#d15e29' className="buttons" />
                                </Link>
                            </div>
                            <Snackbar open={this.state.open} message="Thank you for signing up" autoHideDuration={5000} />
    </section>
</MuiThemeProvider>
  )
}
}
export default DoerSignUp
