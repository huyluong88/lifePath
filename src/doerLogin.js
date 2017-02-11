import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';
import firebase from './config'
import './index.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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
                success: "",
                beneficiaries: {},
                accountability: {},
                purpose: {},
            },
            ninetydayGoals: [],
            weeklyScore: [],
            yearand3years: [],
            beneficiaries: [],
            training: [],
            open: false,
            open2: false,
            open3: false,
            open4: false,
            open5: false,
            open6: false,
            open7: false,
            open8: false,
            open9: false,
            open10: false,
            open11: false,
            testingPhoto: 'nothing yet',
            capDoer: [],
            getDoc: '',
            text:''
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
            this.setState ({
             capDoer: doer.map (key => {
               return (key.key)
             })
           })
            let storageRef = firebase.storage();
            let starsRef = storageRef.ref(`doer/${doer[0].key}`);
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
            base.syncState(`/doers/${doer[0].key}`, {
                context: this,
                state: 'doer',
                then: (doer) => {
                    this.setState({
                        userName: doerEmail,
                        beneficiaries: this.state.doer.beneficiaries,
                        training: this.state.doer.training,
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
    changeNames() {
        this.setState({
            doer: {
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
      base.post(`/doers/${this.state.capDoer}/performance/ninetydayGoals/${this.state.ninetydayGoals.length}`,{
             data: {
                       category: this.category.value,
                       owner: this.owner.value,
                       smartGoals: this.smartGoals.value,
                       dateSet: this.dateSet.value,
                       endDate: this.datesend.value,
                       goalMet: this.goal.value
             }
           })
           base.fetch(`doers/${this.state.capDoer}/performance/ninetydayGoals`, {
             context: this,
             asArray: true,
             then: (data) => {
               this.setState({
               ninetydayGoals: data
             })
             console.log('what is ', data)
           }
           })
    }
    openScore() {
        this.setState({
            open6: true
        })
    }
    addScore() {
      base.post(`/doers/${this.state.capDoer}/performance/weeklyScore/${this.state.weeklyScore.length}`,{
             data: {
               category: this.weeklyCategory.value,
               owner: this.weeklyOwner.value,
               measurable: this.measurable.value,
               goal: this.weeklyGoal.value,
               weekbegin: this.weeklyDatestart.value,
               weekEnd: this.weeklyDatesend.value
             }
           })
           base.fetch(`doers/${this.state.capDoer}/performance/weeklyScore`, {
             context: this,
             asArray: true,
             then: (data) => {
               this.setState({
               weeklyScore: data
             })
             console.log('what is ', data)
           }
           })
    }
    openYear() {
        this.setState({
            open7: true
        })
    }
    addYear() {
      base.post(`/doers/${this.state.capDoer}/performance/yearand3years/${this.state.yearand3years.length}`,{
             data: {
               category: this.yearCategory.value,
               owner: this.yearOwner.value,
               smartGoals: this.yearSmartGoals.value,
               dateSet: this.yearDatestart.value,
               endDate: this.yearDatesend.value,
               goalMet: this.yearGoal.value
             }
           })
           base.fetch(`doers/${this.state.capDoer}/performance/yearand3years`, {
             context: this,
             asArray: true,
             then: (data) => {
               this.setState({
               yearand3years: data
             })
             console.log('what is ', data)
           }
           })
    }
    openTrain() {
     this.setState({
       open8: true
     })
   }

   addTrain () {
     base.post(`/doers/${this.state.capDoer}/training/${this.state.training.length}`,{
            data: {
              trainerName: this.trainer.value,
              trainerLink: this.link.value,
            }
          })
          base.fetch(`doers/${this.state.capDoer}/training`, {
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

   openBen() {
     this.setState({
       open9: true
     })
   }

   addBen () {
     base.post(`/doers/${this.state.capDoer}/beneficiaries/${this.state.beneficiaries.length}`,{
            data: {
              beneficiariesName: this.benName.value,
            }
          })
          base.fetch(`doers/${this.state.capDoer}/beneficiaries`, {
            context: this,
            asArray: true,
            then: (data) => {
              this.setState({
              beneficiaries: data
            })
            console.log('what is ', data)
          }
          })
   }

   openDef() {
     this.setState({
       open10: true
     })
   }

   addSuc() {
     this.setState({
         doer: {
             success: this.newSuc.value
         }
     })
   }

   openOut() {
     this.setState({
       open11: true
     })
   }

   addOut() {
     this.setState({
         doer: {
             outcome: this.newOut.value
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
    handleClose7 = () => this.setState({
        open7: !this.state.open7
    });
    handleClose8 = () => this.setState({
       open8: !this.state.open8
   });
   handleClose9 = () => this.setState({
       open9: !this.state.open9
   });
   handleClose10 = () => this.setState({
       open10: !this.state.open10
   });
   handleClose11 = () => this.setState({
       open11: !this.state.open11
   });

   deleteTrain (clickedItem){
     let training = this.state.training.filter(info =>info !==clickedItem)
     this.setState({
       training: training
     })
     base.update (`/doers/${this.state.capDoer}`,{
       data: {
         training
       }
     })
   }

   deleteBen (clickedItem){
     let beneficiaries = this.state.beneficiaries.filter(info =>info !==clickedItem)
     this.setState({
       beneficiaries: beneficiaries
     })
     base.update (`/doers/${this.state.capDoer}`,{
       data: {
         beneficiaries
       }
     })
   }
    delete90TableItem (clickedItem){
          console.log('clicked item name is ', clickedItem)
          let ninetydayGoals = this.state.ninetydayGoals.filter(cat=>cat !==clickedItem)
          this.setState({
            ninetydayGoals: ninetydayGoals
          })
          base.update (`/doers/${this.state.capDoer}/performance/`,{
            data: {
              ninetydayGoals
            }
          })
        }
        deleteWeeklyTableItem(clickedItem){
          let weeklyScore = this.state.weeklyScore.filter(cat=>cat !==clickedItem)
          this.setState({
            weeklyScore: weeklyScore
          })
          base.update (`/doers/${this.state.capDoer}/performance/`,{
            data: {
              weeklyScore
            }
          })
        }
        deleteYearlyTableItem(clickedItem){
          let yearand3years = this.state.yearand3years.filter(cat=>cat !==clickedItem)
          this.setState({
            yearand3years: yearand3years
          })
          base.update (`/doers/${this.state.capDoer}/performance/`,{
            data: {
              yearand3years
            }
          })
        }
        handleChangeDocs(e){
            e.preventDefault()
            let reader = new FileReader()
            let file = e.target.files[0];
            let doersArr = this.state.doers.length - 1
            console.log('arr length is ', doersArr)
            const storageRef = firebase.storage().ref(`doer/docs/${doersArr}`)
            const task = storageRef.put(file)
        }
        getDocs(){
          let storageRef = firebase.storage();
          let starsRef = storageRef.ref(`doer/docs/${this.state.capDoer}`);
          starsRef.getDownloadURL().then((url) => {
              console.log('DL is ', url)
              this.setState({
                getDoc: url
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
        }
        handleChange(event) {

            this.setState({ text: event.target.value });
          }

          overflowAlert() {
              if (this.remainingCharacters() < 0) {
                  var beforeOverflowText = this.state.text.substring(200 - 10, 200);
                  var overflowText = this.state.text.substring(200);
                return (
                  <div className="alert alert-warning">
                    <strong>Oops! Too Long:</strong>
                    &nbsp;...{beforeOverflowText}
                    <strong className="bg-danger">{overflowText}</strong>
                  </div>
                );
              } else {
                return "";
              }
            }

            remainingCharacters() {
                  return 200 - this.state.text.length;
              }

              handleSelect(index, last) {
                 console.log('Selected tab: ' + index + ', Last tab: ' + last);
               }

    render (){
      console.log("donor key is", this.state.capDoer)

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
  const actions8 = [
   <RaisedButton
     label="Close"
     primary={true}
     onClick={this.handleClose8}
     />
 ];
 const actions9 = [
   <RaisedButton
     label="Close"
     primary={true}
     onClick={this.handleClose9}
     />
 ];

 const actions10 = [
   <RaisedButton
     label="Close"
     primary={true}
     onClick={this.handleClose10}
     />
 ];

 const actions11 = [
   <RaisedButton
     label="Close"
     primary={true}
     onClick={this.handleClose11}
     />
 ];

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div className='App'>
    <header className="App-header">
      <div className="logo">
        <img src= { pic }/>
      </div>
    </header>

    <h1>Login into your Doer account</h1>
    <section hidden={this.state.userName}>
    <TextField
      ref={input => this.email = input}
      floatingLabelText="email"
      type="text"
      style={styles}
      floatingLabelStyle={styles.floatingLabelStyle}
      underlineFocusStyle={styles.underlineStyle}
     /> <br />
     <TextField
      ref={input => this.password = input}
      floatingLabelText="password"
      type="password"
      style={styles}
      floatingLabelStyle={styles.floatingLabelStyle}
      underlineFocusStyle={styles.underlineStyle}
     /> <br />

     <div className='userLogin'>
     <RaisedButton
     label='Login'
     backgroundColor='#d15e29 '
     onClick={this.logIn.bind(this)}/>
     </div>
    </section>

    <RaisedButton
       label="Logout"
       hidden={!this.state.userName}
       backgroundColor='#d15e29 '
       disabled={true === !this.state.userName}
       onClick={this.logOut.bind(this)}
    />
       <Link to ="/">
       <RaisedButton label="Back to home" backgroundColor='#d15e29' className="buttons"/>
       </Link>

      <div hidden={!this.state.userName}>
        <img src={this.state.testingPhoto}/>
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={2}>
          <TabList>
                    <Tab className='tab'>About</Tab>
                    <Tab className='tab'>Beneficiaries</Tab>
                    <Tab className='tab'>Training</Tab>
                    <Tab className='tab'>Performance</Tab>
                    <Tab className='tab'>Accountability</Tab>
          </TabList>
          <TabPanel>
            <h2>About</h2>
          <section className="info">
          <FlatButton label="Edit Name" primary={true}
            onClick={this.openEditName.bind(this)}/>
          </section>
            Organization: {this.state.doer.general.organization}
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
            </TabPanel>

            <TabPanel>
            <h2>Beneficiaries</h2>
            <section className="info">
            <FlatButton label="Add Beneficiaries" primary={true}
              onClick={this.openBen.bind(this)}/>
            </section>
              {this.state.beneficiaries.map (info => {
                return (<p onDoubleClick={this.deleteBen.bind(this, info)}>
                          {info.beneficiariesName}
                        </p>)
              })}<br/>
            </TabPanel>

            <TabPanel>
              <h2>Training</h2>
              <section className="info">
                <FlatButton label="Add Training Data" primary={true}
                   onClick={this.openTrain.bind(this)}/>
             </section>
                       <strong>Trainer & Video: </strong>{this.state.training.map (info => {
                           return (<div onDoubleClick={this.deleteTrain.bind(this, info)}>
                                     {info.trainerName} <a href={info.trainerLink}>{info.trainerLink}</a>
                                     </div>)
                           })}<br/>
              </TabPanel>

              <TabPanel>
              <h2>Performance</h2>
                             <section className="info">
                             <h2>Define Success</h2>
                             </section>
                               <strong>Our Definition for Success</strong>
                               <FlatButton label="Define It" primary={true}
                                 onClick={this.openDef.bind(this)}/><br/>
                               <span>{this.state.doer.success}</span><br/>

                               <section className="info">
                               <h2>Expected Outcome</h2>
                               </section>
                                 <strong>Our Expected Outcome</strong>
                                 <FlatButton label="What to Expect" primary={true}
                                   onClick={this.openOut.bind(this)}/><br/>
                                 <span>{this.state.doer.outcome}</span><br/>


              <section className="info">
                <strong>90 Day Goals(no less than 4, no more than 6 rows)</strong>
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
                     {this.state.ninetydayGoals.map (cat => {
                       return (<tr onDoubleClick={this.delete90TableItem.bind(this, cat)}>{cat.category}
                        </tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (owner => {
                       return (<tr >{owner.owner}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (smartG => {
                       return (<tr >{smartG.smartGoals}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (dateS => {
                       return (<tr >{dateS.dateSet}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (endD => {
                       return (<tr >{endD.endDate}</tr>)
                     })}
                   </td>
                   <td className="tg-6k2t">
                     {this.state.ninetydayGoals.map (goalM => {
                       return (<tr >{goalM.goalMet}</tr>)
                     })}
                   </td>
                   </tr>
                   </table><br/>

                   <section className="info">
                   <strong>Weekly Score(up to 15 lines)</strong>
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
                      {this.state.weeklyScore.map (cat => {
                        return (<tr onDoubleClick={this.deleteWeeklyTableItem.bind(this, cat)}>{cat.category}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.weeklyScore.map (owner => {
                        return (<tr >{owner.owner}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.weeklyScore.map (measurable => {
                        return (<tr >{measurable.measurable}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.weeklyScore.map (goal => {
                        return (<tr >{goal.goal}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.weeklyScore.map (weekB => {
                        return (<tr >{weekB.weekbegin}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.weeklyScore.map (weekE => {
                        return (<tr >{weekE.weekEnd}</tr>)
                      })}
                    </td>
                    </tr>
                   </table><br/>

                   <section className="info">
                   <strong>1 and 3 Year Goal(no less than 1, no more than 7 rows)</strong>
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
                      {this.state.yearand3years.map (cat => {
                        return (<tr onDoubleClick={this.deleteYearlyTableItem.bind(this, cat)}>{cat.category}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.yearand3years.map (owner => {
                        return (<tr >{owner.owner}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.yearand3years.map (smartG => {
                        return (<tr >{smartG.smartGoals}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.yearand3years.map (dataS => {
                        return (<tr >{dataS.dateSet}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.yearand3years.map (endD => {
                        return (<tr >{endD.endDate}</tr>)
                      })}
                    </td>
                    <td className="tg-6k2t">
                      {this.state.yearand3years.map (goalM => {
                        return (<tr >{goalM.goalMet}</tr>)
                      })}
                    </td>
                    </tr>
                   </table>
                   </TabPanel>

                   <TabPanel>
                     <h2>Accountability</h2>
                     <h5>Upload a document</h5>
                     <input className='upload' type='file' onChange={(e)=>this.handleChangeDocs(e)}/>
                     <RaisedButton
                     label='Retrieve doc'
                     backgroundColor='#d15e29'
                     onClick={this.getDocs.bind(this)}/>
                     Instruction: Retrieve your document first before visiting the link.
                     Your doc: <a href={this.state.getDoc}>Link to yout doc</a>
                   </TabPanel>
                 </Tabs>
               </div>

             <Dialog
               title="Change Organization, First, & Last Name"
               actions={actions}
               open={this.state.open}
              >
              <input type="text" placeholder="organization name"
              ref={element => this.newOrg = element}
              defaultValue={this.state.doer.general.organization}
              /><br/>
              <input type="text" placeholder="change first name"
              ref={element => this.newName = element}
              defaultValue={this.state.doer.general.firstName}
              /><br/>
              <input type="text" placeholder="change last name"
              ref={element => this.newLastName = element}
              defaultValue={this.state.doer.general.lastName}
              /><br/>
              <RaisedButton label="Submit" primary={true} onClick={this.changeNames.bind(this)}/>
              </Dialog>

              <Dialog
                 title="Change All Details"
                 actions={actions2}
                 open={this.state.open2}>
                 <input type="text" placeholder="change Type of Entity"
                 contentEditable= {true}  ref={element => this.newToE = element}
                 defaultValue={this.state.doer.general.toE}
                 /><br/>
                 <input type="text" placeholder="Industry"
                 ref={element => this.newIndustry = element}
                 defaultValue={this.state.doer.general.industry}
                 /><br/>
                 <input type="text" placeholder="Award"
                 ref={element => this.newAward = element}
                 defaultValue={this.state.doer.general.award}
                 /><br/>
                 <RaisedButton label="Submit" primary={true} onClick={this.changeDetails.bind(this)}/>
              </Dialog>

              <Dialog
                 title="Change All Purpose Sections"
                 actions={actions3}
                 open={this.state.open3}>
                 <input type="text" placeholder="change Type of Story"
                 ref={element => this.newStory = element}
                 defaultValue={this.state.doer.purpose.ourStory}
                 /><br/>
                 <input type="text" placeholder="Focus/Mission"
                 ref={element => this.newFocus = element}
                 defaultValue={this.state.doer.purpose.focusMission}
                 /><br/>
                 <input type="text" placeholder="Niche"
                 ref={element => this.newNiche = element}
                 defaultValue={this.state.doer.purpose.niche}
                 /><br/>
                 <RaisedButton label="Submit" primary={true} onClick={this.changePurpose.bind(this)}/>
              </Dialog>

              <Dialog
                 title="Change All Contact Information"
                 actions={actions4}
                 open={this.state.open4}>
                 <input type="text" placeholder="change phone"
                 ref={element => this.newPhone = element}
                 defaultValue={this.state.doer.contact.phone}
                 /><br/>
                 <input type="text" placeholder="change website"
                 ref={element => this.newWebsite = element}
                 defaultValue={this.state.doer.contact.website}
                 /><br/>
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

          <Dialog
              title="Add Training Information"
              actions={actions8}
              open={this.state.open8}>
              <input placeholder="Trainer Name" ref={element => this.trainer = element}/>
              <input placeholder="Training Link" ref={element => this.link = element}/>
              <RaisedButton label="Add Training" primary={true} onClick={this.addTrain.bind(this)}/>
           </Dialog>

           <Dialog
              title="Add Beneficiary Name"
              actions={actions9}
              open={this.state.open9}>
              <input placeholder="Beneficiary Name" ref={element => this.benName = element}/>
              <RaisedButton label="Add Beneficiary" primary={true} onClick={this.addBen.bind(this)}/>
            </Dialog>

            <Dialog
               title="Define Success"
               actions={actions10}
               open={this.state.open10}>
               <div>
                 { this.overflowAlert() }
                 <textarea className="form-control"
                 onChange={this.handleChange.bind(this)} ref={element => this.newSuc = element}></textarea>
                 <span>{this.remainingCharacters()}</span>
              </div>
               <RaisedButton label="Add Success" primary={true} onClick={this.addSuc.bind(this)}/>
             </Dialog>

             <Dialog
                title="What Do We Expect"
                actions={actions11}
                open={this.state.open11}>
                <div>
                  { this.overflowAlert() }
                  <textarea className="form-control"
                  onChange={this.handleChange.bind(this)} ref={element => this.newOut = element}></textarea>
                  <span>{this.remainingCharacters()}</span>
               </div>
                <RaisedButton label="Add Outcome" primary={true} onClick={this.addOut.bind(this)}/>
              </Dialog>
</div>
</MuiThemeProvider>
)
}
}
export default doerLogin
