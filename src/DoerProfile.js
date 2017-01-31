import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import base from './config';

class DoerProfile extends Component {
  constructor () {
    super()
    this.state = {
      name: []
    }
  }

  componentDidMount () {
  base.fetch(`/doers/${this.props.params.name}`, {
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
    {this.state.name.map (doer => {
      return (
        <p>{doer.firstName} {doer.lastName}</p>)
      })}
    <h2>Details</h2>
      <strong>Type of Entity:</strong>
        {this.state.name.map (doer => {
          return (
            <span> {doer.toE}</span>
          )
        })}<br/>

      <strong>Industry:</strong>
      {this.state.name.map (doer => {
        return (
          <span> {doer.industry}</span>
        )
      })}<br/>

      <strong>Award:</strong>
      {this.state.name.map (doer => {
        return (
          <span> {doer.award}</span>
        )
      })}

    <h2>Purpose</h2>
      <strong>Our Story: </strong>
      {this.state.name.map (doer => {
        return (
          <span> {doer.ourStory} </span>
        )
      })}<br/>

      <strong>Focus/Mission: </strong>
      {this.state.name.map (doer => {
        return (
          <span> {doer.focusMission} </span>
        )
      })}<br/>

      <strong>niche: </strong>
      {this.state.name.map (doer => {
        return (
          <span> {doer.niche} </span>
        )
      })}

      <h2>Contact Information</h2>
        <strong>email: </strong>
        {this.state.name.map (doer => {
          return (
            <span>  {doer.email}</span>
          )
        })} <br/>

        <strong>phone: </strong>
        {this.state.name.map (doer => {
          return (
            <span>  {doer.phone}</span>
          )
        })} <br/>

        <strong>website: </strong>
        {this.state.name.map (doer => {
          return (
            <span>  {doer.website}</span>
          )
        })}

    </div>
  )
  }
}
export default DoerProfile
