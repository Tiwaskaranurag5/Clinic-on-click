package com.coc.services;

import java.util.List;

import com.coc.entities.Patient;
import com.coc.entities.Slot;
import com.coc.models.PatientDto;

public interface PatientService {
	List<Patient> findAll();
	Patient findByEmail(String email);
	Patient authenticate(String email, String password);
	Patient savePatient(Patient p);
	Boolean deletePatient(int p_id);
	Boolean changePassword(int patId, String oldPassword, String newPassword);
	Boolean updatePasswordById(int pId, String password);
	Patient editPatientDesc(int pId, String patDesc);
	
}
