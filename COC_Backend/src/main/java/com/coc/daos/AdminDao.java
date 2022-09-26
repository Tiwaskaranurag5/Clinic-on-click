package com.coc.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import com.coc.entities.Admin;

public interface AdminDao extends JpaRepository<Admin, Integer>{
	Admin findByEmail(String email);
	

}
