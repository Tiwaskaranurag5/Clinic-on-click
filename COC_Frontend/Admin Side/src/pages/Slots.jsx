import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { url } from './../commons/constants';

function Slots() {
    const [allSlots, setAllSlots] = useState([]);

    useEffect(() => {
        getAllSlots();
    }, []);

    const getAllSlots = () => {
        axios.get(url + '/admin/slots').then((response)=>{
            const result = response.data
            if(result.status ==='success'){
                setAllSlots(result.data);
            }else{
                window.alert('problem occurred during fetching Slots data')
            }
        })
    };
    return (
        <div>
             <div className="col">
                <div className="four-fifth column center-text">
                    <h3>All Slots</h3>
                </div>
                <div>
                    <div className="one-fifths column ">
                        <Link to="/addslot">
                            <button
                                className="btn btn-success"
                                style={{ float: "right" }}>
                                Add New Slot
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

          
            <div className="container">
                <table
                    className="table table-striped table-hover table-sm text-center"
                    style={{ minWidth: "100%" }}
                >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Slot time</th>
                            
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSlots.map((item, index) => {
                    
                            const deleteSlot = () => {
                                const r = window.confirm(
                                    "Do you really want to delete Slot (#" +
                                    item.slotId +
                                    ") Dr. " +
                                    item.slotTime +
                                    " ?"
                                );
                                if (r) {
                                    axios
                                        .delete(url + "/admin/slot/" + item.slotId)
                                        .then((response) => {
                                            const result = response.data;
                                            if (result.status === "success") {
                                                getAllSlots();
                                            } else {
                                                window.alert(
                                                    "Problem occured ! Slot " +
                                                    item.slotTime +
                                                    " couldnot be deleted !"
                                                );
                                            }
                                        });
                                }
                            };
                            return (
                                <tr key={index}>
                                  
                                    <td>{item.slotId}</td>
                                    <td>{item.slotTime}</td>
                                    
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={deleteSlot}>
                                            Delete slot
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Slots
