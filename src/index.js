import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import './App.css';
import Children from './components/children';
import SignIn from './components/signIn';

import {
  BrowserRouter as Router,  
  Route  
} from "react-router-dom";


function App() {
  return (<div className="App">
     
   <Route exact path='/' component={Children} /> 
   <Route exact path='/:childId' component={SignIn} />    
  </div>);
}


ReactDOM.render(<Router><App /></Router> , document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
