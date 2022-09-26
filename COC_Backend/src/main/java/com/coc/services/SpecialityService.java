package com.coc.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.coc.entities.Doctor;
import com.coc.entities.Speciality;


public interface SpecialityService {
	
	List<Speciality> findAll();
	Speciality addNewSpeciality(Speciality spec , MultipartFile specIcon);
	Speciality saveSpeciality(Speciality spec, MultipartFile file1);
	Boolean deleteSpeciality(int sp_id);
}
