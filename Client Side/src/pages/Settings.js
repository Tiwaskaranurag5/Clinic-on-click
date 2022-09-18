import React from 'react'
import Axios from 'axios'
import {useState} from 'react'
import {url} from '../commons/constants';
function Settings() {

    
    const [p_desc, setP_desc] = useState('');
    
    var data = sessionStorage.getItem('credentials')
    var patient = JSON.parse(data);

    const patientSignup = (e) =>{
        e.preventDefault()
        const data = new FormData();
        data.append('patDesc', p_desc);
        try {
            Axios.put(url+'/patient/updatedesc/'+ patient.patId , data).then((response) => {
                const result = response.data;
                if(result.status == "success"){
                    console.log(response.status);
                    console.log(response.data);
                    window.alert('Data Updated Successfully . . .');
                    // window.location = '/';
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="settings">
            <div className="container">
                <div className="row">
                   

                    <div className="col-sm-3 col-md-9 col-lg-6">
                        <h1 style={{ textAlign: 'center' }}>Patient Profile</h1>

                        <br />
                        
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Full Name </label>
                            <div class="col-sm-9">
                                <input type="text" name="name" className="form-control" id="name" placeholder='Enter your full name' value={`${patient.patName}`} disabled/>
                            </div>
                        </div> 


                        <div className="row mb-3" >
                            <legend className="col-form-label col-sm-3 pt-0">Gender</legend>
                            <div class="col-sm-9">
                            <input type="text"  className="form-control" value={`${patient.patGender}`} disabled/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="phone" className="col-sm-3 col-form-label">Phone </label>
                            <div class="col-sm-9">
                                <input type="text" name="phone" className="form-control" id="phone" value={patient.patPhone} disabled/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <input type="email" name="email" className="form-control" id="email" placeholder='Enter your email-id' value={`${patient.email}`} disabled
                                />
                            </div>
                        </div>
                        {/* <div className="row mb-3">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-9">
                                <input type="password" name="password" className="form-control" id="password" placeholder='Enter new password'
                                 />
                            </div>
                        </div> */}

                     
                        <div className="row mb-3">
                            <label htmlFor="dob" className="col-sm-3 col-form-label">Date of Birth</label>
                            <div class="col-sm-9">
                                <input type="text" name="dob" className="form-control"  value={patient.patDob} disabled/>
                            </div>
                        </div>

                    
                        <div className="row mb-3">
                            <label htmlFor="desc" className="col-sm-3 col-form-label">Description</label>
                            <div class="col-sm-9">
                            <textarea className="form-control" id="desc" rows="3" placeholder={'Click to edit your existing description: \n'+patient.patDescription}  onChange={(e)=>{
                                setP_desc(e.target.value)
                            }} ></textarea>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-success col-12" onClick={patientSignup} style={{cursor:"pointer"}}>Update Description</button>
                                    

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Settings
