import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {store} from '../Pages/Redux'

import {Add} from './Add'
import {displayInfoOnTargetNote} from './TargetNote'
import {CardConnected } from '../App'
import {addChild} from '../Pages/addChild'


function handleSearch (event) {
                var searchQuery = event.target.value.toLowerCase();
                var displayedCard = this.props.components.filter(function(item) {
                    var searchValue = item.name.toLowerCase();
                    return searchValue.indexOf(searchQuery) !== -1;
                })
                console.log ("displayedCard", displayedCard)
                this.setState({
                    components: displayedCard
                });
            };

let _handleSearch

class AddCard extends Component {
    constructor(props) {
    	super(props)
    	_handleSearch = handleSearch.bind(this)
        this._addChild = addChild.bind(this) 
        this.state = {
        	components: this.props.components
        }  
        
    }

    componentDidMount(){            
      localStorage.i = this.props.components.length
      store.dispatch ({type: "ABOUT_CARD",
                       i: JSON.parse(localStorage.getItem("i")),
                     })
      }

      componentWillReceiveProps(nextProps){ 
      	if (this.props.components !== nextProps.components){
        this.setState({
                    components: nextProps.components
                })
         }
    }
 
    render() {
      return ( 
            <div>
              <div className="container" >
              
                <Add title = {"Add new Target"} 
                      summary = {<i className="fas fa-plus"></i>}
                      onClick={this._addChild} />
              </div>
                {// 
                    this.state.components.map((item, index, array) => (
                      
                      <Link to={`/targets/target-${++index}-${item.id}`} className="text-muted " key={index}>
                        <div className="container"> 
                            
                             <CardConnected value={item.name}
                                            cardid = {item.id}
                                            summaryValue = {item.creationDate?item.creationDate:"NO DATE"}

                                            onClick = {elem => {

                                                displayInfoOnTargetNote(item.name, item.summary)
                                                localStorage.setItem("id", JSON.stringify(index))
                                                store.dispatch({type:"NEW_CARD",
                                                                  id: index})
                                            }}
                                             />
                        </div>
                      </Link>               
                    ))
                }
            </div>
        );
  }
}

export {AddCard, _handleSearch}