package com.coc.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.coc.entities.Appointment;
import com.coc.entities.Doctor;
import com.coc.models.DoctorInDto;
import com.coc.models.DoctorOutDto;

public interface DoctorService {
	Doctor saveDoctor(Doctor d, MultipartFile file1, MultipartFile file2);
	List<Doctor> findAll();
	Doctor authenticate(String email, String password);
	Doctor findById(int id);
	Doctor findDoctorByEmail(String email);
	Boolean deleteDoctor(int d);
	List<Doctor> searchDoctorsByNameKeyword(String docNameKey);
	List<Doctor> getAllDoctorsBySpId(int spId);
	List<Doctor> showAllVerifiedDoctors(boolean isVerified);
	List<Doctor> showVerifiedDoctorsBySpId(int spId);
	Doctor updateVerificationStatus(int d_id);
	Doctor toggleOnlineStatus(int docId);
	DoctorOutDto editDoctor(DoctorInDto docDto);
	Boolean changePassword(int docId, String oldPassword, String newPassword);
	Boolean updatePasswordById(int docId, String newPassword);
	int countTotalOnlineVerifiedDoctors();
	Doctor editDoctorDesc(int dId, String docDesc);
}
