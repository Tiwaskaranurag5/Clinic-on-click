import React from 'react'
import { useState } from 'react'
import { url } from './../commons/constants';
import axios from 'axios';
import DoctorsBySpeciality from './DoctorsBySpeciality';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function Specs({ items, title }) {
  var history = useHistory()
  // const [docList, setDocList] = useState('');
  console.log(items);

  return (
    <>
      <div className="title" style={{ width: "100%" }}><h1>{title}</h1></div>

      {items.map((item) => {
      
        return (

          <>
            <br />
            <div className="card" style={{ width: "18rem", marginLeft: "18px", marginTop: "18px" }}>
              <img src={url + '/' + item.spIcon} alt="Card image cap" style={{ display: "block", marginLeft: "auto", marginRight: "auto", height: "150px", width: "150px" }} />

              <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center" }}> {item.spName} </h5>
                <p className="card-text" style={{ textAlign: "center" }}>{item.spDescription}</p>
                {/* 
                <Link to={{pathname: "/docBySpec  " , state:item.spId }} ><button className="btn btn-primary" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>Show Doctors</button> </Link>
                */}

                <Link to={`/docBySpec/${item.spId}`} ><button className="btn btn-primary" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>Show Doctors</button> </Link>
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default Specs
