import React, { Component } from 'react';
import base  from './config';


class Donors extends Component {
  constructor(){
    super()
    this.state = {
      donors : []
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

render (){
  return(

    <ul>
      {this.state.donors.map((donor, index) => {
        return (<li key={index}>{donor.general.firstName} {donor.general.lastName}</li>)
      })}
    </ul>
  )
}


}

export default Donors
