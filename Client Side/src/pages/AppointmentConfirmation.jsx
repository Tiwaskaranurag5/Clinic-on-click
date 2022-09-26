import React from 'react'
import './AppointmentConfirmation.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { url } from '../commons/constants';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
function AppointmentConfirmation(props) {

    const [doctorDetails, setdoctorDetails] = useState([]);
    var history = useHistory();

    var data = localStorage.getItem('credentials');
    var patient = JSON.parse(data);
    const { search } = useLocation()
    const queryvalues = queryString.parse(search)

    useEffect(() => {
        getDoctorDetailsById();
    }, [])

    const getDoctorDetailsById = () => {

        axios.get(url + '/doctor/' + queryvalues.docid).then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                setdoctorDetails(result.data)
            } else {
                Toastify({
                    text: "Error fetching in Doctor's Data...!!!",
                    className: "info",
                    offset: {
                            x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast();
               // alert("Error fetching in Doctor's Data...!!!")
            }
        })
    }

    const proceedToPayment = (e) => {
        e.preventDefault()
        const data = new FormData();

        data.append('pId', patient.patId);
        data.append('docId', queryvalues.docid);
        data.append('slotId', queryvalues.slotid);
        data.append('appDate', queryvalues.appdate);

        axios.post(url + '/patient/appointment', data).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(response.status);
                console.log(response.data);
                Toastify({
                    text: "Appointment Booked SuccessFully !!!",
                    className: "info",
                    offset: {
                            x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast();


               // window.alert('Appointment Booked SuccessFully !!!')
                history.push('/patientAppointment')
            } else {
                Toastify({
                    text: "appointment booking failed",
                    className: "info",
                    offset: {
                            x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast();
                //window.alert('appointment booking failed')
            }
        })
    }
        return (
            <div>
                <div className="thankyou-page">
                    <div className="_header">
                        <div className="logo">
                            <img src="https://codexcourier.com/images/banner-logo.png" alt="" />
                        </div>
                        <h1>Confirm Your Appointment!!</h1>
                    </div>
                    <div className="_body">
                        <div className="_box">

                            <div className="input-group  mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Patient Name</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={patient.patName} disabled />
                            </div>

                            <div className="input-group  mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Doctor Name</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={'Dr. '+doctorDetails.docName} disabled />
                            </div>

                            <div className="input-group  mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Speciality</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={doctorDetails.sp_name} disabled />
                            </div>

                            <div className="input-group  mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Fees</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={doctorDetails.docFees} disabled />
                            </div>

                            <div className="input-group  mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Slot Time</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={queryvalues.time} disabled />
                            </div>
                            <div className="_footer">
                                <button type="submit" className="btn btn-success" onClick={proceedToPayment}>Confirm Appointment</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
    export default AppointmentConfirmation