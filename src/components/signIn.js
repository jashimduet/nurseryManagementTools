import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import * as API  from '../api';
import axios from 'axios';
const ACCESS_TOKEN = "";

export default class SignIn extends React.Component{   

    constructor(props) {
      super(props);
      
      this.state = {
        pickupTime: '',
        checkedIn:'',
        child:'',
        isLoaded:false
      };
      
    }

    

    async componentDidMount() {
      const { match: { params } } = this.props;
      await API.getChildren().then(data=>{       
      const child= data.children.find(child=>child.childId===`${params.childId}`);
      this.setState(
        {
          child:child,
          isLoaded:true
        });        
      });  
       
    } 
    
    handleChange=event=> {      
      this.setState({        
       pickupTime: event.currentTarget.innerHTML   
        
      });
                       
    } 

    
    signIn= async event => {
      event.preventDefault();
      const { history } = this.props;           
     await axios
      .post(`https://tryfamly.co/api/v2/children/${this.state.child.childId}/checkins`,{accessToken:ACCESS_TOKEN,
      pickupTime:this.state.pickupTime})
      .then(
        data => {   
          console.log('Logged In ');       
          
        },
        error => {
          console.error(error);
        }
      ).then(()=>{history.push('/');});         
      
    }

    signOut= async()=>{
      const { history } = this.props;     
     await axios
      .post(`https://tryfamly.co/api/v2/children/${this.state.child.childId}/checkout`,{accessToken:ACCESS_TOKEN}   
      )
      .then(
        data => {          
          console.log('Log out'); 
        },
        error => {
          console.error(error);
        }
      ).then(()=>{history.push('/');});  
      

    }
  
    render() {  
      if(!this.state.isLoaded){
        return '<div>...Loading</div>'
        }  
           
      if(!this.state.child.checkedIn){                
      return (       
      <div className="signIn">  
      <h1>{this.state.child.name.firstName}</h1>       
        <p >Choose when {this.state.child.name.firstName} will be picked up : at {this.state.pickupTime}</p>
        <div className="timePickup">
        <div onClick={this.handleChange} className="time">8:00</div>
        <div onClick={this.handleChange} className="time">9:00</div>
        <div onClick={this.handleChange} className="time">15:00</div>
        <div onClick={this.handleChange} className="time">16:00</div>
        </div>  
        <div className="signInButton"> 
          <div>          
        <Link to='/'>
          <button className="btnSignInClose" >Close</button>  
          </Link>
          </div>
          <div>
          <button onClick={this.signIn} className="btnSignIn" >Sign in</button>   
          </div>
          </div>      
        </div>
      
      );
    }  
  else{
    return(
      <div className="signOut"> 
      <div className="profile">
        <img src={this.state.child.image.small} alt={this.state.child.name.lastName}></img>  
        <h1>{this.state.child.name.fullName}</h1> 
        </div>
        <div className="signOutButton">             
          <Link to='/'>
          <button className="btnClose">Close</button>
          </Link>          
          <button onClick={this.signOut} className="btnSignOut">Sign out</button>          
        </div>
        </div>
    )
  }
}
}
  