import './App.css';
import {Home} from './Home';
import {Department} from './Department';
import {Attendance} from './Attendance';
import {Employee} from './Employee';
import {Navigation} from './Navigation';
import Axios from 'axios'
import {useState} from 'react'
import Login from './Login'
import Signup from './Signup'
import {Disciplinary} from './Disciplinary'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {

  const [employee, setEmployee] = useState([])
  const [show, setShow] = useState(false)
  //Axios.get('http://127.0.0.1:8000/employee').then(res=> setEmployee(res.data))  
  return (
    <BrowserRouter>
    <div className="container">
     <h1 className="m-3 d-flex justify-content-center">
       HR Managment System
     </h1>
    
     {show === true  }
     <Navigation/>
     <Switch>
       <Route path='/home' component={Home} exact/>
       <Route path="/" exact render={(props)=>
                <>
                  <Login setShow={setShow} props={props}/>
                  
                </>

              }/>
       <Route path='/department' component={Department}/>
       <Route path='/employee' component={Employee}/>
       <Route path='/Attendance' component={Attendance}/>
       <Route exact path="/signup" component={Signup}/>
       <Route exact path="/disciplinary" component={Disciplinary}/>
       
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;