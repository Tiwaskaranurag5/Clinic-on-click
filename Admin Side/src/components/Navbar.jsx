import React from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Specialities from './../pages/Specialities';
import Doctors from './../pages/Doctors';
import Patients from './../pages/Patients';
import AddSpeciality from './../pages/AddSpeciality';
import DocSignUp from '../pages/DocSignUp';
import BloodBank from './../pages/BloodBank';
import AddBloodBank from './../pages/AddBloodBank';
import DocSearchResult from '../pages/DocSearchResult';
import Slots from './../pages/Slots';
import AddSlot from './../pages/AddSlot';

function Navbar({authorized, setIsAuthorized}) {
    const history = useHistory();
    var logout = () => {
        if(window.confirm('Do you really want to log out ?')){
            sessionStorage.clear();
            setIsAuthorized(false);
            history.push('/');
        }
    }
    // if( !authorized)
    // return <Redirect to= '/nav'/>
    return (
        <div>
            <BrowserRouter>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand">Admin | DigiHeal</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        
                        <Link to="/doctors">
                            <a class="nav-item nav-link" >Doctors</a>
                        </Link>
                        <Link to="/specialities">
                            <a class="nav-item nav-link" >Specialities</a>
                        </Link>
                        <Link to="/patients">
                            <a class="nav-item nav-link" >Patients</a>
                        </Link>
                        <Link to="/bloodbank">
                            <a class="nav-item nav-link" >BloodBank</a>
                        </Link>
                        <Link to="/allslots">
                            <a class="nav-item nav-link" >Slots</a>
                        </Link>
                        
                            <div class="nav-item nav-link" style={{textAlign:'right'}} role="button" onClick={logout}><button>Logout</button></div>
                        
                    </div>
                </div>
            </nav>
         
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/"/>
                    </Route> 
                    <Route path="/doctors" component={Doctors}/>
                    <Route path="/specialities" component={Specialities}/>
                    <Route path="/patients" component={Patients}/>
                    <Route path="/addspeciality" component={AddSpeciality}/>
                    <Route path="/addDoctor" component={DocSignUp}/>
                    <Route path="/bloodbank" component={BloodBank}/>
                    <Route path="/addbloodbank" component={AddBloodBank}/>
                    <Route path="/docsearchresult" component={DocSearchResult}/>
                    <Route path="/allslots" component={Slots}/>
                    <Route path="/addslot" component={AddSlot}/>
                </Switch>
    
            </BrowserRouter>
        </div>
    )
}

export default Navbar
