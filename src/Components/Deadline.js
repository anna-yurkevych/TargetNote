import React, { Component } from 'react';
import {store} from '../Pages/Redux'
import Calendar from 'react-calendar'


class Deadline extends Component {
   constructor (props){
   super (props)
   this.onChange = deadline => {
        this.setState({ deadline: deadline,
                        deadlineClick: true}) 
                                 
        let arr = this.props.arrDeadlines       
        arr.splice((this.props.id-1), 1, {id: (this.props.id),  
                                          deadline: deadline.getTime(),
                                          deadlineClick: true})
        
        localStorage.setItem("arrDeadlines", JSON.stringify(arr))
        store.dispatch ({type: "ARR_DEADLINES",
                         arrDeadlines: JSON.parse(localStorage.getItem("arrDeadlines"))
                       })
        }

   this.state = {
    deadline: new Date(),
    deadlineClick: false
    }
  }

  componentDidUpdate(){ 
    store.dispatch ({
          type: "DEADLINE",
          deadline: this.state.deadline,
          deadlineClick: this.state.deadlineClick
        })
    }

    
  render (){
    return (
      <>
         <button type="button" className="btn fas fa-calendar-alt" data-toggle="modal" data-target="#exampleDeadline"><br/>
             <p className="i-options">Deadline</p>
         </button>
         <div className="modal fade" id="exampleDeadline" tabIndex="-1" role="dialog" aria-labelledby="exampleDeadlineTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
           <div className="modal-content">
            <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLongTitle">Add your targets deadline</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Ok">
             <span aria-hidden="true">&times;</span>
            </button>
           </div>
           <div className="modal-body">
             <Calendar onChange={this.onChange}
                          value={this.state.deadline}/>
           </div>
           <div className="modal-footer">
             <button type="button" className="btn btn-secondary" data-dismiss="modal">Ok</button>
           </div>
        </div>
      </div>
     </div>
    </>
      )
  }
}

export {Deadline}