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
      open: false
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

    </div>
  )
}


}

export default Donors
