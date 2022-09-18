import React from 'react'
import { url } from '../commons/constants'


function VerificationModal({ item, closeModal }) {
    return (
        <div className="modal fade" tabindex="-1" aria-hidden="false" id="exampleModal" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">Verification document for Dr.{item.docName} </h4> 
                        <h6>Registration no. <b>{item.docRegistrationNo}</b></h6>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                            closeModal(false)
                        }}>X</button>
                    </div>
                    <div className="modal-body">
                        <embed src={url + "/" + item.docVerificationDoc} style={{minHeight:'70vh',minWidth:'100%'}}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                            closeModal(false)
                        }}>Close</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerificationModal
