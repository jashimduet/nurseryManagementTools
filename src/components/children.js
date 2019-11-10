import React from 'react';
import * as API  from '../api';
import {Link } from "react-router-dom";

import { faCheckCircle,faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Children extends React.Component{
    constructor(props){
        super(props);
        this.state={
            children:[],
            isLoaded:false
        }
    }

     async componentDidMount(){
        await API.getChildren().then(data=>{            
             this.setState({
              isLoaded:true,
              children:data.children,        
            }); 
    });
}



    render(){
        var{isLoaded,children}=this.state;
        if(!isLoaded){
        return '<div>...Loading</div>'
        }
        else{
            return(
                <div>
                <h1>Elepants</h1>  

         <ul>
         {children.map(child=>(
             
           <li key={child.childId} >
               <div className="checkedMark">
               <div className={child.checkedIn ? 'hidden' : ''}><FontAwesomeIcon icon={faMinusCircle} size="2x" color="red" /></div>
               <div className={child.checkedIn ? '' : 'hidden'}><FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" /></div>
               </div>
               <Link to={`/${child.childId}`}>
             <img src={child.image.large} alt={child.name.lastName}></img>
             </Link>              
             <strong>{child.name.fullName}</strong>             
            </li>
            
         ))};
         </ul>   
         </div>
        
            );
        }
    }
}