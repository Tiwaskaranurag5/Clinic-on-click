import { React, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { url } from './../commons/constants';
import { useHistory } from 'react-router-dom';

function UpdateSpecialityModal({ item, closeModal }) {
    const [spec_description, setSpec_description] = useState('');
    const [spec_icon, setSpec_icon] = useState(undefined);
    const history = useHistory()

    const updateSpeciality = (e) => {
        e.preventDefault()

        const data = new FormData();

        data.append('spId', item.spId);
        data.append('spName', item.spName);
        data.append('spDescription', spec_description);
        data.append('spIcon', spec_icon);
        const r = window.confirm("Please confirm the currently entered fields of (#"+item.spId+") "+item.spName+".\nProceed to update ?");
        if(r){
            axios.put(url + '/admin/speciality', data).then((response) => {
                const result = response.data
                if(result.status === 'success'){
                    window.alert('speciality updated successfully !')
                    closeModal(false)
                    history.push('/specialities')
                    // return <Redirect to='/specialities'/>
                }else{
                    window.alert('Failed to update Speciality: '+item.spName)
                }
            })

        }
    }
    return (
        <div className="modal fade" tabindex="-1" aria-hidden="false" id="UpdateSpecialityModal" aria-labelledby="UpdateSpecialityModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="UpdateSpecialityModalLabel">Update Speciality : {item.spName} </h4>
                        <h6>Spec Id: <b>{item.spId}</b></h6>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                            closeModal(false)
                        }}>X</button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="specialityName">Speciality Name</label>
                            <input type="text" className="form-control" id="specialityName" value={item.spName} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="specialityDescription">Speciality Description</label>
                            <textarea name="" id="specialityDescription" className="form-control" placeholder={item.spDescription} rows="3" onChange={(e) => {
                                setSpec_description(e.target.value)
                            }}></textarea>
                        </div>

                        <hr />
                        <div className="form-group mt-3">
                            <label className="mr-2">Upload Speciality Icon:</label>
                            <input type="file" onChange={(e) => {
                                setSpec_icon(e.target.files[0])
                            }} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={updateSpeciality}>Update</button>
                        <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={() => {
                            closeModal(false)
                        }}>Close</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateSpecialityModal
