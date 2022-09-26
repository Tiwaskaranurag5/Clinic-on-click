package com.coc.models;


import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;

import com.coc.entities.Doctor;
import com.coc.entities.Speciality;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@NoArgsConstructor@AllArgsConstructor@ToString
public class DoctorInDto {
	
	private String docId;
	private String spId;
	private String docExperience;
	
	private String docPhone , docCity, docDescription , docRegistrationNo,docName;
	
	private MultipartFile docVerificationDoc,docProfilePic;
	private String docFees;
	private boolean docIsOnline=false,docIsVerified=false;
	
	private String email;
	private String password;

	@Bean
	public static Doctor toEntity(DoctorInDto dto) {
		Doctor entity = new Doctor();
		BeanUtils.copyProperties(dto, entity, "d_verification_doc","d_profile_pic");
		entity.setDocProfilePic(String.valueOf(dto.getDocProfilePic()));
		entity.setDocVerificationDoc(String.valueOf(dto.getDocVerificationDoc()));
		
		Integer val = Integer.parseInt(dto.getSpId());
		Speciality s = new Speciality();
		s.setSpId(val.intValue());
		entity.setSpeciality(s);
		
		entity.setDocExperience(Integer.parseInt(dto.getDocExperience()));
		entity.setDocFees(Float.parseFloat(dto.getDocFees()));
		return entity;
	}

}
