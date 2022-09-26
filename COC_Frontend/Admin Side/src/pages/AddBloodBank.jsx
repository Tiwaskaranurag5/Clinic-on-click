import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../commons/constants';
import { useHistory } from 'react-router-dom';

function AddBloodBank() {
    var history = useHistory();
    const [bb_Name, setBbName] = useState('');
    const [bb_Phone, setBbPhone] = useState('');
    const [bb_Address, setBbAddress] = useState('');
    const [bb_Email, setBbEmail] = useState('');
    const [bb_City, setBbCity] = useState('');

    const addBloodBank = (e) => {
        e.preventDefault()

        const data = new FormData();

        data.append('bbName', bb_Name);
        data.append('bbPhone', bb_Phone);
        data.append('bbAddress', bb_Address);
        data.append('bbEmail', bb_Email);
        data.append('bbCity', bb_City);

        axios.post( url + '/bloodbank', data ).then((response) => {
            const result = response.data;
            if(result.status === 'success'){
                console.log(result.status);
                console.log(result.data);
                window.alert('New BloodBank is Added to  databases !')
                history.push('/bloodbank');
            }else{
                window.alert('Failed to add New BloodBank')
            }

        })
    }

    return (
        <>
            <div className="col-md-6 offset-md-3 mt-3">
                <h2 align='center'>Add a new Blood Bank</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="bloodbankName">Name</label>
                        <input type="text" className="form-control" id="bloodbankName" placeholder="Enter BloodBank Name" required="required" onChange={(e) => {
                            setBbName(e.target.value)
                        }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="bloodbankPhone">Contact Number</label>
                        <input type="number" className="form-control" id="bloodbankPhone" placeholder="Enter BloodBank Contact Number" required="required" onChange={(e) => {
                            setBbPhone(e.target.value)
                        }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="bloodbankEmail">Email ID</label>
                        <input type="email" className="form-control" id="bloodbankEmail" placeholder="Enter BloodBank Email Id" required="required" onChange={(e) => {
                            setBbEmail(e.target.value)
                        }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="bloodbankAddress">Address</label>
                        <input type="text" className="form-control" id="bloodbankAddress" placeholder="Enter BloodBank Address" required="required" onChange={(e) => {
                            setBbAddress(e.target.value)
                        }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="bloodbankCity">City</label>
                        <input type="text" className="form-control" id="bloodbankCity" placeholder="Enter BloodBank City" required="required" onChange={(e) => {
                            setBbCity(e.target.value)
                        }}/>
                </div>
                <hr/>
                <button type="button" className="btn btn-success" onClick={addBloodBank}>Add BloodBank</button>
            </div>
        </>
    )
}

export default AddBloodBank