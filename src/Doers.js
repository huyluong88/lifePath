import React, { Component } from 'react';
import base  from './config';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import DoerProfile from './DoerProfile'

class Doers extends Component {
    constructor() {
        super()
        this.state = {
            doers: [],
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
            return (doer.general.firstName == `${search}` ||
                doer.general.lastName == `${search}` ||
                doer.contact.email == `${search}`)
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

  render (){

  return(
    <div>
      <input placeholder="Search for a doer" ref={element => this.searchDoer = element}/>
      <FlatButton
        label="Search"
        primary={true}
        onClick={this.searchADoer}
      />

      {this.state.doerResult.map((doer)=>{
        return (<li>
                <Link to ={`/doers/${doer.key}`}>
                {doer.general.firstName} {doer.general.lastName}
                </Link>
                </li>)
              })
      }
      <ul>
        {this.state.doers.map((doer, index) => {
          return (<li key={index}>
                  <Link to ={`/doers/${doer.key}`}>
                  {doer.general.firstName} {doer.general.lastName}
                  </Link>
                  </li>)
                })
        }
      </ul>
    </div>
  )
}
}

export default Doers
