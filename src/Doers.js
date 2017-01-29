import React, { Component } from 'react';
import base  from './config';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

class Doers extends Component {
    constructor() {
        super()
        this.state = {
            doers: [],
            name: '',
            details: '',
            contact: '',
            open: false,
            doerResult: ''

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
                console.log(data)
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
            return (doer.general.firstName)
        })
        console.log('your doers are ', mapDoer)
        const doer = mapDoer.filter(doer => {
            return (doer == `${search}`)
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
          return (<li onClick={this.openProfile.bind(this, doer)} key={index}> {doer.general.firstName} {doer.general.lastName}</li>)
        })}
      </ul>
      <Dialog
          title="Doer Information"
          actions={actions}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
        <h3> Name </h3>
        {this.state.name}

        <h3>Details</h3>
        {this.state.details}

        <h3> Contact Information </h3>
        {this.state.contact}
        </Dialog>
      <h1>{this.state.doerResult}</h1>
    </div>
  )
}


}

export default Doers
