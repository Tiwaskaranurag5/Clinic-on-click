package com.coc.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coc.entities.Speciality;

public interface SpecialityDao extends JpaRepository<Speciality, Integer> {
	
}
