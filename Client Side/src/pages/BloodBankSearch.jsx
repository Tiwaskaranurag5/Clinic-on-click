import React from 'react'
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'
import queryString from 'query-string'
import { useState, useEffect } from 'react';
import { AiFillBank, AiFillMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { url } from '../commons/constants';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
function BloodBankSearch(props) {

    const [searchedBloodBanks, setSearchedBloodBanks] = useState([]);
    const { search } = useLocation()
    const queryvalues = queryString.parse(search)
    useEffect(() => {
        getSearchedBloodbanks();
    }, []);

    const getSearchedBloodbanks = () => {
        axios.get(url + "/bloodbank/search?q=" + queryvalues.query).then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                setSearchedBloodBanks(result.data);
            } else {
                Toastify({
                    text: "Error fetching in search Data...!!!",
                    className: "info",
                    offset: {
                            x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y:5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                        style: {
                              background: "linear-gradient(to right, #FF0000, #FF0000)",
                            }
                          }).showToast();
               // alert("Error fetching in search Data...!!!");
            }
        });
    };
    return (
        <div>
            <h2>Showing search results for city : "{queryvalues.query}"</h2>
            <Link to='/blood'>
                <button className="btn btn-warning">Back to Bloodbank Page</button>
            </Link>
            {searchedBloodBanks.map((item) => {
                return (
                    <>
                        
                        <div className=" bg-light">
                         
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row" style={{ backgroundColor: "rgb(206, 245, 234)", margin: "5px", padding: "5px", borderRadius: "10px" }}>
                                       
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

export default BloodBankSearch
