import React from 'react'
import { Axios } from 'axios';
import './DocSignin.css'

import { useState } from 'react'
import axios from 'axios';
import { url } from './../commons/constants';
import { Link, useHistory } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


function DocSignin({ setIsdrAuthorized }) {

    let history = useHistory();
    const [emailLogin, setemailLogin] = useState('')
    const [passwordLogin, setpasswordLogin] = useState('')

    axios.defaults.withCredentials = false;

    const authenticateDoctor = (e) => {
        if (emailLogin.length === 0) {
           
            Toastify({
                text: "please enter email Id",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:340  // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast(); // alert('please enter email')
        } else if (passwordLogin.length === 0) {
            Toastify({
                text: "please enter password",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:392  // vertical axis - can be a number or a string indicating unity. eg: '2em'
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

            console.log(emailLogin);
            console.log(passwordLogin);
            try {
                axios.post(url + '/doctor/auth', data).then((response) => {
                    const result = response.data;
                    console.log(result.data);
                    if (result.status === 'success') {
                        console.log(result.status);
                        console.log(result.data);
                        localStorage.setItem('DocCreds', JSON.stringify(result.data))
                        // window.location = '/docsignin';
                        setIsdrAuthorized(true)
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
                        history.push('/docsignin')
                    } else {
                        window.alert('Registeration Failed..');
                    }

                });
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div style={{ textAlign: 'right' }}>
                            <Link to="/">
                                <button type="submit" class="btn btn-warning">Goto Patient's Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-9 col-lg-6" style={{ marginTop: 70 }}>
                        <h1>
                            Welcome to Clinic-on-click
                        </h1>
                        <h4 style={{ marginLeft: 90 }}>
                            Online Doctor Consultancy
                        </h4>
                        <h1 style={{ marginLeft: 100 }} >
                        <img src="./images/main_image.jpg" class="img-responsive Hospitalimg" alt="Hospitalimg" />
                        </h1>
                    </div>

                    <div className="col-sm-3 col-md-9 col-lg-6" style={{ marginTop: 70 }}>
                        <h1 style={{ textAlign: 'center' }}>Sign In as Doctor</h1>

                        <br />

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <input type="email" name="email" className="form-control" id="email" placeholder='Enter your registered email-id'
                                    onChange={(e) => {
                                        setemailLogin(e.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-9">
                                <input type="password" name="password" className="form-control" id="password" placeholder='Enter your password'
                                    onChange={(e) => {
                                        setpasswordLogin(e.target.value)
                                    }} />
                            </div>
                        </div>

                        <div align="center" className="">

                            <button type="submit" class="btn btn-success" onClick={authenticateDoctor}>Sign In as Doctor</button><br />

                            <Link to='/forgotpassword'>
                                <button type="button" class="btn btn-secondary transparent-btn" >Forgot Password ?</button>
                            </Link><br />
                            OR <br /><br />
                            <Link to="/docsignup">
                                <button type="button" class="btn btn-primary">Register New Doctor</button>
                            </Link>

                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default DocSignin
