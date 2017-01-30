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
    {this.state.name.map (doer => {
      return (<p>{doer.firstName} {doer.lastName}</p> )
    })}
    </div>
  )
  }
}
export default DoerProfile
