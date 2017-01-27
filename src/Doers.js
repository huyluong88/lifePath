import React, { Component } from 'react';
import base  from './config';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router';



class Doers extends Component {
  constructor(){
    super()
    this.state = {
      doers : [],
      name : '',
      about: '',
      email: '',
      open: false
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
  console.log(user)
  this.setState({
    name: `${user.general.firstName} ${user.general.lastName}`,
    about: `${user.general.toE} ${user.general.industry} ${user.general.award}`,
    email: `${user.contact.email}`,
    open: true
  })
  this.props.router.push(`/${this.state.name}`)
  this.props.pickles(user)
}

render (){
  return(
    <div>
      <ul>
        {this.state.doers.map((doer, index) => {
          return (<li onClick={this.openProfile.bind(this, doer)} key={index}> {doer.general.firstName} {doer.general.lastName}</li>)
        })}
      </ul>
      <Dialog
          title="Scrollable Dialog"
          open={this.state.open}
          autoScrollBodyContent={true}
        >
        <h1>Doer</h1>
        <h3> Name </h3>
        {this.state.name}

        <h3>About</h3>
        {this.state.about}

        <h3> Contact Information </h3>
        {this.state.email}
        </Dialog>
    </div>
  )
}


}

export default Doers
