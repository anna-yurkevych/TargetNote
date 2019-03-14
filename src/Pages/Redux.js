import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';



let cardReducer = (state, action) => {
  if (state === undefined){
        return {...state,
                targetname: "",
                targetmsg: "",
                i: !!localStorage.i ? localStorage.i : 1 ,
                id: !!localStorage.id ? JSON.parse(localStorage.getItem("id")) : 1 ,
                components: !!localStorage.components ? JSON.parse(localStorage.getItem("components")) : [{id: (new Date().getTime()), name: "Target", summary: "Add new summary", creationDate: (new Date().toLocaleString()) }] ,
                }
      }
  if (action.type === "ABOUT_TARGET"){
      return {...state,
              targetname: action.targetname,
              targetmsg: action.targetmsg,
              numberOgTargets: action.numberOgTargets
            }
          }
  if (action.type === "ABOUT_CARD"){
      return {...state,
              i: action.i, 
            }
          }
  if (action.type === "COMPONENTS"){
          return {...state,
              components: action.components, 
            }
    }
  
  if (action.type === "NEW_CARD"){
      return {...state,
              id: action.id
            }
  }

  return state
}

let trgtReducer = (state, action) => {
  if (state === undefined){
        return {...state,
                arrDeadlines: !!JSON.parse(localStorage.getItem("arrDeadlines")) ? JSON.parse(localStorage.getItem("arrDeadlines")) : [{id: 1, deadline: new Date().getTime(), deadlineClick: false}],
                deadline: "",
                deadlineClick: "fasle"}
      }   

  if(action.type === "DEADLINE"){
      return { ...state,
              deadline: action.deadline,
              deadlineClick: action.deadlineClick
      }
  }
  if(action.type === "ARR_DEADLINES"){
      return { ...state,
              arrDeadlines: action.arrDeadlines,
      }
  }
  return state
}

let loginReducer = (state, action) => {
  if (state === undefined){
        return {...state, onclick: "no click"}
      }
  if (action.type === "START_LOGIN"){
    return {...state,
            onclick: action.onclick
    }
  }  

  return state
}

const reducers = combineReducers({ 
    login: loginReducer,
    card: cardReducer,
    target: trgtReducer
})
const store = createStore(reducers, applyMiddleware(thunk))


store.subscribe(() => console.log("store.getState", store.getState()))

function actionSaveTarget (targetname, targetmsg){
    return {type: "ABOUT_TARGET",
                    targetname,
                    targetmsg,
                  }
 }



let mapStateToProps = state => {
  
  return {onclick: state.login.onclick, 
          targetname: state.card.targetname,
          targetmsg: state.card.targetmsg,
          i: state.card.i,
          style: state.card.style,
          id: state.card.id,
          arrDeadlines: state.target.arrDeadlines,
          deadline: state.target.deadline,
          deadlineClick: state.target.deadlineClick,
          components: state.card.components,
                 
        }
}

let mapDispatchToProps = () => ({onSaveTarget: actionSaveTarget})

export {store, reducers, loginReducer, cardReducer, trgtReducer, mapStateToProps, mapDispatchToProps, actionSaveTarget}