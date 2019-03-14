import React, { Component } from 'react';
import './App.css';
import {store,  mapStateToProps, mapDispatchToProps, actionSaveTarget} from './Pages/Redux'
import {Provider, connect} from 'react-redux';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import {Login} from './Components/Login'
import {Navbar} from './Components/Navbar'
import {Add} from './Components/Add'
import {AddCard} from './Components/AddCard'
import {TargetNote} from './Components/TargetNote'
import {Card} from './Components/Card'
import {Timer} from './Components/Timer'
import {Deadline} from './Components/Deadline'
import {addChild} from './Pages/addChild'


class Structure extends Component {
  
  render (){
   return (
    <div className="row">
    <div className="col-6 col-xs-4 col-md-4 col-lg-4 target-list" >
       <AddCardConnected />
    </div>
    <div className="col-6 col-xs-8 col-md-8 col-lg-8 structure-options-note" >    
       <TargetNoteConnect />
    </div>
  </div>
  )
 }
}

class StructureAddFirst extends Component {
  constructor (props){
   super (props)
   this.state = {
        onclick: false
     }
   }
   
  render(){  
    if (this.state !== undefined && this.state.onclick === true){
        return <Redirect from="/add-first-target" to="/" />
    }
 
   return (
    <div className="row">
    <div className="col-4 target-list">
       <div className="container" >
                <Add title = {"Add yuor first Target"} 
                      summary = {<i className="fas fa-plus"></i>}
                      onClick = {(elem) => { this.setState ({onclick: true })}
                }/>
              </div> 
    </div>
    <div className="col-8">
       <p className="title-of-first-page"><b>Add a new Target and be one step <br/> closer to The Goal!</b></p>
       <div className="div-animation">
          <span className="one"></span>
          <span className="two"></span>
          <span className="three"></span>
          <span className="four"></span>
       </div>
    </div>

    
  </div>
  )
}
}




let Main = (props) => {
  if (localStorage["email"] === undefined||localStorage["password"] === undefined){
      return (<Redirect from="/" to="/login" />)
    }
  return (<>
    <div className="row">
        <NavbarConnect/ >
    </div>
    <div className="row">
     <div className="col-6 col-xs-4 col-md-4 col-lg-4 target-list" >
       <AddCardConnected/>
     </div>
     <div className="col-6 col-xs-8 col-md-8 col-lg-8">
       <p className="title-of-first-page"><b>Add a new Target and be one step <br/> closer to The Goal!</b></p>
       <div className="div-animation">
          <span className="one"></span>
          <span className="two"></span>
          <span className="three"></span>
          <span className="four"></span>
       </div>
       

    </div>
    </div> 
  </>)
}


let MainWithTargets = (props) => {
  if (localStorage["email"] === undefined||localStorage["password"] === undefined){
      return (<Redirect from="/" to="/login" />)
    }
  return (<>
    <div className="row">
        <NavbarConnect/ >
    </div>
    <div >
        <StructureConnect/> 
    </div>
  </>)
}

let NavbarConnect = connect(mapStateToProps, mapDispatchToProps)(Navbar)

let LoginConnect = connect (mapStateToProps, {onclick: store.dispatch({type: "START_LOGIN",
                onclick: "click" }) })(Login)

let TimerConnect = connect(mapStateToProps, mapDispatchToProps)(Timer)

let DeadlineConnect = connect (mapStateToProps, mapDispatchToProps)(Deadline)

let TargetNoteConnect = connect (mapStateToProps, {onSaveTarget: actionSaveTarget})(TargetNote)

let StructureConnect = connect (mapStateToProps, mapDispatchToProps)(Structure)

let CardConnected = connect (mapStateToProps, mapDispatchToProps)(Card)

let AddCardConnected = connect (mapStateToProps, {mapDispatchToProps})(AddCard)



class App extends Component {
 render() {

  return (
    <Provider store={store}>
      <div className="App container-fluid">
        
        <Router history = {createHistory()}>
        
          <Switch>
            <Route path="/" component={ Main } exact />
            <Route path="/targets/:id" component={ MainWithTargets } />
            <Route path="/targets/" component={ Main } exact />
            <Route path="/login" component={ LoginConnect } />
            <Route path="/add-first-target" component={p => <><div className="row"><NavbarConnect/ ></div>
                                                            <div><StructureAddFirst/></div></>} />
          </Switch>
         
        </Router>
      </div>
   </Provider>
    );
  }
}



export default App; 
export {addChild, TimerConnect, DeadlineConnect, CardConnected}
