package com.coc.services;

import com.coc.entities.Admin;
import com.coc.entities.Doctor;


public interface AdminService {
//     Admin findById(int id);
	Admin findByEmail(String email);
	Admin authenticate(String email, String password);
	Boolean updatePasswordById(int docId, String newPassword);
}
