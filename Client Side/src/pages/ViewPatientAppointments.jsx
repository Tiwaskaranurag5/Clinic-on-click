import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { url } from './../commons/constants';
import { Link } from 'react-router-dom';

function ViewPatientAppointments() {

    const [patientAppointments, setpatientAppointments] = useState([])

    var x = sessionStorage.getItem('credentials')
    var cred = JSON.parse(x);

    useEffect(() => {
        getAllAppointments();
    }, [])

    console.log(cred.pid)

    const getAllAppointments = () => {
        axios.get(url + '/patient/appointments/' + cred.patId).then((response) => {
            const result = response.data;
            console.log(result.data)
            if (result.status === 'success') {
                setpatientAppointments(result.data);
            } else {
                window.alert("Error Fetching Appointment Data ....")
            }
        })
    }

    return (
        <div>
            <h1> My Appointments </h1>
            {/* <div className="row mb-3">
                <label htmlFor="dob" className="col-xs-3 col-sm-3 col-form-label">Choose a Date</label>
                <div class="col-xs-9 col-sm-9">
                    <input type="date" name="dob" className="form-control" id="dob" />
                    
                </div>
            </div> */}
            {(patientAppointments.length === 0) && 
            <div class="jumbotron">
                <div class="container">
                    <h3>At this moment, No appointments are booked </h3>
                    <h5>Select a speciality to book one</h5>
                    <Link to='/home'>
                        <button className="btn btn-outline-dark">select a Speciality</button>
                    </Link>
                </div>
            </div>
            }
            {patientAppointments.map((item) => {
                return (
                    <div className="card" style={{ width:"100%",marginLeft: "100px", marginBottom: "20px" , display:"inline-block" , padding:"10px", fontSize:"18px" , fontFamily:"poppins" ,flexWrap:"wrap" }}>
                        <div className="col">
                            <label>Appointment Id : {item.appId}</label>
                        </div>
                        <div className="col">
                            <label>Doctor Name : Dr. {item.docName}</label>
                        </div>
                        <div className="col">
                            <label>Appointment Date : {item.appDate}</label>
                        </div>
                        <div className="col">
                            <label>Slot Time : {item.slotTime}</label>
                        </div>


                    </div>
                )
            })
            }
        </div>
    )
}

export default ViewPatientAppointments
