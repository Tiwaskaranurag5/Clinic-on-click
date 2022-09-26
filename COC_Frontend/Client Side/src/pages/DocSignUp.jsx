import React from 'react'
import { useState, useEffect } from 'react';
// import { Stepper , Step } from 'react-form-stepper';
import Axios from 'axios';
import axios from 'axios';
import { url } from './../commons/constants';
import { useHistory, Link } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function DocSignUp() {

    //For Speciality Drop Down list
    const [allspecs , setAllSpec] = useState([])
    let history = useHistory()

    const validEmail = new RegExp(
        '.+\@.+\..+'
     );

        const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    const [d_name, set_d_name] = useState('')
    const [sp_id, set_sp_id] = useState(0)
    const [d_city, set_d_city] = useState('')
    const [d_phone, set_d_phone] = useState('')
    const [d_exp, set_d_exp] = useState(0)
    const [d_registeration_no, set_d_registeration_no] = useState('')
    const [d_description, set_d_description] = useState('')
    const [d_verification_doc, set_d_verification_doc] = useState(undefined)
    const [d_profile_pic, set_d_profile_pic] = useState(undefined)
    const [d_fees, set_d_fees] = useState(0.0)
    const [email, set_email] = useState('')
    const [password, set_password] = useState('')

    useEffect(() => {
        getAllSpecs();
    }, [])

        const getAllSpecs = () =>{
            axios.get(url + '/doctor/findSpecialities').then((response) => {
                const result = response.data;
                if (result.status === 'success') {
                    console.log(result.data)
                    setAllSpec(result.data)
                } else {
                    alert("Error fetching in Specialities Data...!!!")
                }
            })
        }



    // Axios.defaults.withCredentials = true
    const docRegister = (e) => {
        if (d_name.length === 0) {
            Toastify({
                text: " please enter Name",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            // alert('please enter Name')
          } 
          else if (sp_id === 0) {
            Toastify({
                text: " please select Speciality",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            // alert('please select Speciality')
          } 
          else if (d_city.length === 0) {
            Toastify({
                text: " please enter City",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
           // alert('please enter City')
          } 
          else if (d_phone.length !== 10) {
            Toastify({
                text: "phone number should be of 10 digits",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            //alert('phone number should be of 10 digits')
          } 
          else if (d_exp === 0) {
            Toastify({
                text: "please enter Experience (in years)",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            //alert('please enter Experience (in years)')
          } 
          else if (d_registeration_no.length === 0) {
            Toastify({
                text: "please enter Registration number",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            //alert('please enter Registration number')
          } 
          else if (d_verification_doc === undefined) {
            Toastify({
                text: "please upload verification document",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
           // alert('please upload verification document')
          } 
          else if (d_profile_pic === undefined) {
            Toastify({
                text: "please upload profile pic",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            //alert('please upload profile pic')
          } 
          else if (d_fees.length === 0) {
            Toastify({
                text: "please enter fees",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            
            //alert('please enter fees')
          } 
          else if (email.length === 0) {
            Toastify({
                text: "Email field cannot be empty",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
           
            // alert('Email field cannot be empty')
          } else if (!validEmail.test(email)){
           
            Toastify({
                text: "Please Enter a valid Email",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast(); //   alert('Please Enter a valid Email')
          }
          else if (password.length === 0) {
            Toastify({
                text: "Password Field cannot be Empty.",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
            //alert('Password Field cannot be Empty.')
          } else if(!validPassword.test(password)){
            Toastify({
                text: "password must contain 1 number (0-9)\n password must contain 1 uppercase letters \n password must contain 1 lowercase letters \n password must contain 1 non-alpha numeric number (#?!@$%^&*-) \n password must be of more than 8 characters with no space.",
                className: "info",
                offset: {
                        x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
              //alert(' password must contain 1 number (0-9)\n password must contain 1 uppercase letters \n password must contain 1 lowercase letters \n password must contain 1 non-alpha numeric number (#?!@$%^&*-) \n password must be of more than 8 characters with no space')
          }
          
          else {
                e.preventDefault()
                const data = new FormData();

                data.append('docName', d_name);
                data.append('spId', sp_id);
                data.append('docCity', d_city);
                data.append('docPhone', d_phone);
                data.append('docExperience', d_exp);
                data.append('docRegistrationNo', d_registeration_no);
                data.append('docDescription', d_description);
                data.append('docVerificationDoc', d_verification_doc);
                data.append('docProfilePic', d_profile_pic);
                data.append('docFees', d_fees);
                data.append('email', email);
                data.append('password', password);

          
                // Chnages to be made for FormData from JSON Data
                try {
                    Axios.post(url+'/doctor', data).then((response) => {
                        const result = response.data;
                        if(result.status == "success"){
                            // console.log(response.status);
                            // console.log(response.data);

                            Toastify({
                              text: " YOU ARE SUCCESSFULLY REGISTERED AS DOCTOR AT Clinic-on-click!",
                              className: "info",
                              offset: {
                                      x:600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                                      y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                                    },
                                  style: {
                                        background: "linear-gradient(to right, #32cd32, #32cd32)",
                                      }
                                    }).showToast();

                            // window.alert('YOU ARE SUCCESSFULLY REGISTERED AS DOCTOR AT  Clinic-on-click!');


                        }
                    })
                    
                } catch (error) {
                    console.log(error)
                }
    }
    } 

    return (
        <div >
            <div className="container my-3" style={{ textAlign: "center" }}>
            <div style={{ textAlign: 'right' , marginBottom:"10px"}}>
                            <Link to="/docsignin">
                            <button type="button" class="btn btn-warning">Go Back to Login</button>
                            </Link>
                        </div>     
                <h1>Doctor Sign Up Form</h1>
                {/* <Stepper
                    steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
                    activeStep={1}
                /> */}
                <form>
                    <div className="row g-3">
                        <div className="col">
                            <label for="d_name" className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Enter your Name" required="required" aria-label="First name"
                                onChange={(e) => {
                                    set_d_name(e.target.value)
                                }}
                            />
                        </div>
                        <div className="col">
                            <label for="inputState" className="form-label">Choose your Speciality</label>
                            <select className="form-control" aria-label=".form-select-sm example" onChange={(e) => {
                                    set_sp_id(e.target.value)
                                }}>
                                <option selected>Choose your Speciality</option>
                                {allspecs.map((item, index) => {
                                     return (
                                        <option key={index} value={item.spId}>{item.spName}</option>
                                 )})
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Registeration No</label>
                            <input type="text" className="form-control" required="required" placeholder="Enter doctor registration number" onChange={(e) => {
                                set_d_registeration_no(e.target.value)
                            }} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Experience</label>
                            <input type="number" className="form-control" placeholder="Experience (in years)" onChange={(e) => {
                                set_d_exp(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label HtmlFor="inputEmail4" className="form-label">Phone</label>
                            <input type="text" className="form-control" placeholder="Enter Phone number" required="required"
                                onChange={(e) => {
                                    set_d_phone(e.target.value)
                                }} />
                        </div>
                        <div className="col-md-6">
                            <label HtmlFor="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" placeholder="Enter city" onChange={(e) => {
                                set_d_city(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label HtmlFor="inputEmail4" className="form-label">Fees</label>
                            <input type="number" className="form-control" required="required" placeholder="Enter Fees" onChange={(e) => {
                                set_d_fees(e.target.value)
                            }} />
                        </div>
                        <div className="col-md-6">
                            <label HtmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" cols="55" placeholder="Enter some description about doctor" onChange={(e) => {
                                set_d_description(e.target.value)
                            }}></textarea>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label HtmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" required="required" placeholder="Enter doctor's email" onChange={(e) => {
                                set_email(e.target.value)
                            }} />
                        </div>
                        <div className="col-md-6">
                            <label HtmlFor="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Enter new password" required="required" onChange={(e) => {
                                set_password(e.target.value)
                            }} />
                        </div>
                        <div className="col-md-6">
                            <div classNameName="row" style={{ borderStyle: "groove", borderColor: "#CED4DA", opacity: "0.5", borderRadius: "5px", padding: "10px" }}>
                                <label HtmlFor="inputEmail4" className="form-label">Upload Profile Pic-size must be less than 1MB</label>
                                {/* <label for="exampleFormControlFile1">Example file input</label> */}
                                
                                <input type="file" className="form-control-file" onChange={(e) => {
                                    set_d_profile_pic(e.target.files[0])
                                }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row" style={{ borderStyle: "groove", borderColor: "#CED4DA", opacity: "0.5", borderRadius: "5px", padding: "10px" }}>
                                <label HtmlFor="inputEmail4" className="form-label">Upload Verification Doc</label>
                                {/* <label for="exampleFormControlFile1">Example file input</label> */}
                                <input type="file" className="form-control-file" required="required"
                                    onChange={(e) => {
                                        set_d_verification_doc(e.target.files[0])
                                    }} />
                            </div>
                        </div>
                        <br /> <br />
                        <div className="col-12">
                            <button type="button" className="btn btn-primary" onClick={docRegister}>Register at Clinic-on-click</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default DocSignUp
