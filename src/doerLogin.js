import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import firebase from './config'
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const style = {
    marginLeft: 20,
    Color: 'red',
};
const style2 = {
    backgroundColor: '#5b453b ',
    // width: 200,
}
class doerLogin extends Component {
    constructor() {
        super()
        this.state = {
            doers: [],
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
            open: false,
            open2: false,
            open3: false,
            open4: false,
            open5: false,
            open6: false,
            open7: false,
            testingPhoto: 'nothing yet'
        }
    }
    componentDidMount() {
        base.fetch('doers', {
            context: this,
            asArray: true,
            then: (data) => {
                this.setState({
                    doers: data
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
            const doerEmail = user.email
            const doer = this.state.doers.filter(doer => {
                return (doer.contact.email == `${doerEmail}`)
            })
            let storageRef = firebase.storage();
            let starsRef = storageRef.ref(`doer/${doer[0].key}`);
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
            base.syncState(`/doers/${doer[0].key}`, {
                context: this,
                state: 'doer',
                then: (doer) => {
                    this.setState({
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
        this.setState({
            open: true
        })
    }
    changeName() {
        this.setState({
            doer: {
                general: {
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
            doer: {
                general: {
                    toE: this.newToE.value,
                    industry: this.newIndustry.value,
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
        this.setState({
            doer: {
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
            doer: {
                contact: {
                    phone: this.newPhone.value,
                    website: this.newWebsite.value
                }
            }
        })
    }
    openGoal() {
        this.setState({
            open5: true
        })
    }
    addGoal() {
        let newGoal = [{
            category: this.category.value,
            owner: this.owner.value,
            smartGoals: this.smartGoals.value,
            dateSet: this.dateSet.value,
            endDate: this.datesend.value,
            goalMet: this.goal.value
        }]
        let addedGoals = this.state.ninetydayGoals.concat(newGoal)
        this.setState({
            ninetydayGoals: addedGoals
        })
    }
    openScore() {
        this.setState({
            open6: true
        })
    }
    addScore() {
        let newScore = [{
            category: this.weeklyCategory.value,
            owner: this.weeklyOwner.value,
            measurable: this.measurable.value,
            goal: this.weeklyGoal.value,
            weekbegin: this.weeklyDatestart.value,
            weekEnd: this.weeklyDatesend.value
        }]
        let addedScore = this.state.weeklyScore.concat(newScore)
        this.setState({
            weeklyScore: addedScore
        })
    }
    openYear() {
        this.setState({
            open7: true
        })
    }
    addYear() {
        let newYear = [{
            category: this.yearCategory.value,
            owner: this.yearOwner.value,
            smartGoals: this.yearSmartGoals.value,
            dateSet: this.yearDatestart.value,
            endDate: this.yearDatesend.value,
            goalMet: this.yearGoal.value
        }]
        let addedYear = this.state.yearand3years.concat(newYear)
        this.setState({
            yearand3years: addedYear
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
    handleClose7 = () => this.setState({
        open7: !this.state.open7
    });render (){
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
  const actions7 = [
    <RaisedButton
      label="Close"
      primary={true}
      onClick={this.handleClose7}
      />
  ];
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <div>
    <h1>Login into your Doer account</h1>
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
     backgroundColor='#d15e29 '
     onClick={this.logIn.bind(this)}/>
    </section>
    <RaisedButton
       label="Logout"
       hidden={!this.state.userName}
       backgroundColor='#d15e29 '
       disabled={true === !this.state.userName}
       onClick={this.logOut.bind(this)}/>
      <div hidden={!this.state.userName}>
        <img src={this.state.testingPhoto}/>
          <section className="info">
          <h2>Name</h2>
          <FlatButton label="Edit Name" primary={true}
            onClick={this.openEditName.bind(this)}/>
          </section>
            <p>{this.state.doer.general.firstName} {this.state.doer.general.lastName}</p>
          <section className="info">
          <h2>Details</h2>
          <FlatButton label="Edit Details" primary={true}
            onClick={this.openEditDetails.bind(this)}/>
          </section>
            <strong>Type of Entity: </strong><span>{this.state.doer.general.toE}</span><br/>
            <strong>Industry: </strong><span>{this.state.doer.general.industry}</span><br/>
            <strong>Award: </strong><span>{this.state.doer.general.award}</span>
          <section className="info">
          <h2>Purpose</h2>
          <FlatButton label="Edit Purpose" primary={true}
            onClick={this.openPurpose.bind(this)}/>
          </section>
            <strong>Our Story: </strong><span>{this.state.doer.purpose.ourStory}</span><br/>
            <strong>Focus/Mission: </strong><span>{this.state.doer.purpose.focusMission}</span><br/>
            <strong>niche: </strong><span>{this.state.doer.purpose.niche}</span>
            <section className="info">
            <h2>Contact Information</h2>
            <FlatButton label="Edit Contact Info" primary={true}
              onClick={this.openContact.bind(this)}/>
            </section>
              <strong>email: </strong><span>{this.state.doer.contact.email}</span><br/>
              <strong>phone: </strong><span>{this.state.doer.contact.phone}</span><br/>
              <strong>website: </strong><a href={this.state.doer.contact.website}>{this.state.doer.contact.website}</a><br/>
              <h2>Performance</h2>
              <section className="info">
                <strong>90 Day Goals</strong>
                <FlatButton label="Add Goal" primary={true}
                  onClick={this.openGoal.bind(this)}/>
              </section>
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

                   <section className="info">
                   <strong>Weekly Score</strong>
                   <FlatButton label="Add Score" primary={true}
                     onClick={this.openScore.bind(this)}/>
                   </section>
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

                   <section className="info">
                   <strong>1 and 3 Year Goal</strong>
                   <FlatButton label="Add Year Goals" primary={true}
                     onClick={this.openYear.bind(this)}/>
                   </section>
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
                 contentEditable= {true}  ref={element => this.newToE = element}/><br/>
                 <input type="text" placeholder="Industry"
                 ref={element => this.newIndustry = element}/><br/>
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

              <Dialog
                 title="Add Goal"
                 actions={actions5}
                 open={this.state.open5}>
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
                Date Started: <input type="date"  ref={element => this.dateSet = element}/>
                Date End: <input type="date"  ref={element => this.datesend = element}/>
                Goal Met:
                <select ref={element => this.goal = element}>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
                <RaisedButton label="+" primary={true} onClick={this.addGoal.bind(this)}/>
              </Dialog>

              <Dialog
                 title="Add Score"
                 actions={actions6}
                 open={this.state.open6}>
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
                 <RaisedButton label="+" primary={true} onClick={this.addScore.bind(this)}/>
              </Dialog>

              <Dialog
                 title="Add Score"
                 actions={actions7}
                 open={this.state.open7}>
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
<RaisedButton label="+" primary={true} onClick={this.addYear.bind(this)}/>
</Dialog>
</div>
</MuiThemeProvider>
)
}
}
export default doerLogin
