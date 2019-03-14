import React, { Component } from 'react';


class Card extends Component {
  constructor (props){
   super (props)
   this.id = this.props.i
   this.state = {       
        className: "card mb-3 activeCard-false",
        active: false
      }  
  }

  componentDidMount (){	

	if (this.props.summaryValue === this.props.components[this.props.id-1].creationDate&&
		window.location.pathname==="/targets/target-"+this.props.id+"-"+this.props.cardid){
    	this.setState({className: "card mb-3 activeCard-true", 
        	           active: true})
    }
  }


   componentWillReceiveProps(nextProps){
   	   
   	   if (this.state.className === "card mb-3 activeCard-true"&&
   	   	   this.props.id !== nextProps.id){
   	       this.setState({className: "card mb-3 activeCard-false", active: false})
   	   }
   	}

  render () {
    
    return (
      <div className={this.state.className}  
           cardid = {this.props.cardid}
           onClick = {this.props.onClick}> 
      
        <div className="card-body" onClick = {()=>{
        	                          this.setState({className: "card mb-3 activeCard-true", 
        	                       	              active: true})
        	                       }}>
		          <h5 className="card-title "><b>{this.props.value}</b></h5>
		          <p className="card-text " >Creation date: <br/><b>{this.props.summaryValue}</b></p>
       </div>
   </div>

   )
  }
 }

 export {Card}