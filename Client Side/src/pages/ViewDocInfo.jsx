import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ViewDocInfo.css'
import { url } from './../commons/constants';
import axios from 'axios';
function ViewDocInfo() {
    const [fees, setFees] = useState(0.0);
    const [exp, setExp] = useState(0);
    const [docdesc, setDocdesc] = useState('');
    const [docCity, setDocCity] = useState('');
    const [docPhone, setDocPhone] = useState('');
    const [profilePic, setProfilePic] = useState(undefined);

    const history = useHistory()
    
    var cred = sessionStorage.getItem('DocCreds');
    var doctor = JSON.parse(cred);

    const updateDocInfo =(e)=>{
       
        if (docCity.length === 0) {
            alert('please enter City')
        } 
        else if (docPhone.length !== 10) {
            alert('phone number should be of 10 digits')
        } 
        else if (exp === 0) {
            alert('please enter Experience (in years)')
        } 
        else if (profilePic === undefined) {
            alert('please upload profile pic')
        } 
        else if (fees === 0.0) {
            alert('please enter fees')
        }
        else if (docdesc.length === 0) {
            alert('please enter Description')
        }
        
        else {
                e.preventDefault()
                const data = new FormData();
                
                data.append('docId', doctor.docId);
                data.append('docCity', docCity);
                data.append('docPhone', docPhone);
                data.append('docExperience', exp);
                data.append('docDescription', docdesc);
                data.append('docProfilePic', profilePic);
                data.append('docFees', fees);
            
                axios.put(url + '/doctor/editprofile',data).then(response=>{
                    if(response.data.status==='success'){
                        alert("updated successfully")
                        history.push('/docsignin')
                    }else{
                        alert('failed to update your profile')
                    }
                })
        }
    }

    return (
        <div>
            <h1>
                {/*            
                <h1> Doctor Info</h1>
                <br/>
                <label>Doctor Name : {doctor.docName} </label>
                <br/>
                <label>Doctor City : {doctor.docCity} </label>
                <br/>
                <label>Doctor Description : {doctor.docExperience} </label>
                <br/>
                <label>Doctor Phone : {doctor.docPhone} </label>
                <br/>
                <label>Doctor docFees: {doctor.docFees} </label>
                <br/>
                <label>Doctor Mail : {doctor.email} </label> */}


                <div className="col-md-5 col-lg-12" style={{fontFamily:'poppins'}}>
                    <div className="card">
                        <div className="card-header" style={{textAlign:"center"}}>
                        {/* Your Profile
                            <div className="box-inside"><h1 style={{textAlign:"center"}}></h1>
                            dber
                            </div> */}
                
                            <div className="card-photo" >
                        
                                <img src={url + '/' + `${doctor.docProfilePic}`} alt="" />
                            </div>
                            Dr. {doctor.docName}
                        </div>
                        <div className="card-body">
                            
                            <div className="card-description">
                                <div style={{display:'flex'}}>
                                <h4 style={{marginInline:'50px',marginLeft:'150px'}}>
                            {doctor.email} 
                                </h4>
                            <h4 style={{marginRight:'10px',marginLeft:'auto'}}>

                                Reg.no: {doctor.docRegistrationNo}
                            </h4>

                                </div>
                                <br />
                                <label className="col-sm-2 col-form-label">Contact : </label>
                                <input type="text"className="form-control" required="required" placeholder={doctor.docPhone} onChange={(e) => {
                                    setDocPhone(e.target.value)
                                }}/>
                                
                                <br />
                                 
                                City: <input type="text" className="form-control" placeholder={doctor.docCity} onChange={(e) => {
                                    setDocCity(e.target.value)
                                }}/>
                                <br />
                                Experience : <input type="number" placeholder={doctor.docExperience} style={{ width: '65px' }} onChange={(e) => {
                                    setExp(e.target.value)
                                }} /> Years <br /><br />
                                Description: <textarea className="form-control" placeholder={'click to edit description -\n' + doctor.docDescription} cols="30" rows="4" onChange={(e) => {
                                    setDocdesc(e.target.value)
                                }}></textarea>
                            Fees :
                            <input className="form-control" type="number" placeholder={doctor.docFees} onChange={(e) => {
                                    setFees(e.target.value)
                                }} />
                                <br />
                                Profile pic: <input type="file" className="form-control" onChange={(e) => {
                                    setProfilePic(e.target.files[0])
                                }} />
                                <br />
                                <p>
                                Note: Please Logout and LogIn again to see your changes
                                </p>
                            </div>
                            <div className="card-button">
                                <button className="btn btn-warning" onClick={updateDocInfo}> Update your Info </button>
                            </div>
                        </div>
                    </div>
                </div>



            </h1>
        </div>
    )
}
export default ViewDocInfo
