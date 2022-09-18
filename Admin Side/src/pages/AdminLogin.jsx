import React from 'react'
import './AdminLogin.css'
import {useState} from 'react'
import axios from 'axios';
import { url } from './../commons/constants';
import { Link, useHistory, Redirect} from 'react-router-dom';




function Signin({setIsAuthorized}) {
    let history = useHistory();
    const [emailLogin , setemailLogin ] = useState('')
    const [passwordLogin , setpasswordLogin ] = useState('')

    axios.defaults.withCredentials = false;  
    const logIn = (e) =>{
        e.preventDefault()
        const data = new FormData();

        data.append('email', emailLogin);
        data.append('password', passwordLogin);
    try{
        axios.post(url + '/admin/auth' , data).then((response) => {
            const result = response.data;
            console.log(result.data);
            if(result.status === 'success'){
                console.log(result.status);
                console.log(result.data);
                sessionStorage.setItem("admin",JSON.stringify(response.data));
                setIsAuthorized(true)
                window.alert('Hey! you are Successfully Logged In to DigiHeal');

                history.push('/')
             }else{
                 window.alert('Registeration Failed..');
             }
             
        });
    }catch (error) {
        console.log(error)
    }
}

    return (

        <>
            <div className="container">
                

                    <div className="main_display_form">
                    <hr/><h1 style={{ textAlign: 'center' }}>DigiHeal Administration</h1><hr/>
                        <h2 style={{ textAlign: 'center' }}>Admin Login</h2>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" name="email" className="form-control" id="email" placeholder='Enter your registered email-id' 
                                  onChange={(e) => {
                                    setemailLogin(e.target.value)
                                }}/>
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
                            <button type="submit" class="btn btn-success" onClick={logIn}>Log in</button><br/>

                            <button type="button" class="btn btn-secondary transparent-btn">Forget Password</button>

                        </div>

                    </div>

                </div>

        </>
    )
}

export default Signin;
