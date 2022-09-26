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
              <Route  path='/client/home'component={Welcome} />
              <Route  path='/client/speciality' component={()=>{return <Home enablePersistence={true} />}} />
              <Route  path='/client/blood' component={BloodBank} />
              <Route  path='/client/bloodsearchresults' component={BloodBankSearch}/>
              <Route  path='/client/docSignUp' component={DocSignUp} />
              <Route  path='/client/setting' component={Settings}/>
              {/* <Route path='/docBySpec' exact component={DoctorsBySpeciality} /> */}
              <Route  path='/client/docBySpec/:id' enablePersistence={true} component={DoctorsBySpeciality} />
              <Route  path='/client/appointment/:id' component={BookAppointment} />
              <Route path='/client/confirm' component={AppointmentConfirmation} />
              <Route  path='/client/patientAppointment' component={ViewPatientAppointments} />

              {/* <Route path='/docBySpec' component={} /> */}
               {/* <Route path='/signin' component={Signin} /> */}
            </Switch>
      </Router>
    </div>

    
  )
}

export default SideBar
