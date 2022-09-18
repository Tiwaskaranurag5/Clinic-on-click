import React from 'react'
import { Link } from 'react-router-dom'

function docList({items}) {
    return (
        <div>
               <div className="py-5">
            <div className="container">
                <div className="row hidden-md-up">
            { items.map((item) => {
                 <div className="col-md-4">
                 <div className="card">
                     <div className="row">
                         <div className="col-sm-4 left-pan">
                             <div className="profile-img">
                                 <img src="./images/doc_profile_1.jpg" style={{ height: "50px", width: "50px", borderRadius: "50px" }} />
                             </div>
                             {item.spec_name}
                         </div>
                         <div className="col-sm-8 right-pan">
                             <h4>{item.doctorList.d_name}</h4>
                             <p>Cardiologist</p>
                         </div>
                     </div>
                     <div className="row">
                         <div className="col-sm-4 left-pan">
                             Verified
                         </div>
                         <div className="col-sm-8 right-pan">
                             <h3>Rs:200</h3>
                             <p>First Consultation</p>
                         </div>
                     </div>
                     <div className="row">
                         <div className="col-sm-12 left-pan">
                             <Link to ={`/appointment/${item.doctorList.docId}`}>
                             <button type="button" class="btn btn-primary" style={{ display: "flex", justifyContent: "center" }}>Primary</button>
                            </Link>
                         </div>
                     </div>
                 </div>
             </div>
            }) }
         
                    
                   
                 
                     </div><br />
                    </div>
            </div>
        </div>
    )
}

export default docList
