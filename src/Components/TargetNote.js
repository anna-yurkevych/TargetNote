import React, { Component } from 'react';

import {store} from '../Pages/Redux'

import {TimerConnect, DeadlineConnect} from '../App'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';



function actualDataToCard (){

        let arr = this.props.components
        const {editorState} = this.state
        arr.splice((this.props.id-1), 1, {id: this.props.components[this.props.id-1].id,
        	                              name: this.state.targetname, 
        	                              summary: (draftToHtml(convertToRaw(editorState.getCurrentContent()))), 
        	                              creationDate: this.props.components[this.props.id-1].creationDate })
        localStorage.setItem("components", JSON.stringify(arr))
        
        store.dispatch ({type: "COMPONENTS",
                         components: JSON.parse(localStorage.getItem("components"))
                       })           
    }

function deleteCard (){

        let arr = this.props.components  	
        arr.splice((this.props.id-1), 1)
        localStorage.setItem("components", JSON.stringify(arr))
        
        store.dispatch ({type: "COMPONENTS",
                         components: JSON.parse(localStorage.getItem("components"))
                       })
        let i = JSON.parse(localStorage.getItem("components")).length
        localStorage.setItem("i", JSON.stringify(i))

	    store.dispatch ({type: "ABOUT_CARD",
	                     i: JSON.parse(localStorage.getItem("i")),
	                     })

	    localStorage.setItem("id", JSON.stringify(i))
	    store.dispatch({type:"NEW_CARD",
                        id: JSON.parse(localStorage.getItem("id"))})

        let arrD = this.props.arrDeadlines
        arrD.splice((this.props.id-1), 1)

	    localStorage.setItem("arrDeadlines", JSON.stringify(arrD))
	    store.dispatch ({type: "ARR_DEADLINES",
	                     arrDeadlines: JSON.parse(localStorage.getItem("arrDeadlines"))
	                   })
}

function displayInfoOnTargetNote (name, summary){
	if (this){
		
		this.setState({targetname: name});
		  let html2 = summary;
		  const contentBlock = htmlToDraft(html2);
		  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		  const editorState = EditorState.createWithContent(contentState);
		  this.setState({ editorState,})		
   }
}


class TargetNote extends Component {
  constructor (props){
    super (props);
    displayInfoOnTargetNote = displayInfoOnTargetNote.bind(this)
    this.actualDataToCard = actualDataToCard.bind(this)
    this.deleteCard = deleteCard.bind(this)
      const html = this.props.components[this.props.id-1].summary || '<p><strong>Add new summary</strong></p>';
	  const contentBlock = htmlToDraft(html);
	  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	  const editorState = EditorState.createWithContent(contentState);
    this.deadline = this.props.deadline
    this.state = {
	    editorState: editorState,
		targetname: this.props.components[this.props.id-1].name || "",
		deadline: this.deadline
    }
  }
	  
      
  onEditorStateChange: Function = (editorState) => {
    this.setState({ editorState,});       
  };


  render () {
    const {editorState} = this.state;
    return ( <>
         <div className = "container target-options">
                  <div className = "row justify-content-end">
                        
	                    <div className="col-lg-1 col-md-2 col-sm-2 col-3">
		                      <button type="button" className="btn btn-md" 
		                          onClick={() =>{//
		                            this.actualDataToCard()
		                        }}>Save</button>
	                    </div>
                    <div className="col-lg-auto col-md-auto col-sm-auto col-auto">
                      <a href = {`/`}>
                         <button type="button" className="btn btn-md btn-red" onClick={() =>{this.deleteCard ()}}>
                             Delete
                         </button>
                      </a> 
                    </div>
                  </div> 
                </div> 

         <div className = "container" >

                   <div className="input-group input-group-lg">
	                 <span className="input-group-text" id="inputGroup-sizing-lg">
	                      <p className="title-target"><b>Name of Target</b></p>
	                 </span>
	                 <input type="text" onChange={elem => {
	               	                            //console.log (elem.target.value)
	               	                            this.setState({targetname: elem.target.value})
	               	                            }}
	                      value={this.state.targetname}
	                      placeholder="My Target is ..." 
	                      className="form-control" aria-label="Sizing example input" 
	                      aria-describedby="inputGroup-sizing-lg" />
                  </div>

	              <div className = "row">
	                 <div className = "col-1 col-lg-1 col-md-2"><DeadlineConnect/></div>
	                 <div className = "col-lg-auto col-md-10">                  
	                   <TimerConnect />
	                 </div>
	              </div>               

                  <div className = "row">
                     <div className = "col">
                         <Editor placeholder="Please enter yuor targen note"
				                 editorState={editorState}
				                 wrapperClassName="wrapper-class"
								 editorClassName="editor-class"
								 toolbarClassName="toolbar-class"
								 onEditorStateChange={this.onEditorStateChange}

								  />
                     </div> 
                  </div> 
               
                      
          </div>        
    </>
    )
  }
} 



export {TargetNote, actualDataToCard, displayInfoOnTargetNote}