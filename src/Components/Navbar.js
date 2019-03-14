import React, { Component } from 'react';
import {_handleSearch} from './AddCard'


class Navbar extends Component{

  render(){
     
      return (
        <nav className="navbar container-fluid" >
          <a href ={'/'} className="navbar-brand" id = "hello" >One step closer to the goal!</a>
          <form className="form-inline ">
             <input className="form-control mr-sm-2" onChange ={(event) => _handleSearch(event)} 
                    type="search" placeholder="Search" aria-label="Search" />
             <button className="btn my-2 my-sm-0" type="submit">Search</button>
             <div className="col-1">
                <button className="btn my-2 my-sm-0 exit"
                    onClick={()=> {
                      alert("Your data and notes have been deleted")
                       localStorage.clear()
                }}>Exit</button>
             </div>
          </form>
         
        </nav>
      )
  }
}

export {Navbar}