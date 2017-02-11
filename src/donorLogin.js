import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import firebase from './config'
import { Link } from 'react-router';
import pic from './lifepathlogo.png';

const styles = {
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

class donorLogin extends Component {
    constructor() {
        super()
        this.state = {
            donors: [],
            donor: {
                contact: {},
                general: {},
                purpose: {}
            },
            employees: [],
            training: [],
            open: false,
            open2: false,
            open3: false,
            open4: false,
            open5: false,
            open6: false,
            testingPhoto: 'nothing yet',
            capDonor: []
        }
    }
    componentDidMount() {
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
        if (error) {
            alert('wrong password')
        } else if (user) {
            const donorEmail = user.email
            const donor = this.state.donors.filter(donor => {
                return (donor.contact.email == `${donorEmail}`)
            })
            this.setState({
                capDonor: donor.map(key => {
                    return (key.key)
                })
            })
            let storageRef = firebase.storage();
            let starsRef = storageRef.ref(`donor/${donor[0].key}`);
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

            base.syncState(`/donors/${donor[0].key}`, {
                context: this,
                state: 'donor',
                then: (donor) => {
                    this.setState({
                        userName: donorEmail,
                        employees: this.state.donor.employees,
                        training: this.state.donor.training
                    })
                }
            })
        }
    }

    openEditName() {
        this.setState({
            open: true
        })
    }

    changeNames() {
        this.setState({
            donor: {
                general: {
                    organization: this.newOrg.value,
                    firstName: this.newName.value,
                    lastName: this.newLastName.value
                }
            }
        })
    }

    openEditDetails() {
        this.setState({
            open2: true
        })
    }

    changeDetails() {
        this.setState({
            donor: {
                general: {
                    toE: this.newToE.value,
                    industry: this.newIndustry.value,
                    interest: this.newInterest.value
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
        this.setState({
            donor: {
                purpose: {
                    ourStory: this.newStory.value,
                    focusMission: this.newFocus.value,
                    niche: this.newNiche.value
                }
            }
        })
    }

    openContact() {
        this.setState({
            open4: true
        })
    }

    changeContact() {
        this.setState({
            donor: {
                contact: {
                    phone: this.newPhone.value,
                    website: this.newWebsite.value
                }
            }
        })
    }

    openEmp() {
        this.setState({
            open5: true
        })
    }

    addEmp() {
        base.post(`/donors/${this.state.capDonor}/employees/${this.state.employees.length}`, {
            data: {
                employeeName: this.empName.value,
            }
        })
        base.fetch(`donors/${this.state.capDonor}/employees`, {
            context: this,
            asArray: true,
            then: (data) => {
                this.setState({
                    employees: data
                })
                console.log('what is ', data)
            }
        })
    }

    openTrain() {
        this.setState({
            open6: true
        })
    }

    addTrain() {
        base.post(`/donors/${this.state.capDonor}/training/${this.state.training.length}`, {
            data: {
                trainerName: this.trainer.value,
                trainerLink: this.link.value,
            }
        })
        base.fetch(`donors/${this.state.capDonor}/training`, {
            context: this,
            asArray: true,
            then: (data) => {
                this.setState({
                    training: data
                })
                console.log('what is ', data)
            }
        })
    }

    handleClose = () => this.setState({
        open: !this.state.open
    });
    handleClose2 = () => this.setState({
        open2: !this.state.open2
    });
    handleClose3 = () => this.setState({
        open3: !this.state.open3
    });
    handleClose4 = () => this.setState({
        open4: !this.state.open4
    });
    handleClose5 = () => this.setState({
        open5: !this.state.open5
    });
    handleClose6 = () => this.setState({
        open6: !this.state.open6
    });

    deleteEmp(clickedItem) {
        let employees = this.state.employees.filter(info => info !== clickedItem)
        this.setState({
            employees: employees
        })
        base.update(`/donors/${this.state.capDonor}`, {
            data: {
                employees
            }
        })
    }

    deleteTrain(clickedItem) {
        let training = this.state.training.filter(info => info !== clickedItem)
        this.setState({
            training: training
        })
        base.update(`/donors/${this.state.capDonor}`, {
            data: {
                training
            }
        })
    }

    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }

render (){
  console.log("donor key is", this.state.capDonor)
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

const actions5 = [
<RaisedButton
  label="Close"
  primary={true}
  onClick={this.handleClose5}
/>
];

const actions6 = [
<RaisedButton
  label="Close"
  primary={true}
  onClick={this.handleClose6}
/>
];
  console.log("self data is", this.state.donor)
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div className='App'>
        <header className="App-header">
            <div className="logo">
                <img className='logoPic' src={ pic }/>
            </div>
        </header>
        <div className='signInPage'>

        <h1>Login into your Donor account</h1>

        <section hidden={this.state.userName}>
            <TextField ref={input=> this.email = input} floatingLabelText="email" type="text" style={styles} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle} /> <br />
                <TextField ref={input=> this.password = input} floatingLabelText="password" type="password" style={styles} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle} /> <br />

        <RaisedButton label='Login' backgroundColor='#d15e29' onClick={this.logIn.bind(this)} className="buttons"/>

        </section>
        <RaisedButton label="Logout" hidden={!this.state.userName} backgroundColor='#d15e29' disabled={true===! this.state.userName} onClick={this.logOut.bind(this)} className='buttons'/>

        <RaisedButton label="Home" backgroundColor='#d15e29' className="buttons" href='/'/>
        </div>
        <div hidden={!this.state.userName}>

            <img className='logoPic' src={this.state.testingPhoto}/>

            <Tabs onSelect={this.handleSelect} selectedIndex={2}>
                <TabList>
                    <Tab className='tab'>Employees</Tab>
                    <Tab className='tab'>Training</Tab>
                    <Tab className='tab'>About</Tab>
                </TabList>
                <TabPanel>
                    <section className="info">
                        <h2>Employees</h2>
                        <FlatButton label="Add Employees" primary={true} onClick={this.openEmp.bind(this)}/>
                    </section>
                    {this.state.employees.map (info => { return (
                    <p onDoubleClick={this.deleteEmp.bind(this, info)}>
                        {info.employeeName}
                    </p>) })}
                    <br/>

                </TabPanel>

                <TabPanel>
                    <section className="info">
                        <h2>Training</h2>
                        <FlatButton label="Add Training Data" primary={true} onClick={this.openTrain.bind(this)}/>
                    </section>
                    <strong>Trainer & Video: </strong>{this.state.training.map (info => { return (
                    <div onDoubleClick={this.deleteTrain.bind(this, info)}>
                        {info.trainerName} <a href={info.trainerLink}>{info.trainerLink}</a>
                    </div>) })}
                    <br/>
                </TabPanel>

                <TabPanel>
                    <section className="info">
                        <h2>About</h2>

                        <FlatButton label="Edit Name" primary={true} onClick={this.openEditName.bind(this)}/>
                    </section>
                    Organization: {this.state.donor.general.organization}
                    <p>{this.state.donor.general.firstName} {this.state.donor.general.lastName}</p>


                    <section className="info">
                        <h2>Details</h2>
                        <FlatButton label="Edit Details" primary={true} onClick={this.openEditDetails.bind(this)}/>
                    </section>
                    <strong>Type of Entity: </strong><span>{this.state.donor.general.toE}</span><br/>
                    <strong>Industry: </strong><span>{this.state.donor.general.industry}</span><br/>
                    <strong>Interest: </strong><span>{this.state.donor.general.interest}</span><br/>


                    <section className="info">
                        <h2>Purpose</h2>
                        <FlatButton label="Edit Purpose" primary={true} onClick={this.openPurpose.bind(this)}/>
                    </section>
                    <strong>Our Story: </strong><span>{this.state.donor.purpose.ourStory}</span><br/>
                    <strong>Focus/Mission: </strong><span>{this.state.donor.purpose.focusMission}</span><br/>
                    <strong>niche: </strong><span>{this.state.donor.purpose.niche}</span>


                    <section className="info">
                        <h2>Contact Information</h2>
                        <FlatButton label="Edit Contact Info" primary={true} onClick={this.openContact.bind(this)}/>
                    </section>
                    <strong>email: </strong><span>{this.state.donor.contact.email}</span><br/>
                    <strong>phone: </strong><span>{this.state.donor.contact.phone}</span><br/>
                    <strong>website: </strong><span>{this.state.donor.contact.website}</span><br/>
                </TabPanel>
            </Tabs>


        </div>

        <Dialog title="Change Organization, First, & Last Name" actions={actions} open={this.state.open}>
            <input type="text" placeholder="organization name" ref={element=> this.newOrg = element} defaultValue={this.state.donor.general.organization} />
            <br/>
            <input type="text" placeholder="change first name" ref={element=> this.newName = element} defaultValue={this.state.donor.general.firstName}/>
            <br/>
            <input type="text" placeholder="change last name" ref={element=> this.newLastName = element} defaultValue={this.state.donor.general.lastName}/>
            <br/>
            <RaisedButton label="Submit" primary={true} onClick={this.changeNames.bind(this)}/>
        </Dialog>

        <Dialog title="Change All Details" actions={actions2} open={this.state.open2}>
            <input type="text" placeholder="change Type of Entity" ref={element=> this.newToE = element} defaultValue={this.state.donor.general.toE}/>
            <br/>
            <input type="text" placeholder="Industry" ref={element=> this.newIndustry = element} defaultValue={this.state.donor.general.industry}/>
            <br/>
            <input type="text" placeholder="Interest" ref={element=> this.newInterest = element} defaultValue={this.state.donor.general.interest}/>
            <br/>
            <RaisedButton label="Submit" primary={true} onClick={this.changeDetails.bind(this)}/>
        </Dialog>

        <Dialog title="Change All Purpose Sections" actions={actions3} open={this.state.open3}>
            <input type="text" placeholder="change Type of Story" ref={element=> this.newStory = element} defaultValue={this.state.donor.purpose.ourStory}/>
            <br/>
            <input type="text" placeholder="Focus/Mission" ref={element=> this.newFocus = element} defaultValue={this.state.donor.purpose.focusMission}/>
            <br/>
            <input type="text" placeholder="Niche" ref={element=> this.newNiche = element} defaultValue={this.state.donor.purpose.niche}/>
            <br/>
            <RaisedButton label="Submit" primary={true} onClick={this.changePurpose.bind(this)}/>
        </Dialog>

        <Dialog title="Change All Contact Information" actions={actions4} open={this.state.open4}>
            <input type="text" placeholder="change phone" ref={element=> this.newPhone = element} defaultValue={this.state.donor.contact.phone}/>
            <br/>
            <input type="text" placeholder="change website" ref={element=> this.newWebsite = element} defaultValue={this.state.donor.contact.website}/>
            <br/>
            <RaisedButton label="Submit" primary={true} onClick={this.changeContact.bind(this)}/>
        </Dialog>

        <Dialog title="Add Employees" actions={actions5} open={this.state.open5}>
            <input placeholder="Employee Name" ref={element=> this.empName = element}/>
            <RaisedButton label="Add" primary={true} onClick={this.addEmp.bind(this)}/>
        </Dialog>

        <Dialog title="Add Training Information" actions={actions6} open={this.state.open6}>
            <input placeholder="Trainer Name" ref={element=> this.trainer = element}/>
            <input placeholder="Training Link" ref={element=> this.link = element}/>
            <RaisedButton label="Add Training" primary={true} onClick={this.addTrain.bind(this)}/>
        </Dialog>

    </div>
    </MuiThemeProvider>

  )
  }
}
export default donorLogin
