package com.coc.models;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;

import com.coc.entities.Appointment;
import com.coc.entities.Doctor;
import com.coc.entities.Speciality;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter@Setter@AllArgsConstructor@ToString@NoArgsConstructor
public class DoctorOutDto {
//	@JsonProperty(value = "d_id")
	private String docId;
	private String docExperience;
	private String sp_name;
	private String docPhone , docCity, docDescription , docRegistrationNo,docName;
	
	private String docVerificationDoc,docProfilePic;
	private String docFees;
	private boolean docIsOnline,docIsVerified;

	private String email;
	private String password;

	
	@Bean
	public static DoctorOutDto fromEntity(Doctor entity) {
		DoctorOutDto dto = new DoctorOutDto();
		BeanUtils.copyProperties(entity, dto,"speciality","appointments");
		dto.setSp_name(entity.getSpeciality().getSpName());
		dto.setDocExperience(String.valueOf(entity.getDocExperience()));
		dto.setDocFees(String.valueOf(entity.getDocFees()));
		dto.setDocId(String.valueOf(entity.getDocId()));
		System.out.println(dto.getSp_name());
		return dto;
	}


	
	
}
