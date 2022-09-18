import React, { useState } from 'react'
import Axios from 'axios'
import { url } from '../commons/constants';

function AddSpeciality() {
    const [spec_name, setSpec_name] = useState('')
    const [spec_description, setSpec_description] = useState('');
    const [spec_icon, setSpec_icon] = useState(undefined);

    const addSpecialityToDB = (e) =>{
        e.preventDefault()

        const data = new FormData();

        data.append('spName', spec_name);
        data.append('spDescription', spec_description);
        data.append('spIcon', spec_icon);

        Axios.post(url+'/admin/speciality', data).then((response) => {
            console.log(response.status)
            console.log(response.data)
            window.alert('New Speciality is successfully added !')
            // if(response.status === 'success'){
            // }else{
            //     window.alert('problem in adding new speciality !')
            // }
        })
    }

    return (
        <>
                <div className="col-md-6 offset-md-3 mt-5">
                   <h2 align='center'>Add a new Speciality</h2>
                   <hr />
                   <br/>
                    <div className="form-group">
                        <label htmlFor="specialityName">Seciality Name</label>
                        <input type="text" className="form-control" id="specialityName" placeholder="Enter new Speciality name" required="required" onChange={(e) =>{
                            setSpec_name(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialityDescription">Speciality Description</label>
                        <textarea name="" id="specialityDescription" className="form-control" placeholder="Some description about the speciality here" rows="3" onChange={(e) =>{
                            setSpec_description(e.target.value)
                        }}></textarea>
                    </div>

                    <hr />
                    <div className="form-group mt-3">
                        <label className="mr-2">Upload Speciality Icon:</label>
                        <input type="file" onChange={(e) =>{
                            setSpec_icon(e.target.files[0])
                        }}/>
                    </div>
                    <hr />
                    
                        <button type= "button" className="btn btn-success col-md-6 offset-md-3" onClick={addSpecialityToDB}>Add Speciality</button>
                   

                </div>
        
        </>
    )
}

export default AddSpeciality
