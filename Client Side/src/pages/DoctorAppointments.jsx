import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { url } from './../commons/constants';

function DoctorAppointments() {

    const [getDoctorAppointments, setgetDoctorAppointments] = useState([])

    useEffect(() => {
        allDoctorAppointments();
    }, [])

    var cred = sessionStorage.getItem('DocCreds')
    var doctor = JSON.parse(cred);
    var allDoctorAppointments = () => {
        axios.get(url + '/doctor/appointmentsofdoctor/' + doctor.docId).then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                setgetDoctorAppointments(result.data);
            } else {
                window.alert("Error Fetching Data .....")
            }
        })
    }
    return (
        <div>
            <h1>Doctor Appointments</h1>
            <table className="table ">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Appointment Id</th>
                                    <th scope="col">Appointment Date</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Slot Time</th>
                                </tr>
                            </thead>
                            <tbody style={{fontFamily:"poppins"}}>
            {
                getDoctorAppointments.map((item) => {
                    return (<>
                           
                                <tr>
                                    <th scope="row">{item.appId}</th>
                                    <td>{item.appDate}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.slotTime}</td>
                                </tr>
                           

                    </>
                    )
                }
                )
            }
             </tbody>
            </table>
        </div>
    )
}

export default DoctorAppointments
