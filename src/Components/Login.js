import React, { Component } from 'react';

import '../App.css';

import {Redirect} from 'react-router-dom';


class Login extends Component {
  constructor (props){
    super (props)
     //AfterFalse = AfterFalse.bind(this)
     this.state = {
        onclick: this.onClick,
        email: "",
        password: ""
     }
   }
   

  render(){
    let AfterFalse = () => (this.setState({onclick: "no click"}))

    //console.log ("LOGIN!!! this.state: ", this.state)

    if (this.state !== undefined && this.state.onclick === "click"){
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      //console.log ("reg.test.this.state.email", reg.test(this.state.email))
      if (this.state.email !=="" && this.state.password !==""){
        if ( reg.test(this.state.email) === true && this.state.password.length > 3) {
           localStorage[this.state.email] = [this.state.email, this.state.password]
           localStorage["email"] = this.state.email
           localStorage["password"] = this.state.password
           //"email:" + this.state.email + "; password:" + this.state.password

           return <Redirect from="/login" to="/add-first-target" />
         } else {
                 alert ("Invalid Email or Password is to short!")
               }
       
      } else {
        alert ("Email or Password is ampty!")
        
      } 

      AfterFalse() 
      //console.log ("LOGIN after this.state: ", this.state)
    } 

    return(
       <form className = "login">
          <div className = "container">
            <div className="form-group row">
              <div className="col">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" 
                       onChange={elem => this.setState({email: elem.target.value})} 
                       value={this.state.email}/>
              </div>
            </div>
              <div className="form-group row">
                <div className="col">
                 <input type="password" className="form-control" id="inputPassword3" placeholder="Password"
                        onChange={elem => this.setState({password: elem.target.value})} 
                        value={this.state.password} />
                </div>
              </div>
  
            <div className = "container">
             <div className="form-check text-left ">
                <input className="form-check-input" type="radio" 
                     name="exampleRadios" id="register-user" 
                     value="option1" defaultChecked />
                <label className="form-check-label" htmlFor="register-user">
                 Registered User
                </label>
              </div>
  
              <div className="form-check text-left ">
                <input className="form-check-input" type="radio" 
                     name="exampleRadios" id="new-user" 
                     value="option2" />
                <label className="form-check-label" htmlFor="new-user">
                 New User
                </label>
              </div>
            </div> 

            <div className="form-group">
              <div className="col sign-in">
                <button type="submit" className="btn btn-lg btn-signin" 
                        onClick = {(elem) => this.setState ({onclick: "click" })} >
                          Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
     )
  }
}

export {Login}