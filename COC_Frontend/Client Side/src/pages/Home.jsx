import React from 'react'

import {useState, useEffect} from 'react'
import {url} from '../commons/constants';
import axios from 'axios';
import Specs from '../components/Specs';
import { useHistory } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
function Home() {
    

        // const [spec_id, setSpecId] = useState('')
        // const [spec_name, setSpecName] = useState('')
        // const [spec_description, setSpecDesc] = useState('')
        // const [sec_icon , setSpecIcon] = useState('')
       
        const [allSpecs, setAllSpecs] = useState([])
        const [onItem, selectItem] = useState([])
        const history = useHistory()

        useEffect(() => {
          getDoctors();
          getAllSpecs();
          
        }, []);
    
        const getDoctors = (doctor) =>{
            axios.get(url + '/patient/speciality/' + doctor).then((response) => {
                const result = response.data
                console.log("Result from data" + result.data);
                console.log("doctor data "+doctor);
                if(result.status === 'success') {
                    history.push('/docBySpec' , {
                        doctors: result.data,
                    })
                } else {
                  console.log(result.error)
                  Toastify({
                    text: "error occured while getting all doctors",
                    className: "info",
                    offset: {
                            x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast();

                 // alert('error occured while getting all doctors')
                }
            }) 
        }
        
        //Have to change URI to /speciality
        const getAllSpecs = () => { //Functionality of Admin/Patient
          // send the GET request
          axios.get(url + '/patient/speciality').then((response) => {
            const result = response.data
            console.log("Response Data from specialities "+ result.status);
            if (result.status === 'success') {
              setAllSpecs(result.data)
            } else {
              Toastify({
                text: "error occured while getting all Specialities",
                className: "info",
                offset: {
                        x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                    style: {
                          background: "linear-gradient(to right, #FF0000, #FF0000)",
                        }
                      }).showToast();
             // alert('error occured while getting all Specialities')
            }
          })
        }

        
    
        console.log(onItem);
         // console.log("Response Data from specialities "+ result.data);
          // if (result.status === 'success') {
          //   setAllSpecs(result.data)
          // } else {
          //   alert('error occured while getting all Specialities')
          // }
   

console.log(allSpecs)
    return (
        <div className="/">
            {/* <h1>Home</h1>
            <button className="btn btn-success" onClick={getAllSpecs}> GetAllSpecs</button> */}

            <div className="container" style={{display:"flex" , flexDirection:"row" , flexFlow:"wrap"}} >
                <Specs items={allSpecs} title=" All Specialities"  />
            </div>
        </div>
    )
}

export default Home
