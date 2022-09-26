
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import Toastify from 'toastify-js'
import './nav';
import { url } from './../commons/constants';




function Navbar({ setIsAuthorized }) {
    // const [sidebar, setSidebar] = useState(false)
    // let history = useHistory();
    const history = useHistory()

    var x = localStorage.getItem('credentials')
    var cred = JSON.parse(x);


    var logout = () => {

        
            localStorage.clear();
            setIsAuthorized(false);
            history.push('/');
            Toastify({
                text: " Hey! you are Successfully Logout from  Clinic-on-click",
                className: "info",
                offset: {
                        x:500, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #32cd32, #32cd32)",
                        }
                      }).showToast();

       
    
}
    return (
        <>
            <div id="body-pd">
                <header class="header" id="header">
                    {/* <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div> */}


                    <Link className="navbar-brand" to="/client/welcome">
                        <img src="\images\COC.png" alt="" width="120px" height="30" class="d-inline-block align-text-top" />

                    </Link>
                    <p style={{ marginLeft: "auto", marginRight: "11px", marginTop: "15px", fontSize: '20px' }}>Hello, {cred.patName}</p>
                    <div class="header_img"> <img src="\images\person-profile.png" alt={cred.patName} /> </div>
                </header>
                <div class="l-navbar" id="nav-bar" >
                    <nav class="nav">
                        <div>
                            <Link to="/client/home" class="nav_logo">
                                <i class='bx bx-layer nav_logo-icon'></i>
                                <span class="nav_logo-name"><h4 >COC</h4></span>
                            </Link>
                            <div class="nav_list">

                                {/* Home is changed to dashboard */}
                                <Link to="/client/home" class="nav_link">
                                    <i class='bx bx-folder nav_icon'></i>
                                    <span class="nav_name">Home</span>
                                </Link>

                                <Link to="/client/speciality" class="nav_link">
                                    <i class='bx bx-grid-alt nav_icon'></i>
                                    <span class="nav_name">Specialities</span>
                                </Link>


                                <Link to="/client/blood" class="nav_link">
                                    <i class='bx bx-donate-blood nav_icon'></i>
                                    <span class="nav_name">Blood Bank</span>
                                </Link>

                                <Link to="/client/patientAppointment" class="nav_link">
                                    <i class='bx bx-first-aid nav_icon'></i>
                                    <span class="nav_name">Appointments</span>
                                </Link>

                                <Link to="/client/setting" class="nav_link">
                                    <i class='bx bx-cog nav_icon'></i>
                                    <span class="nav_name">My Profile</span>
                                </Link>
                            </div>
                        </div>
                        <div class="nav_link" onClick={logout} role="button">
                            <i class='bx bx-log-out nav_icon' ></i> <span class="nav_name">Log Out</span>

                        </div>
                    </nav>
                </div>

                {/* <div class="height-100 bg-light">
                    <h4>Main Components</h4>
                </div> */}
            </div>
        </>
    )
}


export default Navbar
