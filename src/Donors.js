import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import DonorProfile from './DonorProfile'

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
    const search = this.searchDonor.value
    console.log(search)
    const mapDonor = this.state.donors.map(donor => {
        return (donor)
    })
    console.log('your donors are ', mapDonor)
    const donor = mapDonor.filter(donor => {
        return (donor.general.firstName == `${search}`)
    })
    console.log('your search result is ', donor)
    if (donor == '') {
        alert('no result')
    } else {
        this.setState({
            donorResult: donor
        })
    }
    this.searchDonor.value = ''
}


render (){

  return(
    <div>
    <input placeholder="Search for a donor" ref={element => this.searchDonor = element}/>
    <FlatButton
      label="Search"
      primary={true}
      onClick={this.searchADonor}
    />
    {this.state.donorResult.map(donor=>{
      return(<li onClick={this.openProfile.bind(this, donor)} key={donor}>{donor.general.firstName}</li>)})}

      <ul>
        {this.state.donors.map((donor, index) => {
          return (<li key={index}> <Link to ={`/donors/${index}`}>{donor.general.firstName} {donor.general.lastName}</Link></li>)
        })}
      </ul>

    </div>
  )
}


}

export default Donors
