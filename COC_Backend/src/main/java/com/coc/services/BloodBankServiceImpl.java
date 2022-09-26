package com.coc.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coc.daos.BloodBankDao;
import com.coc.entities.BloodBank;
@Service
@Transactional
public class BloodBankServiceImpl implements BloodBankService {
	@Autowired
	BloodBankDao bloodBankDao;

	@Override
	public List<BloodBank> getAllBloodBanks() {
		return bloodBankDao.findAll();
	}

	@Override
	public List<BloodBank> searchBloodBankByCity(String bbCity) {
		return bloodBankDao.findByBbCityContaining(bbCity).orElse(null);
	}

	@Override
	public BloodBank addNewBloodBank(BloodBank bloodBank) {
		return bloodBankDao.save(bloodBank);
	}

	@Override
	public boolean deleteBloodBank(int bbId) {
		if(bloodBankDao.existsById(bbId)) {
			bloodBankDao.deleteById(bbId);
			return true;
		}
		return false;
	}
	
}
