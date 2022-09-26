import React from 'react'
import './Signin.css'
import { useState } from 'react'
import axios from 'axios';
import { url } from './../commons/constants';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Toastify from 'toastify-js'

import "toastify-js/src/toastify.css"






function Signin({ setIsAuthorized }) {
    let history = useHistory();
    const [emailLogin, setemailLogin] = useState('')
    const [passwordLogin, setpasswordLogin] = useState('')

    axios.defaults.withCredentials = false;
    const logIn = (e) => {
        if (emailLogin.length === 0) {
            Toastify({
                text: "please enter email Id",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:255  // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
        }
        
        else if (passwordLogin.length === 0) {
            Toastify({
                text: "Please enter password",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:310  // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();

           // alert('please enter password')
        } else {
            e.preventDefault()
            const data = new FormData();

            data.append('email', emailLogin);
            data.append('password', passwordLogin);
            try {
                axios.post(url + '/patient/authenticate', data).then((response) => {
                    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                    console.log(response.data)
                    const result = response.data;
                    console.log(result.data);
                    if (result.status === 'success') {
                        console.log(result.status);
                        console.log(result.data);
                        localStorage.setItem('credentials', JSON.stringify(result.data))
                        setIsAuthorized(true)

                        Toastify({
                            text: " Hey! you are Successfully Logged In to Clinic-on-click",
                            className: "info",
                            offset: {
                                    x:500, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                                    y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                                  },
                                style: {
                                      background: "linear-gradient(to right, #32cd32, #32cd32)",
                                    }
                                  }).showToast();







                       // window.alert('Hey! you are Successfully Logged In to Clinic-on-click');
                        //history.push('/')
                    } else {
                        window.alert('Registeration Failed..');

                    }

                }).catch((res)=>{if(res.data===""){
                    console.log("error in response")
                }else{Toastify({
                    text: "Invalid Email or Password",
                    className: "info",
                    offset: {
                            x: 500, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast()}});
            } catch (error) {
                console.log(error)
            }
        }
    }
    // //Still needs to work on
    //     useEffect(() => {
    //         Axios.get(`${url}/patient/authenticate`).then((response) => {
    //             if(response.data.loggedIn == true){
    //                 setLoginStatus(response.data[0].email);
    //             }
    //         })
    //     }, [])

    return (

        <>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">

                        <div style={{ textAlign: 'right' }}>
                            <Link to="/docsignin">
                                <button type="button" class="btn btn-warning">Goto Doctor's Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className="main_display_image col-sm-3 col-md-9 col-lg-6">
                        <h1 style={{ textAlign: 'center' }}>
                            Welcome to Clinic-on-click
                        </h1>
                        <h5 style={{ textAlign: 'center' }}>
                            We are always there for you...
                        </h5>
                        <img src="\images\main_image.jpg" className="img-responsive Hospitalimg" alt="Hospitalimg" style={{ display: "block", marginRight: "auto", marginLeft: "auto" }} />
                    </div>

                    <div className="main_display_form col-sm-3 col-md-9 col-lg-6 mb-3 py-4">

                        <h3 style={{ textAlign: 'center' }}>Login to Clinic-on-click</h3>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" name="email" className="form-control" id="email" placeholder='Enter your registered email-id'
                                    onChange={(e) => {
                                        setemailLogin(e.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" name="password" className="form-control" id="password" placeholder='Enter your password'
                                    onChange={(e) => {
                                        setpasswordLogin(e.target.value)
                                    }} />
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button type="submit" class="btn btn-success" onClick={logIn}>Log in</button><br />
                            <Link to='/forgotpassword'>
                                <button type="button" class="btn btn-secondary transparent-btn" >Forgot Password ?</button>
                            </Link>

                            <h6 style={{ marginTop: '5px' }}>OR</h6>

                            <Link to="/signup">
                                <button type="button" class="btn btn-primary" onClick={() => { return <Redirect to='/signup' /> }}>Create New Account</button>
                            </Link>
                            
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Signin;
