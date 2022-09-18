import React from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import { url } from './../commons/constants';

function AddSlot() {
    const [slotTime, setSlotTime] = useState('');
    const history = useHistory()
    const addSlot = ()=>{
        axios.post(url + '/admin/slot/',{slotTime:slotTime}).then((response =>{
            const result = response.data
            if(result.status ==='success'){
                window.alert('Slot added successfully')
                history.push('/allslots')
            }else{
                window.alert('problem occurred during fetching Slots data')
            }
        }))

    }

    return (
        <div>
            <div className="col-md-6 offset-md-3 mt-5">
                <h2 align='center'>Add a new Slot</h2>
                <br/>
                <hr />
                <div className="form-group">
                    <label htmlFor="slotid">Enter Slot Time</label>
                    <input type="text" className="form-control" id="slotid" placeholder="Slot Time (HH : MM)" required="required" onChange={(e) =>{
                        setSlotTime(e.target.value)
                    }}/>
                </div>
                
                <hr />
                <button type="button" className="btn btn-success offset-md-3" onClick={addSlot}>Add Slot</button>
                <Link to='/allslots'>
                    <button type="button" className="btn btn-warning offset-md-2">Back</button>
                </Link>
            </div>
        </div>
    )
}

export default AddSlot;
