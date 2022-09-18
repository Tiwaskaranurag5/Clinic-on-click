import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useHistory,Link } from 'react-router-dom';
import { url } from '../commons/constants';

function ChangeDocPassUsingOld() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    const history=useHistory()
    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    const changePassword = ()=>{

        if(oldPassword.length === 0){
            alert('Please enter your Old password ')
        }else if(newPassword.length === 0){
            alert('new password cannot be Empty')
        }else if(!validPassword.test(newPassword)){
            alert(' password must contain 1 number (0-9)\n password must contain 1 uppercase letters \n password must contain 1 lowercase letters \n password must contain 1 non-alpha numeric number (#?!@$%^&*-) \n password must be of more than 8 characters with no space');
        }else if(confirmNewPass !== newPassword){
            alert('Password Does not match')
        }else{
            var cred = sessionStorage.getItem('DocCreds');
            var doctor = JSON.parse(cred);

            const data = new FormData()

            data.append('id',doctor.docId)
            data.append('oldPassword',oldPassword)
            data.append('newPassword',newPassword)
            

            axios.put(url +'/doctor/editpassword',data).then((response)=>{
                if(response.data.status==='success'){
                    alert("password updated successfully")
                    history.push('/viewProfile')
                }else{
                    alert('Failed updating password')
                }
            })

        }
    }
    return (
        <div>
            <div className="col-md-6 offset-md-3 mt-5">
                <br />
                   <h2 align='center'>Change Password</h2>
            <Link to='/viewProfile'>
                <button className="btn btn-warning btn-sm"> Back to Profile</button>
            </Link>
                   <hr />
                   <br/>
                    <div className="form-group">
                        <label>Old password</label>
                        <input type="password" className="form-control" placeholder="Enter old password" required="required" onChange={(e) =>{
                            setOldPassword(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label >Create New password</label>
                        <input type="password" className="form-control" placeholder="Enter new password" required="required" onChange={(e) =>{
                            setNewPassword(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm New password</label>
                        <input type="password" className="form-control" placeholder="Enter new password again" required="required" onChange={(e) =>{
                            setConfirmNewPass(e.target.value)
                        }}/>
                    </div>
                    
                    <hr />
                   
                    <hr />
                    
                        <button type= "button" className="btn btn-success col-md-6 offset-md-3" onClick={changePassword}> Change password</button>
                   

                </div>
        </div>
    )
}

export default ChangeDocPassUsingOld
