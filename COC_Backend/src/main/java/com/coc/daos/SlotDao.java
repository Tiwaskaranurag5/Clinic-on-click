package com.coc.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coc.entities.Slot;

public interface SlotDao extends JpaRepository<Slot, Integer> {
	
}
