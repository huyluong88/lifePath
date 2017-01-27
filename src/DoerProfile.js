import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

class DoerDialog extends Component {

render (){
  return (
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
  )
  }
}

export default DoerDialog
