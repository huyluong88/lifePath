import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import DonorProfile from './DonorProfile'
import TextField from 'material-ui/TextField';


class Donors extends Component {
  constructor(){
    super()
    this.state = {
      donors : [],
      name : '',
      details: '',
      contact: '',
      open: false,
      donorResult: []
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
    }
  })
}

searchADonor = () => {
    const search = this.searchDonor.input.value
    console.log(search)
    const mapDonor = this.state.donors.map(donor => {
        return (donor)
    })
    console.log('your donors are ', mapDonor)
    const donor = mapDonor.filter(donor => {
        return (donor.general.firstName == `${search}` || donor.general.lastName == `${search}` || donor.contact.email == `${search}`)
    })
    console.log('your search result is ', donor)
    if (donor == '') {
        alert('no result')
    } else {
        this.setState({
            donorResult: donor
        })
    }
    this.searchDonor.input.value = ''
  }
  openSearchDoer(user){
    console.log('searched user is ', user)
  }
  openProfile2(doer){
    this.props.onChange(doer)
  }


render (){

  return(
    <div>
    <TextField
     ref={input => this.searchDonor = input}
     floatingLabelText="Search for a doer"
     type="text"
    />

    <FlatButton
      label="Search"
      backgroundColor='#5b453b'
      onClick={this.searchADonor}
    />
    {this.state.donorResult.map(donor=>{
      return(<li><Link className='user' to ={`/donors/${donor.key}`}>{donor.general.firstName} {donor.general.lastName}</Link></li>)})}

      <ul>
        {this.state.donors.map((donor, index) => {
          return (<li key={index}> <Link className='user' to ={`/donors/${donor.key}`}>{donor.general.firstName} {donor.general.lastName}</Link></li>)
        })}
      </ul>

    </div>
  )
}


}

export default Donors
