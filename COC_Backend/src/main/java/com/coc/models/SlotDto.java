package com.coc.models;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;

import com.coc.entities.Appointment;
import com.coc.entities.Slot;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@NoArgsConstructor@ToString
public class SlotDto {
	int slotId;
	String slotTime;
	
	@Bean
	public static Slot toEntity(SlotDto dto) {
		Slot entity = new Slot();
		BeanUtils.copyProperties(dto, entity);
		Appointment appointment = new Appointment();
		appointment.setSlot(entity);
		
		List<Appointment> appList = new ArrayList<Appointment>();
//		List<Appointment> newAppList = appList.stream().map(appointment -> appointment.getSlot().setSlotId(dto.getSlotId())).collect(Collectors.toList());
//		Stream<Appointment> newAppList = appList.stream().map(appointment -> appointment.)
		
		appList.add(appointment);
		
//		entity.setAppointment(appointment);
		entity.setAppointments(appList);
		return entity;
	}
	@Bean
	public static SlotDto fromEntity(Slot slot) {
		SlotDto dto = new SlotDto();
		BeanUtils.copyProperties(slot, dto, "appointments");
		return dto;
	}
}
