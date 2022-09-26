package com.coc.services;

import java.util.List;

import com.coc.entities.BloodBank;

public interface BloodBankService {
	List<BloodBank> getAllBloodBanks();
	List<BloodBank> searchBloodBankByCity(String bbCity);
	BloodBank addNewBloodBank(BloodBank bloodBank);
	boolean deleteBloodBank(int bbId);
}
