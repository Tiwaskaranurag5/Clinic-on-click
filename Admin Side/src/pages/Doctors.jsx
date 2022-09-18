import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../commons/constants";
import "./Doctors.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import VerificationModal from "../components/VerificationModal";
import { FaSearch } from "react-icons/fa";

function Doctors() {
    const [searchQuery, setsearchQuery] = useState("");
    const [allDoctors, setAllDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [docState, setdocState] = useState("");
    const history = useHistory();
    const routeChange = () => {
        let path = "/addDoctor";
        history.push(path);
    };

    useEffect(() => {
        getAllDoctors();
    }, []);

    const getAllDoctors = () => {
        axios.get(url + "/admin/doctors").then((response) => {
            const result = response.data;
            if (result.status === "success") {
                setAllDoctors(result.data);
            } else {
                alert("Error fetching in Doctor's Data...!!!");
            }
        });
    };

    return (
        <div>
            <div className="columns">
                <div className="four-fifth column center-text">
                    <h3>Doctors Data</h3>
                </div>
                <div>
                    <div className="four-fifths column ">
                        <div className="row d-flex justify-content-center mt-50">
                            <div className="col-md-4">
                                <form className="flex-nowrap col ml-auto footer-subscribe p-0">
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setsearchQuery(e.target.value);
                                        }}
                                        className="form-control"
                                        placeholder="Search by name"
                                    />
                                    <Link to ={`/docsearchresult?query=${searchQuery}`}>
                                    <button className="btn btn-theme bg-orange">
                                        <FaSearch />
                                    </button></Link>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="one-fifths column ">
                        <Link to="/addDoctor">
                            <button
                                className="btn btn-success"
                                style={{ float: "right" }}
                                onClick={routeChange}
                            >
                                Add New Doctor
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <h3>Doctors Data</h3>
            <div className="align">
                <button className="btn btn-success">Add New Doctor</button>
            </div> */}
            <div className="container-fluid">
                <table
                    className="table table-striped table-hover table-sm text-center"
                    style={{ marginLeft: "-170px", minWidth: "100%" }}
                >
                    <thead>
                        <tr>
                            <th scope="col">Active status</th>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Speciality</th>
                            <th scope="col">City</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Experience in year(s)</th>
                            <th scope="col">Registration No.</th>
                            <th scope="col">Description</th>
                            <th scope="col">Fees</th>
                            <th scope="col">Email</th>
                            <th scope="col">Profile Pic</th>
                            <th scope="col">Verification Docs</th>
                            <th scope="col">Action</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allDoctors.map((item, index) => {
                            const toggleisVerifiedStatus = () => {
                                axios
                                    .put(url + "/admin/verifydoc/" + item.docId)
                                    .then((response) => {
                                        const result = response.data;
                                        if (result.status === "success") {
                                            window.alert(
                                                "Verification status for Dr. " +
                                                item.docName +
                                                " Successfully updated !"
                                            );
                                            getAllDoctors();
                                        } else {
                                            window.alert("updating verification status Failed!");
                                        }
                                    });
                            };

                            const deleteDoctor = () => {
                                const r = window.confirm(
                                    "Do you really want to delete Doctor (#" +
                                    item.docId +
                                    ") Dr. " +
                                    item.docName +
                                    " ?"
                                );
                                if (r) {
                                    axios
                                        .delete(url + "/admin/deletedoc/" + item.docId)
                                        .then((response) => {
                                            const result = response.data;
                                            if (result.status === "success") {
                                                getAllDoctors();
                                            } else {
                                                window.alert(
                                                    "Problem occured... Dr. " +
                                                    item.docName +
                                                    " cannot be deleted !"
                                                );
                                            }
                                        });
                                }
                            };
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.docIsOnline ? (
                                            <span class="badge bg-success">Online</span>
                                        ) : (
                                            <span class="badge bg-secondary">Offline</span>
                                        )}
                                    </td>
                                    <td>{item.docId}</td>
                                    <td>{item.docName}</td>
                                    <td>{item.speciality.spName}</td>
                                    <td>{item.docCity}</td>
                                    <td>{item.docPhone}</td>
                                    <td>{item.docExperience}</td>
                                    <td>{item.docRegistrationNo}</td>
                                    <td>{item.docDescription}</td>
                                    <td>{item.docFees}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <img
                                            src={url + "/" + item.docProfilePic}
                                            alt={item.docName}
                                            style={{ height: "70px", width: "70px" }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                setShowModal(true);
                                                setdocState(item);
                                            }}
                                        >
                                            View Doc
                                        </button>
                                    </td>
                                    <td>
                                        {item.docIsVerified ? (
                                            <button
                                                id="validate"
                                                className="btn btn-sm btn-danger"
                                                onClick={toggleisVerifiedStatus}
                                            >
                                                InValidate
                                            </button>
                                        ) : (
                                            <button
                                                id="validate"
                                                className="btn btn-sm btn-success"
                                                onClick={toggleisVerifiedStatus}
                                            >
                                                Validate
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={deleteDoctor}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                    {showModal && (
                                        <VerificationModal
                                            item={docState}
                                            closeModal={setShowModal}
                                        />
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Doctors;
