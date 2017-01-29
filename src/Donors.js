import React, { Component } from 'react';
import base  from './config';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';


class Donors extends Component {
  constructor(){
    super()
    this.state = {
      donors : [],
      name : '',
      details: '',
      contact: '',
      open: false,
      donorResult: ''
    }
  }

componentDidMount(){
  base.fetch('donors',{
    context: this,
    asArray: true,
    then: (data) => {
      this.setState ({
        donors: data
      })
      console.log(data)
    }
  })
}

handleClose = () => this.setState({open: !this.state.open});
searchADonor = () => {
    const search = this.searchDonor.value
    console.log(search)
    const mapDonor = this.state.donors.map(donor => {
        return (donor.general.firstName)
    })
    console.log('your donors are ', mapDonor)
    const donor = mapDonor.filter(donor => {
        return (donor == `${search}`)
    })
    console.log('your search result is ', donor)
    if (donor == '') {
        alert('no result')
    } else {
        this.setState({
            donorResult: donor
        })
    }
    this.searchDonor.value = ''
}


openProfile(user){
  console.log(user)
  this.setState({
    name: `${user.general.firstName} ${user.general.lastName}`,
    details: `Type of Entity: ${user.general.toE} Industry: ${user.general.industry}
              Interest: ${user.general.interest} Awards: ${user.general.award}`,
    contact: `Email: ${user.contact.email} Phone: ${user.contact.phone} Website: ${user.contact.website}`,
    open: true
  })
  this.props.router.push(`/${this.state.name}`)
  this.props.pickles(user)
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
    <input placeholder="Search for a donor" ref={element => this.searchDonor = element}/>
    <FlatButton
      label="Search"
      primary={true}
      onClick={this.searchADonor}
    />

      <ul>
        {this.state.donors.map((donor, index) => {
          return (<li onClick={this.openProfile.bind(this, donor)} key={index}> {donor.general.firstName} {donor.general.lastName}</li>)
        })}
      </ul>
      <Dialog
          title="Donor Information"
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
        <h1>{this.state.donorResult}</h1>
    </div>
  )
}


}

export default Donors
