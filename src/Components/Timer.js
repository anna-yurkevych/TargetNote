import React, { Component } from 'react';


class Timer extends Component {
 constructor (props){
  super (props);
  this.state = {
    value: "Deadline isn't set",
  }
 }

  timerTick () {
      var deadlineMs = this.props.arrDeadlines[this.props.id-1].deadline - new Date().getTime();
      var deadline = new Date(deadlineMs);

    if (deadline > 0){
       var sec = deadline.getSeconds();
       var min = deadline.getMinutes();
       var hour = deadline.getHours();
       var date = (deadline.getDate() - 1);
       var month = deadline.getMonth(); 
       var year = (deadline.getFullYear() - 1970);    
       
          if (year === 1) {
          year = year + " year."
           } 
          else {
             if (year === 0){
                 year = ""
             } else year = year + " years."
           }

          if (month === 1) {
          month = month + " month  "
           } 
          else {
             if (month === 0 && year === ""){
                 month = ""
             } else month = month + " months  "
          }

          if (date === 1) {
          date = " / " + date + " day  "
           } 
          else {
             if (date === 0 && month === "" && year === ""){
                 date = ""
             } else date = " / " + date + " days  "
          }

     if  (hour === 1){
      hour = "0"+hour+ " hour : "
     } 
     else {
       if (hour < 10) {
      hour = "0"+hour+ " hours : "
     } else hour = hour + " hours : " }

     if  (min === 1){
      min = "0"+min+ " min : "
     } 
     else {
       if (min < 10) {
      min = "0"+min+ " min : "
     } else min = min + " min : " }

    if  (sec === 1){
      sec = "0"+sec+ " sec "
     } 
     else {
       if (sec < 10) {
      sec = "0"+sec+ " sec "
     } else sec = sec + " sec " }

     var dateNow =  hour + min + sec + date + month + year ;

      } else {
            if (this.props.arrDeadlines[this.props.id-1].deadlineClick){
                  dateNow = "Time is over"
                }
            else { dateNow = "Deadline isn't set"}
        } 
     this.setState({value: dateNow})
  }

 componentDidMount(){
     var timerID = "timer" + this.props.id
     this.timerID = setInterval( () => this.timerTick(), 1000)
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }


 render(){
	   return <p className="timer" ><b>{this.state.value}</b></p>
   }
}

export {Timer}