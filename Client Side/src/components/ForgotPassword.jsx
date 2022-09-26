import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { url } from '../commons/constants';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
function ForgotPassword() {
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [encOTP, setEncOTP] = useState('');
    const [userOtp, setUserOtp] = useState(0);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const sendOTP = () => {
        const emailform = new FormData()
        emailform.append('useremail',email)
        const body ={
            "email":email
        }
        axios.post(url + '/email/forgot', body).then((response) => {
            if (response.data.status === 'success') {
                setEncOTP(response.data.data)
                setIsOtpSent(true)
            } else {
                Toastify({
                    text: "Enter correct mail id",
                    className: "info",
                    offset: {
                            x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast();
                // console.log(response.data.data)
               // window.alert("email not found in record")
            }
        })
    }
    const verifyOtp = () => {
        const otp = (parseInt(encOTP) + 31) / 31;
        console.log('otp '+otp)
        console.log('userOtp '+userOtp)
        // if (userOtp.length !== 4) {
        //     Toastify({
        //         text: "OTP should be of 4-digits which is sent on your email",
        //         className: "info",
        //         offset: {
        //                 x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        //                 y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        //               },
        //             style: {
        //                   background: "linear-gradient(to right, #FF0000, #FF0000)",
        //                 }
        //               }).showToast();
        //    // alert('OTP should be of 4-digits which is sent on your email')
        //             }
         if(otp != userOtp){
            console.log('otp '+otp)
            console.log('userOtp '+userOtp)
            Toastify({
                text: "Incorrect OTP ! please enter a correct OTP",
                className: "info",
                offset: {
                        x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
           // alert('Incorrect OTP ! please enter a correct OTP')
        } else if (password.length === 0 && confirmPassword.length === 0) {
            Toastify({
                text: "enter a new password",
                className: "info",
                offset: {
                        x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
           // alert('enter a new password')
        } else if (password !== confirmPassword) {
            Toastify({
                text: "confirm password not matched..Re-enter the password",
                className: "info",
                offset: {
                        x: 500, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
           // alert('confirm password not matched..Re-enter the password')
        } else {
            const data = new FormData();

            data.append('email', email);
            data.append('newPassword', password);

            axios.post(url + '/email/verifyotp',data).then((response) => {
                if (response.data.status === 'success') {
                    Toastify({
                        text: "Your password is reset ! please use new password to logIn now",
                        className: "info",
                        offset: {
                                x: 500, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                                y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                              },
                            style: {
                                  background: "linear-gradient(to right, #32cd32, #32cd32)",
                                }
                              }).showToast();
                   // window.alert('Your password is reset ! please use new password to logIn now')
                    history.push('/')
                } else {
                    window.alert('password updatation failed')
                }
            })
        }
    }
    return (
        <div>
            <div className="container">


                <div className="main_display_form">
                    <hr /><h1 style={{ textAlign: 'center' }}>Forgot password</h1><hr />

                    {!isOtpSent && (
                        <>
                            <h4 style={{ textAlign: 'center' }}>Please enter your Email-id to reset password</h4>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>
                                <div class="col-sm-10">
                                    <input type="email" name="email" className="form-control" id="email" placeholder='Enter your registered email-id'
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <button class="btn btn-success" onClick={sendOTP}>Send OTP</button><br />

                        </>
                    )}
                    {isOtpSent && (
                        <>
                            <div className="alert alert-success" role="alert">
                                OTP is successfully sent to your registered Email-Id ! <br />
                                You can now set a new password
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>
                                <div class="col-sm-10">
                                    <input type="email" name="email" className="form-control" id="email" value={email} disabled />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="otp" className="col-sm-2 col-form-label">OTP: </label>
                                <div class="col-sm-10">
                                    <input type="text" className="form-control" id="otp" placeholder='Enter the received 4-digit OTP'
                                        onChange={(e) => {
                                            setUserOtp(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password: </label>
                                <div class="col-sm-10">
                                    <input type="password" className="form-control" id="password" placeholder='Enter your password'
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="confirmpassword" className="col-sm-2 col-form-label">Confirm Password: </label>
                                <div class="col-sm-10">
                                    <input type="password" className="form-control" id="confirmpassword" placeholder='confirm your password'
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }} />
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button class="btn btn-success" onClick={verifyOtp}>Change password</button><br />

                            </div>

                        </>
                    )}

                </div>

            </div>

        </div>
    )
}

export default ForgotPassword
