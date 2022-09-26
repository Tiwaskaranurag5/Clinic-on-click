import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../commons/constants";
import "./BloodBank.css"
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function BloodBank() {
    const [allBloodBank, setAllBloodBank] = useState([])
    const history = useHistory();
    const routeChange = () => {
        let path = '/bloodbank';
        history.push(path);
    }
    useEffect(() => {
        getAllBloodBanks();
    }, [])

    const getAllBloodBanks = () => {
        axios.get(url + '/bloodbank').then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                setAllBloodBank(result.data)
            }else {
                alert("Error fetching in BloodBank's Data...!!!")
            }
        })
    }

    return (
        <>
            <div className = "columns">
                <div className="four-fifth column center-text">
                    <h3>BloodBank's List</h3>
                </div>
                <div className="one-fifths column">
                    <Link to="/addbloodbank">
                        <button className="btn btn-success" style={{ float: "right" }} onClick={routeChange}>Add New BloodBank</button>
                    </Link>
                </div>
            </div>

            <table className="table table-striped table-hower table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allBloodBank.map((item, index) => {
                        const deleteBloodBank =()=> {
                        const t = window.confirm("Do you really want to delete BloodBank (#" + item.bbId +") " + item.bbName + " ?");
                        if(t) {
                            axios.delete( url + '/bloodbank/'+ item.bbId).then((response) => {
                                const result = response.data
                                if (result.status === 'success') {
                                    getAllBloodBanks();
                                }else {
                                    window.alert('Problem occured... BloodBank ' + item.bbName + ' cannot be deleted ! ')
                                }
                            })
                        }
                    }
                    return( 
                        <tr key={index}>
                            <td>{item.bbId}</td>
                            <td>{item.bbName}</td>
                            <td>{item.bbEmail}</td>
                            <td>{item.bbPhone}</td>
                            <td>{item.bbAddress}</td>
                            <td>{item.bbCity}</td>
                            <td><button className="btn btn-sm btn-danger" onClick={deleteBloodBank}>Delete</button></td>

                        </tr>)
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default BloodBank