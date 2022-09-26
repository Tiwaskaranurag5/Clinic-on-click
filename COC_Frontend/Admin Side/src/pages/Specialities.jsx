import React from 'react'
import { useState, useEffect } from 'react'
import { url } from '../commons/constants'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import UpdateSpecialityModal from './../components/UpdateSpecialityModal';


function Specialities() {
    const [allSpecialities, setAllSpecialities] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [specObj, setSpecObj] = useState('');
    const history = useHistory();
    const routeChange = () => {
        let path = '/addspeciality';
        history.push(path);
    }
    useEffect(() => {
        getAllSpecialities();
    }, [])

    const getAllSpecialities = () => {
        axios.get(url + '/admin/findSpecialities').then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                console.log(result.data)
                setAllSpecialities(result.data)
            } else {
                alert("Error fetching in Specialities Data...!!!")
            }
        })
    }

    return (
        <div>

            <div className="container">
                <div className="columns">
                    <div className="four-fifth column center-text">
                        <h3>All Specialities</h3>
                    </div>
                    <div className="one-fifths column ">
                        <button className="btn btn-success" style={{ float: "right" }} onClick={routeChange}>Add New Speciality</button>

                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Speciality Name</th>
                        <th scope="col">Icon</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allSpecialities.map((item, index) => {
                        const deleteSpeciality = () => {
                            const r = window.confirm("Do you really want to delete Speciality (#" + item.spId + ") " + item.spName + " ?");
                            if (r) {
                                axios.delete(url + '/admin/speciality/' + item.spId).then((response) => {
                                    const result = response.data
                                    if (result.status === 'success') {
                                        getAllSpecialities();
                                    } else {
                                        window.alert(item.spName + ' cannot be deleted !')
                                    }

                                })

                            }
                        }

                        return (
                            <tr key={index}>
                                {/* <th scope="row">1</th> */}
                                <td>{item.spId}</td>
                                <td>{item.spName}</td>
                                <td><img src={url + '/' + item.spIcon} style={{ height: "50px", width: "50px" }} /></td>
                                <td>{item.spDescription}</td>
                                {/* TODO: Update speciality */}
                                <td><button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#UpdateSpecialityModal" onClick={() => {
                                    setShowModal(true);
                                    setSpecObj(item);
                                }}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={deleteSpeciality}>Remove</button></td>
                                {showModal && <UpdateSpecialityModal item={specObj} closeModal={setShowModal} />}
                            </tr>)
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Specialities
