import React from "react";
import "./Welcome.css";
import { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from "react-router-dom";
import { url } from '../commons/constants';
import  axios  from 'axios';

function Welcome() {

  let history = useHistory();
  const [getOnlineDoctorCount, setgetOnlinedoctorCount] = useState(0)

  const consult = (e) =>{
    history.push("/client/speciality")
  }

  useEffect(() => {
    axios.get(url + 'patient/countonlinedoctors').then((response)=>{
      if(response.data.status === 'success' )
        setgetOnlinedoctorCount(response.data.data);
    })
  }, [])

  
  return (
    <div>
      <div>
        <div style={{ marginTop: "80px", borderRadius: "10px", border: "none"}}>
          {/* <h5 className="card-header">Featured</h5> */}
          <div
            className="card-body"
            style={{
              height: "100%",
              borderRadius: "10px",
              backgroundColor: "rgb(209, 248, 238)",
            }}
          >
            <h1
              className="card-title"
              style={{ textAlign: "center", color: "rgb(1, 59, 45)"  ,paddingTop:'25px' }}
            >
              Clinic-on-click (online doctor booking appointment sytem)
            </h1>
            <h5
              className="card-title"
              style={{ textAlign: "center", color: "rgb(1, 59, 45)" }}
            >
              Your well Being is Our Priority
            </h5>
            <hr />
            <div>
              <b>Online Doctor Consultation</b>
            </div>
            <p className="para1">
            Experienced and verified doctors from every possible specialty
            on-board, Clinic-on-click empowers patients to consult with
            doctors from the comfort and safety
            of their homes. Online doctor consultation is done via video
            conferencing, telephonic conversations or online chats.
            </p>
            {/* <p>
              <div className="onlineDoc" style={{display:"flex", flexDirection:"row" , justifyContent:"center"}}>
                <img src="\images\online.png" style={{ width: "20px", height: "20px" , marginRight:"10px" , borderRadius:"50px"}}/> {getOnlineDoctorCount} Doctors Online
              </div>
            </p> */}
            <Link to="/home">
              <button
                type="button"
                class="btn btn-primary"
                onClick={consult}
              >
                Consult Now
              </button>
            </Link>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col" style={{
               marginTop: '15px',
            }}>
            <div className="card h-100">
              <img
                src="https://i0.wp.com/psychonephrology.com/wp-content/uploads/2019/01/helathy-patient-doctor-relationship-psychonephrology.jpg?fit=5184%2C3456&ssl=1"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Consult Now</h5>
                <p className="card-text">
                  Online Doctor Patient Consultancy with all Specialities. Tell
                  us About Your Concern We will help you find best doctors.
                </p>
              </div>
            </div>
          </div>
          <div className="col"style={{
               marginTop: '15px',
            }}>
            <div className="card h-100">
              <img
                src="https://publishing.haus/wp-content/uploads/2019/01/03_20_17_Why-the-Doctor-Patient-Relationship-is-Important-1200x800.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Don't wait!</h5>
                <p className="card-text">
                  Skip the waiting room. Consult with a doctor online
                </p>
              </div>
            </div>
          </div>
          <div className="col"style={{
               marginTop: '15px',
            }}>
            <div className="card h-100">
              <img
                src="https://cdn11.bigcommerce.com/s-f6g6z1clyo/product_images/uploaded_images/creating-a-positive-doctor-patient-relationship.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Hurry Up!</h5>
                <p className="card-text">
                  Get your Kid Vaccinated on time to protect them against major
                  Diseases.
                </p>
              </div>
            </div>
          </div>
          <div className="col"style={{
               marginTop: '15px',
            }}>
            <div className="card h-100">
              <img
                src="https://www.advancedurologyinstitute.com/wp-content/uploads/2016/02/doctor-patient-relationship-1.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Health Tip!</h5>
                <p className="card-text">
                  Control your Sugar Level, and monitor your Health
                  regularly...
                </p>
              </div>
            </div>
          </div>
          <div className="col"style={{
               marginTop: '15px',
            }}>
            <div className="card h-100">
              <img
                src="https://elsonhaasmd.com/wp-content/uploads/2017/05/DPR-color-radial-3.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Must Do!</h5>
                <p className="card-text">
                  Regular checkups Reduces your chances of getting ill.
                </p>
              </div>
            </div>
          </div>
          <div className="col"style={{
               marginTop: '15px',
            }}>
            <div className="card h-100">
              <img
                src="https://i.cbc.ca/1.4389279.1532115488!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/doctor-with-patient.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Health Tip!</h5>
                <p className="card-text">
                  PCOD can only be controlled by lifestyle management.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
            className="card-body"
            style={{
               marginTop: '25px',
               marginBottom: '25px',
              height: "100%",
              borderRadius: "10px",
              backgroundColor: "rgb(209, 248, 238)",
            }}
          >
            <h4
              className="card-title"
              style={{ textAlign: "center", color: "rgb(1, 59, 45)",padding:'10px' }}
            >
              About Us
            </h4>
            <hr />
            <div>
              <b>Who we are?</b>
            </div>
            <p className="para1">
              We are digital healthcare platform with the core belief that
              ‘Expertise is for Everyone’. We combine Clinic-on-click’s legacy of
              clinical excellence, affordable cost, and forward-looking research
              with cutting-edge technology to make the best quality healthcare
              easily accessible to every Indian, online.
            </p>
            <div>
              <b>What we do?</b>
            </div>
            <p className="para1">
              With the launch of Clinic-on-click, On a single online platform, you can
              avail an entire gamut of services, like online doctor
              consultation. We also offer expert-curated solutions for
              COVID-care and chronic condition management.
            </p>
          </div>
        </div>
        <footer>
          <div className="card-body text-dark bg-light mb-3">
          Clinic-on-click  project is created by IACSD-Akurdi PG-DAC Mar-22 batch students :
            Anubhav Pareek,Anurag Tiwaskar
            <br />Note that Clinic-on-click project is solely for educational purpose. It doesnot serve any commercial purpose.
            <br />
             contact us at email:
          </div>
        </footer>
      </div>
    
  );
}

export default Welcome;
