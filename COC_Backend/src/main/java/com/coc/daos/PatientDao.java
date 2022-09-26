package com.coc.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coc.entities.Patient;

public interface PatientDao extends JpaRepository<Patient, Integer>{
	Patient findByEmail(String email);
}
