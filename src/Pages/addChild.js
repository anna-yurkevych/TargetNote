import {store} from '../Pages/Redux'


function addChild() {
 
    let arr = this.props.components
    let i = this.props.components.length
    i++
    let cardId = new Date().getTime()
    let creationDate = new Date().toLocaleString()
    let newArr = arr.concat({id: cardId, name: ("Target"), summary: "Add new summary", creationDate, })
    
    let arrD = this.props.arrDeadlines
    let deadlineDate = new Date().getTime()
    let newArrD = arrD.concat({id: cardId, 
                              deadline: deadlineDate,
                              deadlineClick: false})
       
    localStorage.setItem("i", JSON.stringify(i))
    store.dispatch ({type: "ABOUT_CARD",
                     i: JSON.parse(localStorage.getItem("i")),
                   })

    localStorage.setItem("components", JSON.stringify(newArr))
    console.log("COMPONENTS add", newArr )
    store.dispatch ({type: "COMPONENTS",
                         components: newArr
                       })

    localStorage.setItem("arrDeadlines", JSON.stringify(newArrD))
    store.dispatch ({type: "ARR_DEADLINES",
                     arrDeadlines: JSON.parse(localStorage.getItem("arrDeadlines"))
                   })
      }

export {addChild}