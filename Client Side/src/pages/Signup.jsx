import React from 'react'
import './Signup.css'
import Axios from 'axios'
import {useState} from 'react'
import {url} from '../commons/constants';
import "toastify-js/src/toastify.css"
// import './Signup-validation.js'
import Toastify from 'toastify-js'

// import Signin from './pages/Signin';
import { Link } from 'react-router-dom';

function Signup() {

    const validEmail = new RegExp(
        '.+\@.+\..+'
     );

        const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    
    const [p_name , setP_name] = useState('')
    const [password , setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [p_gender, setP_gender] = useState('')
    const [p_phone, setP_phone] = useState('')
    const [p_dob, setP_dob] = useState('')
    const [p_desc, setP_desc] = useState('');
    
    //Axios.defaults.withCredentials = true
    const patientSignup = (e) =>{
        if (p_name.length === 0) {
            Toastify({

                text: "please enter name",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y: 78 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",

               
                        }
                      }).showToast();
          } else if (p_gender.length === 0) {
            Toastify({
                text: "please select gender",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:130 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
          } 
         else if (p_phone.length !== 10) {

            Toastify({
                text: "please enter 10 digit phone number",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'

                        y:200 // vertical axis - can be a number or a string indicating unity. eg: '2em'

                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
          } 
         else if (email.length === 0) {
            Toastify({
                text: "Email id cannot be empty",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:260 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
          } else if(!validEmail.test(email)){
            Toastify({
                text: "Please enter valid email id",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:260 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
          }
         else if (password.length === 0) {
            Toastify({
                text: "Password cannot be empty",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:320 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
          } else if(!validPassword.test(password)){
            Toastify({
                text: " password must contain 1 number (0-9)\n password must contain 1 uppercase letters \n password must contain 1 lowercase letters \n password must contain 1 non-alpha numeric number (#?!@$%^&*-) \n password must be of more than 8 characters with no space",
                className: "info",
                offset: {
                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:320 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
             
          }
         else if (p_dob.length === 0) {
            Toastify({
                text: " Please select date of birth",
                className: "info",
                offset: {
                  x:800, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y:-20  // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
          } 
          else {
                e.preventDefault()
                const data = new FormData();
                data.append('patName', p_name);
                data.append('patGender', p_gender);
                data.append('patPhone', p_phone);
                data.append('patDob', p_dob);
                data.append('patDescription', p_desc);
                data.append('email', email);
                data.append('password', password);

                try {
                    Axios.post(url+'/patient', data).then((response) => {
                        const result = response.data;
                        if(result.status == "success"){
                            console.log(response.status);
                            console.log(response.data);
                            Toastify({
                                text: "You have successfully registered as patient",
                                className: "info",
                                offset: {
                                        x:800, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                                        y:-20 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                                      },
                                    style: {
                                          background: "linear-gradient(to right, #32cd32, #32cd32)",
                                        }
                                      }).showToast();
                            //window.alert('. . . CONGRATS ! YOU ARE SUCCESSFULLY REGISTERED AS PATIENT AT Clinic-on-click  . . .');
                            window.location = '/';
                        }else{
                            Toastify({
                                text: " This email is already registered",
                                className: "info",
                                offset: {
                                        x: 5, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                                        y:260 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                                      },
                                    style: {
                                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                                        }
                                      }).showToast();
                        }
                    })
                    
                } catch (error) {
                    console.log(error)
                }
            }
    }

    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col-sm-12 col-sm-12 col-md-auto col-lg-5 ">
                        <h1 style={{marginBottom:"80px"}}> </h1>
                        <div>
                        <h1 style={{ textAlign: 'center' , fontSize:'50px', marginBottom:"50px"}}>
                            Clinic-on-click
                        </h1>
                        <h3 style={{ textAlign: 'center' }}>online Doctor Consultancy</h3>
                        </div>
                        <br /><br />
                        <div style={{ textAlign: 'center' }}>
                        <img src="./images/main_image.jpg" class="img-responsive Hospitalimg" alt="Hospitalimg"/>

                        </div>


                    </div>
                    <div>&nbsp;</div>
                   
                        
        
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-6" >
                    <div style={{ textAlign: 'right' , marginBottom:"40px",marginRight:"80px"}}>
                            <Link to="/">
                            <button type="button" class="btn btn-warning">Go Back to Login</button>
                            </Link>
                        </div>     
                        <h2 style={{ textAlign: 'right',marginLeft:"10px"}}>Sign up at Clinic-on-click</h2>
                        <h5 style={{ textAlign: 'center',marginLeft:"120px" }}>Just fill up some details </h5>
                        <h5 style={{ textAlign: 'center',marginLeft:"120px" }}>And instantly Book appointment with verified Doctors !</h5>
                        <br />
                        
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-xs-3 col-sm-3 col-form-label required">Full Name </label>
                            <div class="col-sm-9">
                                <input type="text" name="name" className="form-control" id="name" placeholder='Enter your full name' 
                                onChange={(e) => {
                                    setP_name(e.target.value)
                                    }}/>
                            </div>
                        </div> 


                        <div className="row mb-3">

                            <legend className="col-xs-3 col-form-label col-sm-3 pt-0 required">Gender</legend>
                            <div class="col-xs-9 col-sm-9">
                            &nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="gender" className="form-check-input" id="gender" value="male"  onChange={(e) => {
                                    setP_gender(e.target.value)
                                    }} 
                                    /> Male &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="gender" className="form-check-input" id="gender" value="female"  onChange={(e) => {
                                    setP_gender(e.target.value)
                                    }}/> Female &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="gender" className="form-check-input" id="gender" value="other"  onChange={(e) => {
                                    setP_gender(e.target.value)
                                    }} />  Other
                            </div>
                        </div>




                        <div className="row mb-3">
                            <label htmlFor="phone" className="col-xs-3 col-sm-3 col-form-label required">Phone </label>
                            <div class="col-xs-9 col-sm-9">
                                <input type="text" name="phone" className="form-control" id="phone" placeholder='Enter your Phone number' onChange={(e) => {
                                    setP_phone(e.target.value)
                                    }} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-xs-3 col-sm-3 col-form-label required">Email</label>
                            <div class="col-xs-9 col-sm-9">
                                <input type="email" name="email" className="form-control" id="email" placeholder='Enter your email-id' 
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    }}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-xs-3 col-sm-3 col-form-label required ">Password</label>
                            <div class="col-xs-9 col-sm-9">
                                <input type="password" name="password" className="form-control" id="password" placeholder='Enter new password'
                                 onChange={(e) => {
                                    setPassword(e.target.value)
                                    }} />
                            </div>
                        </div>

                     
                        <div className="row mb-3">
                            <label htmlFor="dob" className="col-xs-3 col-sm-3 col-form-label required">Date of Birth</label>
                            <div class="col-xs-9 col-sm-9">
                                <input type="date" name="dob" className="form-control" id="dob"  onChange={(e) => {
                                    setP_dob(e.target.value)
                                    }}/>
                            </div>
                        </div>

                    
                        <div className="row mb-3">
                            <label htmlFor="desc" className="col-xs-3 col-sm-3 col-form-label">Description </label>
                            <div class="col-xs-9 col-sm-9">
                            <textarea className="form-control" id="desc" rows="3" placeholder="Enter your description." onChange={(e) => {
                                setP_desc(e.target.value)
                            }}></textarea>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-success col-12" onClick={patientSignup} style={{cursor:"pointer"}}>Sign Up</button>
                                    

                    </div>

                </div>
            </div>
            <br /><br />                
        </>
    )
}


export default Signup;
