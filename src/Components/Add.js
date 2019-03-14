import React, { Component } from 'react';


class Add extends Component {

  render () {
    
    return (
      <div className="card mb-3 target-card" style={this.props.style} 
           onClick = {this.props.onClick}>
        <div className="card-body ">
         <h5 className="card-title"><b>{this.props.title}</b></h5>
          <p className="card-text">{this.props.summary}</p>
       </div>
   </div>
   )
  }
 }

 export {Add}