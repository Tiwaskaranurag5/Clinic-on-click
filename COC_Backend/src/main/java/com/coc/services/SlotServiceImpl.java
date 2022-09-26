package com.coc.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coc.daos.SlotDao;
import com.coc.entities.Slot;
import com.coc.models.SlotDto;
@Service
@Transactional
public class SlotServiceImpl implements SlotService {
	@Autowired
	SlotDao slotDao;

	@Override
	public List<Slot> getAllSlots() {
		return slotDao.findAll();
	}

	@Override
	public SlotDto addNewSlot(SlotDto dto) {
		Slot slot = SlotDto.toEntity(dto);
		if(slot != null) {
			return SlotDto.fromEntity(slotDao.save(slot));
		}
		return null;
	}

	@Override
	public boolean deleteSlot(int slotid) {
		if(slotDao.existsById(slotid)) {
			slotDao.deleteById(slotid);
			return true;
		}
		return false;
	}

}
