import React, { Component } from 'react';
import base  from './config';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'

class Doers extends Component {
    constructor() {
        super()
        this.state = {
            doers: [],
            name: '',
            details: '',
            contact: '',
            open: false,
            doerResult: []

        }
    }
    componentDidMount() {
        base.fetch('doers', {
            context: this,
            asArray: true,
            then: (data) => {
                this.setState({
                    doers: data
                })
                console.log(data)
            }
        })
    }

    searchADoer = () => {
        const search = this.searchDoer.value
        console.log(search)
        const mapDoer = this.state.doers.map(doer => {
            return (doer)
        })
        console.log('your doers are ', mapDoer)
        const doer = mapDoer.filter(doer => {
            return (doer.general.firstName == `${search}`)
        })
        console.log('your search result is ', doer)
        if (doer == '') {
            alert('no result')
        } else {
            this.setState({
                doerResult: doer
            })
        }
        this.searchDoer.value = ''
    }
    openSearchDoer(user){
      console.log('searched user is ', user)
    }
  render (){

  return(
    <div>
      <input placeholder="Search for a doer" ref={element => this.searchDoer = element}/>
      <FlatButton
        label="Search"
        primary={true}
        onClick={this.searchADoer}
      />
      {this.state.doerResult.map(doer=>{
        return (<li onClick={this.openProfile.bind(this, doer)} key={doer}>{doer.general.firstName}</li>)
      })}

      <ul>
        {this.state.doers.map((doer, index) => {
          return (<li> <Link key={index} to={`/doers/${index}`}>{doer.general.firstName} {doer.general.lastName}</Link></li>)
        })}
      </ul>

    </div>
  )
}


}



export default Doers
