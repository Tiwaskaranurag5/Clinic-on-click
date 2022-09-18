import React from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { url } from '../commons/constants';
import { useState, useEffect } from 'react';
import { AiFillBank, AiFillMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

function BloodBank() {

    const [bloodBanks, setbloodBanks] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        getAllBloodBanks();
    }, [])


    const getAllBloodBanks = () => {
        axios.get(url + '/bloodbank').then((response) => {
            const result = response.data;
            console.log(result.data)
            if (result.status === 'success') {
                setbloodBanks(result.data);
            } else {
                window.alert("Error Fetching Blood Bank Data ....")
            }
        })
    }


    return (
        <div>
               <h1>Blood Banks</h1>

               <div className="four-fifths column ">
                        <div className="row d-flex justify-content-center mt-50">
                            <div className="col-md-5">
                                <form className="flex-nowrap col ml-auto footer-subscribe p-0" style={{display:'flex'}}>
                                    <input
                                        type="search"
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                        }}
                                        className="form-control"
                                        placeholder="Search Bloodbanks by City"
                                        style={{height:'43px'}}
                                    />
                                    <Link to ={`/bloodsearchresults?query=${searchQuery}`}>
                                    <button className="btn btn-dark btn-sm" style={{marginLeft:'5px'}}>
                                        <FaSearch />
                                    </button></Link>
                                </form>
                            </div>
                        </div>
                    </div>
            {bloodBanks.map((item) => {
                return (
                    <>
                        
                        <div className=" bg-light">
                         
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row" style={{ backgroundColor: "rgb(206, 245, 234)", margin: "10px", padding: "5px", borderRadius: "10px" }}>
                                       
                                            <div class="col-md-10  ">

                                                <h3 style={{ marginTop: "10px" }}>
                                                    <span style={{margin:'1px'}}><AiFillBank size={50}/></span>
                                                   {item.bbName}
                                                </h3>
                                                <p style={{ marginLeft: "-2px" }}>
                                                    <span><GoLocation /></span>
                                                        {item.bbCity}
                                                    </p>
                                                <span><p><IoMdCall />{item.bbPhone}</p>  <p><AiFillMail /> {item.bbEmail}</p></span>
                                                {/* <button className="btn btn-primary">Select</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </>
                )
            }
            )
            }
        </div>
    )
}

export default BloodBank
