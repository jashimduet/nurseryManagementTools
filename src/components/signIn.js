import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import * as API  from '../api';
import axios from 'axios';
const ACCESS_TOKEN = "234ffdb8-0889-4be3-b096-97ab1679752c";

export default class SignIn extends React.Component{   

    constructor(props) {
      super(props);
      
      this.state = {
        pickupTime: '',
        checkedIn:'',
        child:'',
        isLoaded:false,
        showMessage:false
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
      console.log('child:',this.state.child);
       
    } 
    
    handleChange=event=> {      
      this.setState({        
       pickupTime: event.currentTarget.innerHTML  
        
      });      
                       
    } 

    signIn = async event => {
      if(!this.state.pickupTime){                
        this.setState({showMessage:true});
        return        
      }
      event.preventDefault();
      const { history } = this.props;
      await axios
        .post(
          `https://tryfamly.co/api/v2/children/${this.state.child.childId}/checkins?accessToken=${ACCESS_TOKEN}&pickupTime=${this.state.pickupTime}` 
        )
        .then(
          data => {
            console.log("Logged In ");
            console.log(data);
          },
          error => {
            console.error(error);
          }
        )
        .then(() => {
          history.push("/");
        });  
        console.log('childSign:',this.state.child);  
      
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
        <div onClick={this.handleChange} className="time">17:00</div>
        <div onClick={this.handleChange} className="time">18:00</div>
        <div onClick={this.handleChange} className="time">19:00</div>
        </div>  
        <div className="message">
        <div className={!this.state.pickupTime&&this.state.showMessage? '' : 'showMessage'} ><p>Select the picked up time.</p></div>
        </div>
        <div className="signInButton"> 
          <div>          
        <Link to='/'>
          <button className="btnSignInClose" >Close</button>  
          </Link>
          </div>
          <div>
          <button onClick={this.signIn} className="btnSignIn"  >Sign in</button>   
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
  