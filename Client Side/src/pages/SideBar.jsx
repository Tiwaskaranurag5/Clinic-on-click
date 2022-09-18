import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './../components/Navbar';
import Home from './Home';
import DocSignUp from './DocSignUp';
import BookAppointment from './BookAppointment';
import Welcome from './Welcome';
import '../components/nav';
import '../components/Navbar.css'
import DoctorsBySpeciality from './../components/DoctorsBySpeciality';
import Settings from './Settings';
import AppointmentConfirmation from './AppointmentConfirmation';
import BloodBank from './BloodBank';
import ViewPatientAppointments from './ViewPatientAppointments';

import ViewDocInfo from './ViewDocInfo';
import BloodBankSearch from './BloodBankSearch';



function SideBar({authorized,setIsAuthorized}) {
 
  // if(!authorized)
  //   return <Redirect to="/"/>
  return (
    <div>
      <Router>
            <Navbar enablePersistence={true} setIsAuthorized={setIsAuthorized} />
            <Switch>
              {/* <Route  path='/'>
                <Redirect to ='/welcome' />
              </Route> */}
              <Route path='/welcome'component={Welcome} />
              <Route path='/home' component={()=>{return <Home enablePersistence={true} />}} />
              <Route path='/blood' component={BloodBank} />
              <Route path='/bloodsearchresults' component={BloodBankSearch}/>
              <Route path='/docSignUp' component={DocSignUp} />
              <Route path='/setting' component={Settings}/>
              {/* <Route path='/docBySpec' exact component={DoctorsBySpeciality} /> */}
              <Route path='/docBySpec/:id' enablePersistence={true} component={DoctorsBySpeciality} />
              <Route path='/appointment/:id' component={BookAppointment} />
              <Route path='/confirm' component={AppointmentConfirmation} />
              <Route path='/patientAppointment' component={ViewPatientAppointments} />

              {/* <Route path='/docBySpec' component={} /> */}
               {/* <Route path='/signin' component={Signin} /> */}
            </Switch>
      </Router>
    </div>

    
  )
}

export default SideBar
