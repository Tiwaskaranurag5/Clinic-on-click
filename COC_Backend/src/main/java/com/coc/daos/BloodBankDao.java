package com.coc.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coc.entities.BloodBank;

public interface BloodBankDao extends JpaRepository<BloodBank, Integer>{
	Optional<List<BloodBank>> findByBbCityContaining(String cityKeyword);
}
