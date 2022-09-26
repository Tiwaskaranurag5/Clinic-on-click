package com.coc.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coc.entities.Doctor;
import com.coc.entities.Patient;

public interface DoctorDao extends JpaRepository<Doctor, Integer> {
	Doctor findByEmail(String email);

	Optional<List<Doctor>> findBySpecialitySpId(int specialityId);
	Optional<List<Doctor>> findByDocNameContaining(String docNameKey);
	Optional<List<Doctor>> findByDocIsVerified(Boolean isVerified);
	Optional<List<Doctor>> findBySpecialitySpIdAndDocIsVerified(int spId, Boolean isVerified);
	Integer countByDocIsOnlineAndDocIsVerified(Boolean docisOnline, Boolean docIsVerified);
}
