import React from 'react'
import { useState, useEffect } from 'react'
import { AiOutlineRadiusSetting } from 'react-icons/ai';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { url } from '../commons/constants';
import { GoLocation } from 'react-icons/go';


function DoctorsBySpeciality(props) {

    const [docListBySpec, setdocListBySpec] = useState([])
    useEffect(() => {
        fetchDoctorsBySpecilaity();
    }, [])


    const fetchDoctorsBySpecilaity = () => {
        // 2 API for Fetching Doctor are 
        // * doctorsbyspeciality for only fecting doctors by speciality ID
        // * /doctor/verifieddoctorsbyspeciality/13 for fetching only verfied doctors

        axios.get(url + '/doctor/verifieddoctorsbyspeciality/' + props.match.params.id).then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                setdocListBySpec(result.data)
            } else {
                console.log(result.error)
                alert('error occured while getting all doctors')
            }
        })
    }

    return (
        <section class="main-content" >

            <div className="container" style={{ display: "flex", flexDirection: "row", gap: "5em", flexBasis: "auto", justifyContent: "space-evenly", flexWrap: "wrap" }}>

                {
                    docListBySpec.map((doct) => {
                        return (
                            <>

                                <div class="row" >
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card bg-white p-3 mb-3 shadow" style={{ width: "500px", justifyContent: "space-between" }}>
                                            <div className="d-flex justify-content-between mb-4">
                                                <div className="user-info">

                                                    <div className="user-info__basic" style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div className="user-info__img">
                                                            <img src={url + '/' + doct.docProfilePic} alt={doct.docName} />
                                                        </div>
                                                        <h5 className="mb-0" style={{ margin: "auto", marginTop: "10px", fontSize: "1.8rem", fontFamily: "poppins" }}>Dr. {doct.docName}</h5>
                                                        <img src="\images\verified.png" style={{ width: "20%", height: "auto" , marginRight:"10px"}} />
                                                        {/* <div className="d-flex justify-content-between mt-4"> */}
                                                        {/*                                                         
                                                            {
                                                                doct.docIsOnline ? <span class="badge bg-success">Online</span> : <span class="badge bg-secondary">Offline</span>
                                                            } */}

                                                        {/* </div> */}
                                                        {/* <p className="text-muted mb-0">Experience: {doct.docExperience} years</p> */}
                                                    </div>
                                                </div>
                                                {/* <div className="dropdown open">
                                                    <a href="#!" className="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="fa fa-ellipsis-v"></i>
                                                    </a>

                                                </div> */}
                                            </div>

                                            {/* <h6 className="mb-0" style={{ fontFamily: "poppins", fontSize: "1.0rem" }}>Contact : {doct.docPhone}</h6> */}
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                                                <small className="ml-1" style={{ fontFamily: "poppins", fontSize: "1.0rem" }}>Fees: ₹{doct.docFees}</small>

                                                <p className="text-muted mb-0" style={{ fontFamily: "poppins", fontSize: "1.0rem" }}>Experience: {doct.docExperience} years</p>

                                            </div>
                                            {/* <a href="#!"><small>Contact</small></a> */}
                                            <div className="d-flex justify-content-between mt-4">
                                                {
                                                    doct.docIsOnline ? <span class="badge bg-success">Online</span> : <span class="badge bg-secondary">Offline</span>


                                                }


                                                <div>

                                                    {/* <small className="ml-1">Fees: ₹{doct.docFees}</small> */}

                                                </div>
                                                <br />


                                            </div>
                                            <div className="btn" style={{ textAlign: "center", backgroundColor: "#f2ffcc", marginTop: "20px", width: "100%" }}>
                                                <Link to={`/appointment/${doct.docId}`} className=" font-weight-bold" style={{ color: "#33cc33" }}> Book Appointment</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>)
                    })}

            </div >
        </section>
    )
}

export default DoctorsBySpeciality
