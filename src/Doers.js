import React, { Component } from 'react';
import base  from './config';


class Doers extends Component {
  constructor(){
    super()
    this.state = {
      doers : []
    }
  }
componentDidMount(){
  base.fetch('doers',{
    context: this,
    asArray: true,
    then: (data) => {
      this.setState ({
        doers: data
      })
      console.log(data)
    }
  })
}

render (){
  return(
    <ul>
      {this.state.doers.map((doer, index) => {
        return (<li key={index}>{doer.general.firstName} {doer.general.lastName}</li>)
      })}
    </ul>
  )
}


}

export default Doers
