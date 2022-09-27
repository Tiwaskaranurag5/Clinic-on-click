import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminLogin from './pages/AdminLogin';
import { useEffect, useState } from 'react';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("admin")!=null){
             setIsAuthorized(true);
    }
  })

  return (
    <>
      <Router basename="/admin">
        <Switch>
          <div className="container">
          {/* <Route path='/' exact component={()=>{return <AdminLogin setIsAuthorized={setIsAuthorized}/>}} /> */}
          <Route exact path='/'  render={()=>{return( isAuthorized? <Navbar authorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>: <AdminLogin setIsAuthorized={setIsAuthorized}/>)}} />
          {/* <Route path='/nav' exact component={()=>{return <Navbar authorized={isAuthorized}/>}} /> */}
          <Route path='/forgotpassword' component={ForgotPassword} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
