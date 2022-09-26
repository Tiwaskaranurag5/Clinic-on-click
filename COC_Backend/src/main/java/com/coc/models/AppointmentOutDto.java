package com.coc.models;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;

import com.coc.entities.Appointment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@NoArgsConstructor@ToString
public class AppointmentOutDto {

	private int appId;
	private String pName;
	private String docName;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date appDate;
	private int slotId;
	private String slotTime;
	
	@Bean
	public static AppointmentOutDto fromEntity(Appointment entity) {
		AppointmentOutDto dto = new AppointmentOutDto();
		BeanUtils.copyProperties(entity, dto, "doctor","patient","slot");
		dto.setPName(entity.getPatient().getPatName());
		dto.setDocName(entity.getDoctor().getDocName());
		dto.setSlotTime(entity.getSlot().getSlotTime());
		dto.setSlotId(entity.getSlot().getSlotId());
		return dto;
	}
	
}
