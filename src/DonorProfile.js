import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';

class DonorProfile extends Component {
  constructor () {
    super()
    this.state = {
      name: {},
      firstName: '',
      lastName: '',
      toE: '',
      industry: '',
      interest: '',
      award: '',
      ourStory: '',
      focusMission: '',
      niche: '',
      email: '',
      phone: '',
      website: ''
    }
  }

  componentDidMount () {
  base.fetch(`/donors/${this.props.params.name}`, {
    context: this,
    then: (data) => {
      this.setState({
        name: data,
        firstName: data.general.firstName,
        lastName: data.general.lastName,
        toE: data.general.toE,
        industry: data.general.industry,
        interest: data.general.interest,
        award: data.general.award,
        ourStory: data.purpose.ourStory,
        focusMission: data.purpose.focusMission,
        niche: data.purpose.niche,
        email: data.contact.email,
        phone: data.contact.phone,
        website: data.contact.website
      })
      console.log("what is", data)
    }
  })
}

render (){
  return (
    <div>
    <h2>Name</h2>
      <p>{this.state.firstName} {this.state.lastName}</p>

    <h2>Details</h2>
      <strong>Type of Entity: </strong><span>{this.state.toE}</span><br/>


      <strong>Industry: </strong><span>{this.state.industry}</span><br/>


      <strong>Interest: </strong><span>{this.state.interest}</span><br/>


      <strong>Award: </strong><span>{this.state.award}</span>


    <h2>Purpose</h2>
      <strong>Our Story: </strong><span>{this.state.ourStory}</span><br/>


      <strong>Focus/Mission: </strong><span>{this.state.focusMission}</span><br/>


      <strong>niche: </strong><span>{this.state.niche}</span>


      <h2>Contact Information</h2>
        <strong>email: </strong><span>{this.state.email}</span><br/>


        <strong>phone: </strong><span>{this.state.phone}</span><br/>


        <strong>website: </strong><span>{this.state.website}</span><br/>

    </div>
  )
  }
}
export default DonorProfile
