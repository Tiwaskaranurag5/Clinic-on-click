import React from 'react'
// import Navbar from '../components/Navbar'
import './DoctorDashboard.css'
import axios from 'axios';
import { Route, BrowserRouter as Router, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import DoctorAppointments from './DoctorAppointments';
import ViewDocInfo from './ViewDocInfo';
import { url } from './../commons/constants';
import ChangeDocPassUsingOld from './ChangeDocPassUsingOld';

function DoctorDashboard({setIsAuthorized}) {
    const history= useHistory()
    var cred = sessionStorage.getItem('DocCreds');
    var doctor = JSON.parse(cred);
        var logOut = () =>{
            if(window.confirm('Do you really want to log out ?')){
                axios.get(url + '/doctor/logout/' + doctor.docId).then((response) => {
                    const result = response.data;
                    if(result.status === 'success'){
                        sessionStorage.clear();
                        setIsAuthorized(false)
                        history.push('/docsignin');
                    }
            })

            }
        }
    
    return (
        <div>
        <Router>
        <body id="body-pd">
                <header class="header" id="header">
                    {/* <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div> */}
                    <a className="navbar-brand" href="#">
                        <img src="\images\logo_DigiHeal.png" alt="" width="120px" height="30" class="d-inline-block align-text-top" />   
                    </a>
                    <p style={{marginLeft: "auto" ,marginRight: "15px",fontSize:'20px',marginTop:'10px'}}>Hello, Dr. {doctor.docName}</p>
                    <div class="header_img"> <img src={url + '/'+`${doctor.docProfilePic}`} alt={doctor.docProfilePic} /> </div>
                </header>
                <div class="l-navbar" id="nav-bar" >
                    <nav class="nav">
                        <div>
                            <a href="#" class="nav_logo">
                                <i class='bx bx-layer nav_logo-icon'></i>
                                <span class="nav_logo-name"><h4>DigiHeal</h4></span>
                            </a>
                            <div class="nav_list">
                                
                                    <Link to="/viewProfile" class="nav_link">
                                    <i class='bx bx-folder nav_icon'></i>
                                    <span class="nav_name">View Profile</span> 
                                    </Link>

                                    <Link to="/appointmentDoc" class="nav_link">
                                    <i class='bx bx-grid-alt nav_icon'></i>
                                    <span class="nav_name">Appointments</span>
                                    </Link>
                                    <Link to="/changedocpass" class="nav_link">
                                    {/* <i class='bx bx-grid-alt nav_icon'></i> */}
                                    <span class="nav_name">Change Password</span>
                                    </Link>
                                
                              
                                    {/* <Link to="/blood" class="nav_link">
                                    <i class='bx bx-donate-blood nav_icon'></i>
                                    <span class="nav_name"></span> 
                                    </Link> */}

                            </div>
                        </div> 
                        <div class="nav_link" role='button'>   
                          <i class='bx bx-log-out nav_icon' ></i> <span class="nav_name" onClick={logOut}>SignOut</span> 
                         
                        </div> 
                    </nav>
                </div>
                  
                {/* <div class="height-100 bg-light">
                    <h4>Main Components</h4>
                </div> */}
            </body>

           <Switch>
               <Route exact path='/docsignin'>
                <Redirect to='/viewProfile'/>
               </Route>
              <Route path='/appointmentDoc' component={DoctorAppointments} />
              <Route path='/viewProfile' component={ViewDocInfo} />
              <Route path='/changedocpass' component={ChangeDocPassUsingOld}/>
           </Switch>
        </Router>
        </div>
    )
}

    export default DoctorDashboard

