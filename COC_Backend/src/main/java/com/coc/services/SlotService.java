package com.coc.services;

import java.util.List;

import com.coc.entities.Slot;
import com.coc.models.SlotDto;

public interface SlotService {

	List<Slot> getAllSlots();

	SlotDto addNewSlot(SlotDto dto);

	boolean deleteSlot(int slotid);
}
