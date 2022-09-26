import React from 'react'
import { useState, useEffect } from 'react'
import { url } from '../commons/constants'
import axios from 'axios'


function Patients() {

    const [allPatients, setAllPatients] = useState([])

    useEffect(() => {
        getAllPatients();
    }, [])

    const getAllPatients = () => {
        axios.get(url + '/admin/patients').then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                setAllPatients(result.data)
            } else {
                alert("Error fetching in Patients Data...!!!")
            }
        })
    }
    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="four-fifth column center-text">
                        <h3>Patients List</h3>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DateOfBirth</th>
                        <th scope="col">Description</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allPatients.map((item, index) => {
                        const deletePatient = () => {
                            const r = window.confirm("Do you really want to delete Patient (#" + item.patId + ") " + item.patName + " ?");
                            if (r) {
                                axios.delete(url + '/admin/patients/' + item.patId).then((response) => {
                                    const result = response.data
                                    if (result.status === 'success') {
                                        getAllPatients();
                                    } else {
                                        window.alert(item.patName + ' cannot be deleted !')
                                    }
                                })
                            }
                        }
                        return (
                            <tr key={index}>
                                <td>{item.patId}</td>
                                <td>{item.patName}</td>
                                <td>{item.patGender}</td>
                                <td>{item.patPhone}</td>
                                <td>{item.patDob}</td>
                                <td>{item.patDescription}</td>
                                <td>{item.email}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={deletePatient}>Delete</button></td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default Patients
