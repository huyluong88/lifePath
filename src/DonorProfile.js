import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';

class DonorProfile extends Component {
  constructor () {
    super()
    this.state = {
      name: []
    }
  }

  componentDidMount () {
  base.fetch(`/donors/${this.props.params.name}`, {
    context: this,
    asArray: true,
    then: (data) => {
      this.setState({
        name: data
      })
      console.log("what is", data)
    }
  })
}

render (){
  return (
    <div>
    <h2>Name</h2>
    {this.state.name.map (donor => {
      return (
        <p>{donor.firstName} {donor.lastName}</p>)
      })}
    <h2>Details</h2>
      <strong>Type of Entity:</strong>
        {this.state.name.map (donor => {
          return (
            <span> {donor.toE}</span>
          )
        })}<br/>

      <strong>Industry:</strong>
      {this.state.name.map (donor => {
        return (
          <span> {donor.industry}</span>
        )
      })}<br/>

      <strong>Interest: </strong>
      {this.state.name.map (donor => {
        return (
          <span> {donor.interest}</span>
        )
      })}<br/>

      <strong>Award:</strong>
      {this.state.name.map (donor => {
        return (
          <span> {donor.award}</span>
        )
      })}

    <h2>Purpose</h2>
      <strong>Our Story: </strong>
      {this.state.name.map (donor => {
        return (
          <span> {donor.ourStory} </span>
        )
      })}<br/>

      <strong>Focus/Mission: </strong>
      {this.state.name.map (donor => {
        return (
          <span> {donor.focusMission} </span>
        )
      })}<br/>

      <strong>niche: </strong>
      {this.state.name.map (donor => {
        return (
          <span> {donor.niche} </span>
        )
      })}

      <h2>Contact Information</h2>
        <strong>email: </strong>
        {this.state.name.map (donor => {
          return (
            <span>  {donor.email}</span>
          )
        })} <br/>

        <strong>phone: </strong>
        {this.state.name.map (donor => {
          return (
            <span>  {donor.phone}</span>
          )
        })} <br/>

        <strong>website: </strong>
        {this.state.name.map (donor => {
          return (
            <span>  {donor.website}</span>
          )
        })}

    </div>
  )
  }
}
export default DonorProfile
