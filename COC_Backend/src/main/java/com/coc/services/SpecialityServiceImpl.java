package com.coc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.coc.daos.SpecialityDao;
import com.coc.entities.Speciality;
import com.coc.utils.StorageService;
@Service
@Transactional
public class SpecialityServiceImpl implements SpecialityService {
	@Autowired
	SpecialityDao specialityDao;

	@Autowired
	StorageService storageService;
	
	@Override
	public List<Speciality> findAll() {
		List<Speciality> list = specialityDao.findAll();
		return list;
	}

	@Override
	public Speciality addNewSpeciality(Speciality spec, MultipartFile file) {
		String specIconName = storageService.store(file);
		spec.setSpIcon(specIconName);
		return specialityDao.save(spec);
	}

	@Override
	public Speciality saveSpeciality(Speciality spec, MultipartFile file1) {
		String specIcon = storageService.store(file1);
		spec.setSpIcon(specIcon);
		
		return specialityDao.save(spec);
		
	}
	
	public Boolean deleteSpeciality(int sp_id) {
		if(specialityDao.existsById(sp_id)) {
			specialityDao.deleteById(sp_id);
			return true;
		}else
			return false;
	}
	
	
}
