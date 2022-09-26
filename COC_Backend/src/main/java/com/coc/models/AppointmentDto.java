package com.coc.models;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;

import com.coc.entities.Appointment;
import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.entities.Slot;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@NoArgsConstructor@ToString
public class AppointmentDto {

	private int appId;
	private int pId;
	private int docId;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date appDate;
	private int slotId;
//	private String patEmail;
	
	@Bean
	public static Appointment toEntity(AppointmentDto appointdto) {
		Appointment entity = new Appointment();
		BeanUtils.copyProperties(appointdto, entity,"pId","docId","slotId");
		//For Patient
		Patient p =new Patient();
		p.setPatId(appointdto.getPId());
		entity.setPatient(p);
		//For Doctor
		Doctor d = new Doctor();
		d.setDocId(appointdto.getDocId());
		entity.setDoctor(d);
		//For Slot
		Slot s = new Slot();
		s.setSlotId(appointdto.getSlotId());
//		s.setAppointments(null);
		entity.setSlot(s);
		return entity;
	}
	

}
