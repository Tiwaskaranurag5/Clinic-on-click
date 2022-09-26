package com.coc.daos;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coc.entities.Appointment;

public interface AppointmentDao extends JpaRepository<Appointment, Integer> {
	List<Appointment> findBydoctorDocId(int docId);
	@Query(value = "select * from appointment where appDate=?2 and docId=?1",nativeQuery = true )
	Optional<List<Appointment>> findByDoctorDocIdAndAppDateLike(int docId,String appDate);
	Optional<List<Appointment>> findSlotsByDoctorDocId(int docId);
	
//	@Query(value = "select * from appointment where pId=?1",nativeQuery = true )
	Optional<List<Appointment>> findByPatientPatId(int pId);
	
}
