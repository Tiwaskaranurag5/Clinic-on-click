import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { url } from '../commons/constants';
import { Link } from 'react-router-dom';
import AppointmentConfirmation from './AppointmentConfirmation';


function BookAppointment(props) {
  const [date, setDate] = useState('');
  const [getSlots, setgetSlots] = useState([])
  const [bookedAppointments, setbookedAppointments] = useState([])
  const [visibleSlots, setVisibleSlots] = useState(false);
  var bookSlotIdArray = [];
  //Session Storage variables
  var patientInfo = sessionStorage.getItem('credentials')
  var pat = JSON.parse(patientInfo)
  //Console for Checking
  //Console.log(patientInfo)

  useEffect(() => {
    fetchSlots();
  }, [])

  
  const fetchSlotsByDocId = () =>{
    let data = new FormData()
    console.log(date);
    console.log(props.match.params.id);
    data.append('docId', props.match.params.id)
    data.append('appdate',date)

    axios.post(url + '/patient/fetchappointmentsbydoctoranddate',data).then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        setbookedAppointments(result.data)
        setVisibleSlots(true)
      } else {
        alert("Error fetching Doctor's slot Data...!!!")
      }
    })
  }

  
  const fetchSlots = () => {
    axios.get(url + '/patient/getallslots').then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        setgetSlots(result.data)
      } else {
        alert("Error fetching All Slot Data !!!")
      }
    })
  }
  
  bookedAppointments.map((bookedApp) =>{
      bookSlotIdArray.push(bookedApp.slotId);

  })
  // for (var bookedslot of bookedSlots) {
  //   bookSlotIdArray.push(bookedslot.slotId);
  // }

  console.log("array -> booked slots of date: "+ bookSlotIdArray);
  return (
    <>
    <h1>Book an Appointment</h1>
    <div className="row mb-3">
        <label htmlFor="dob" className="col-xs-4 col-sm-4 col-form-label" style={{fontSize:'20px'}}>Select Date to check available slots:</label>
        <div class="col-xs-8 col-sm-8">
            <input type="date" name="dob" className="form-control" id="dob" onChange={(e) => {
                setDate(e.target.value);
                }} />
          <br />
          <button className="btn btn-sm btn-warning" onClick={fetchSlotsByDocId}>Check available slots</button>  
        </div>
    </div>
      <div className="jumbotron">
        {!visibleSlots &&
          <div class="container">
              <h3>No Date selected ! </h3>
              <h5>Select a date to check available slots</h5>
              
          </div>
        }
        {visibleSlots &&
        <div className="col-md-12">
              <p style={{fontSize:'20px', fontFamily:'poppins'}} >Selected Date : {date}</p>
                <div className="row" style={{gap:"10px"}} >
                    {getSlots.map((slot) => {
                      return(
                      
                        bookSlotIdArray.includes(slot.slotId)?<button type="button" class="btn btn-outline-danger" disabled >{slot.slotTime}</button>:<Link to ={`/confirm?time=${slot.slotTime}&slotid=${slot.slotId}&docid=${props.match.params.id}&appdate=${date}`}><button type="button" class="btn btn-outline-success" >{slot.slotTime}</button></Link>

                        // bookSlotIdArray.includes(slot.slotId)?<button type="button" class="btn btn-outline-danger" disabled >{slot.slotTime}</button>:<button type="button" class="btn btn-outline-success" onClick={()=>{
                        //   return (
                        //     <AppointmentConfirmation slotid={slot.slotId} slottime={slot.slotTime} docid={props.match.params.id}/>
                        //   )
                        // }} >{slot.slotTime}</button>
                     ) })}
                </div>
        </div>
        }     
      </div>
    </>
  )
}

export default BookAppointment
