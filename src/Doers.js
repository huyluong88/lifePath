import React, { Component } from 'react';
import base  from './config';



class Doers extends Component {
  constructor(){
    super()
    this.state = {
      doers : [],
      profile : ''
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
openProfile(user){
  this.setState({
    profile:user.general.firstName + user.general.lastName + user.contact.email
  })
  console.log(user)
  this.props.onClick(user)
}

render (){
  return(
    <div>
      <ul>
        {this.state.doers.map((doer, index) => {
          return (<li onClick={this.openProfile.bind(this, doer)} key={index}>{doer.general.firstName} {doer.general.lastName}</li>)
        })}
      </ul>
      {this.state.profile}
    </div>
  )
}


}

export default Doers
