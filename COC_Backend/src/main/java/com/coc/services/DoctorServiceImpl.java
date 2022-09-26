package com.coc.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.coc.daos.DoctorDao;
import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.models.DoctorInDto;
import com.coc.models.DoctorOutDto;
import com.coc.utils.StorageService;
@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
	@Autowired
	DoctorDao doctorDao;
	@Autowired
	StorageService storageService; 
	PasswordEncoder passencoder = new BCryptPasswordEncoder();
	
	@Override
	public Doctor saveDoctor(Doctor d, MultipartFile file1, MultipartFile file2) {
		String verificationDocName = storageService.store(file1);
		String profilePicName = storageService.store(file2);
	
		d.setDocVerificationDoc(verificationDocName);
		d.setDocProfilePic(profilePicName);
		d.setPassword(new BCryptPasswordEncoder().encode(d.getPassword()) );
		return doctorDao.save(d); // save() is from crud repo, it returns the saved doctor object
	}

	@Override
	public DoctorOutDto editDoctor(DoctorInDto docDto) {
		Doctor d = doctorDao.findById(Integer.parseInt(docDto.getDocId())).orElse(null);
		if(d != null) {
			d.setDocCity(docDto.getDocCity());
			d.setDocPhone(docDto.getDocPhone());
			d.setDocDescription(docDto.getDocDescription());
			d.setDocExperience(Integer.parseInt(docDto.getDocExperience()));
			d.setDocFees(Float.parseFloat(docDto.getDocFees()));
			
			String profilePicName = storageService.store(docDto.getDocProfilePic());
			d.setDocProfilePic(profilePicName);
			
			return DoctorOutDto.fromEntity(d);
		}
		return null;
	}
	@Override
	public List<Doctor> findAll() {
		return doctorDao.findAll();
	}
	
	@Override
	public Doctor findDoctorByEmail(String email) {
		return doctorDao.findByEmail(email);
	}

	@Override
	public Doctor authenticate(String email, String password) {
		Doctor doc = findDoctorByEmail(email);
		if(doc != null && passencoder.matches(password, doc.getPassword()))
			return doc;
		return null;
	}

	@Override
	public Boolean changePassword(int docId, String oldPassword, String newPassword) {
		Doctor d = doctorDao.findById(docId).orElse(null);
		if(d != null) {
			if(passencoder.matches(oldPassword, d.getPassword())) {
				d.setPassword(new BCryptPasswordEncoder().encode(newPassword));
				doctorDao.save(d);
				return true;
			}
			return false;
		}
		return null;
	}

	@Override
	public Doctor updateVerificationStatus(int d_id){
		if(doctorDao.existsById(d_id)) {
			Doctor d = doctorDao.findById(d_id).orElse(null);
			if(!d.getDocIsVerified())
				d.setDocIsVerified(true);
			else
				d.setDocIsVerified(false);	
			return doctorDao.save(d);
		}
		return null;
	}


	@Override
	public Doctor toggleOnlineStatus(int docId) {
		if(doctorDao.existsById(docId)) {
			Doctor d = doctorDao.findById(docId).orElse(null);
			if(!d.getDocIsOnline())
				d.setDocIsOnline(true);
			else
				d.setDocIsOnline(false);	
			return doctorDao.save(d);
		}
		return null;
	}

	@Override
	public Boolean deleteDoctor(int d) {
		if(doctorDao.existsById(d)) {
			doctorDao.deleteById(d);
			return true;
		}
		else
			return false;
	}

	@Override
	public Doctor findById(int id) {
		if(doctorDao.existsById(id)) {
			return doctorDao.findById(id).orElse(null);
		}
		else 
			return null;
	}

	@Override
	public List<Doctor> getAllDoctorsBySpId(int spId) {
		return doctorDao.findBySpecialitySpId(spId).orElse(null);
	}

	@Override
	public List<Doctor> searchDoctorsByNameKeyword(String docNameKey) {
		return doctorDao.findByDocNameContaining(docNameKey).orElse(null);
	}

	@Override
	public List<Doctor> showAllVerifiedDoctors(boolean isVerified) {
		return doctorDao.findByDocIsVerified(isVerified).orElse(null);
	}

	@Override
	public List<Doctor> showVerifiedDoctorsBySpId(int spId) {
		return doctorDao.findBySpecialitySpIdAndDocIsVerified(spId, true).orElse(null);
	}

	@Override
	public int countTotalOnlineVerifiedDoctors() {
		return doctorDao.countByDocIsOnlineAndDocIsVerified(true,true);
	}

	@Override
	public Doctor editDoctorDesc(int dId, String docDesc) {
		Doctor d = doctorDao.findById(dId).orElse(null);
		if(d != null) {
			d.setDocDescription(docDesc);
			return doctorDao.save(d);			
		}
		return null;
	}

	@Override
	public Boolean updatePasswordById(int docId, String newPassword) {
		Doctor d = doctorDao.findById(docId).orElse(null);
		if(d != null) {
			System.out.println(newPassword);
			d.setPassword(new BCryptPasswordEncoder().encode(newPassword) );
			doctorDao.save(d);
			return true;			
		}
		return false;
	}

	
}
