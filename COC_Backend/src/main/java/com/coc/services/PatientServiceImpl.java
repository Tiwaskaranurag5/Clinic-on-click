package com.coc.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coc.daos.PatientDao;
import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.entities.Slot;
import com.coc.models.PatientDto;
@Service
@Transactional
public class PatientServiceImpl implements PatientService {
	@Autowired
	PatientDao patientDao;
	PasswordEncoder passencoder = new BCryptPasswordEncoder();

	@Override
	public Patient findByEmail(String email) {
		Patient pat = patientDao.findByEmail(email);
		return pat;
	}
	
	@Override
	public List<Patient> findAll() {
		return patientDao.findAll();
	}

	@Override
	public Patient authenticate(String email, String password) {
		Patient patient = findByEmail(email);
		
		if(patient != null &&  passencoder.matches(password, patient.getPassword()))
			return patient;
		return null;
	}
	@Override
	public Boolean changePassword(int patId, String oldPassword, String newPassword) {
		Patient p = patientDao.findById(patId).orElse(null);
		if(p != null) {
//			if(p.getPassword().equals(oldPassword)) 
			if(passencoder.matches(oldPassword,p.getPassword())){
				p.setPassword(new BCryptPasswordEncoder().encode(newPassword));
				//p.setPassword(newPassword);
				patientDao.save(p);
				return true;
			}
			return false;
		}
		return null;
	}

	@Override
	public Patient savePatient(Patient p) {
	    
		p.setPassword(new BCryptPasswordEncoder().encode(p.getPassword()));
		return patientDao.save(p); // save() is from crud repo, it returns the saved patient object
	}
	
	

	@Override
	public Boolean updatePasswordById(int pId, String password) {
		Patient p = patientDao.findById(pId).orElse(null);
		if(p != null) {
			System.out.println(password);
			p.setPassword(new BCryptPasswordEncoder().encode(password));
			patientDao.save(p);
			return true;			
		}
		return false;
	}
	
	@Override
	public Boolean deletePatient(int p_id) {
		if(patientDao.existsById(p_id)) {
			patientDao.deleteById(p_id);
			return true;
		}
		return false;
	}

	@Override
	public Patient editPatientDesc(int pId, String patDesc) {
		Patient p = patientDao.findById(pId).orElse(null);
		if(p != null) {
			p.setPatDescription(patDesc);
			return patientDao.save(p);			
		}
		return null;
	}

	


}
