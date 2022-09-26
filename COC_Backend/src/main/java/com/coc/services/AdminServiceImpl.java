package com.coc.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coc.daos.AdminDao;
import com.coc.entities.Admin;
import com.coc.entities.Doctor;

@Transactional
@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	AdminDao adminDao;



	@Override
	public Admin findByEmail(String email) {
		Admin adm = adminDao.findByEmail(email);
		return adm;
	}

	@Override
	public Admin authenticate(String email, String password) {
		Admin admin = findByEmail(email);
		if(admin != null && admin.getPassword().equals(password))
			return admin;
		return null;
	}
//	@Override
//	public Admin findById(int id) {
//		if(adminDao.existsById(id)) {
//			return adminDao.findById(id).orElse(null);
//		}
//		else 
//			return null;
//	}

	@Override
	public Boolean updatePasswordById(int AdId, String newPassword) {
		Admin a = adminDao.findById(AdId).orElse(null);
		if(a != null) {
			System.out.println(newPassword);
			a.setPassword(newPassword);
			adminDao.save(a);
			return true;			
		}
		return false;
	}



}
