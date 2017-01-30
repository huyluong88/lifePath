import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import DoerProfile from './DoerProfile'

class Doers extends Component {
    constructor() {
        super()
        this.state = {
            doers: [],
            name: '',
            details: '',
            contact: '',
            open: false,
            doerResult: []

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
                console.log('data from firebase ', data)
            }
        })
    }
    openProfile(user) {
        console.log(user)
        this.setState({
            name: `${user.general.firstName} ${user.general.lastName}`,
            details: `Type of Entity: ${user.general.toE} Industry: ${user.general.industry} Awards: ${user.general.award}`,
            contact: `Email: ${user.contact.email} Phone: ${user.contact.phone} Website: ${user.contact.website}`,
            open: true
        })
    }

    handleClose = () => this.setState({
        open: !this.state.open
    });
    searchADoer = () => {
        const search = this.searchDoer.value
        console.log(search)
        const mapDoer = this.state.doers.map(doer => {
            return (doer)
        })
        console.log('your doers are ', mapDoer)
        const doer = mapDoer.filter(doer => {
            return (doer.general.firstName == `${search}`)
        })
        console.log('your search result is ', doer)
        if (doer == '') {
            alert('no result')
        } else {
            this.setState({
                doerResult: doer
            })
        }
        this.searchDoer.value = ''
    }
    openSearchDoer(user){
      console.log('searched user is ', user)
    }
    openProfile2(doer){
      this.props.onChange(doer)
    }
  render (){
  const actions = [
    <FlatButton
      label="Close"
      primary={true}
      onClick={this.handleClose}
    />
  ];

  return(
    <div>
      <input placeholder="Search for a doer" ref={element => this.searchDoer = element}/>
      <FlatButton
        label="Search"
        primary={true}
        onClick={this.searchADoer}
      />

      <ul>
        {this.state.doers.map((doer, index) => {
          return (<li onClick={this.openProfile2.bind(this, doer)} key={index}> <Link to ={`/doers/${index}`}>{doer.general.firstName} {doer.general.lastName}</Link></li>)
        })}
      </ul>
        {this.state.doerResult.map(doer=>{
          return (<li onClick={this.openProfile.bind(this, doer)} key={doer}>{doer.general.firstName}</li>)
        })}
    </div>
  )
}


}



export default Doers
