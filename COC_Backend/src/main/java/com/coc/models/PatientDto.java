package com.coc.models;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;

import com.coc.entities.Patient;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString@NoArgsConstructor@AllArgsConstructor
public class PatientDto {
	@JsonProperty("patId")
	private int patId;
	
	@JsonProperty("patName")
	private String patName;
	
	@JsonProperty("patGender")
	private String patGender;
	
	@JsonProperty("patPhone")
	private String patPhone;
	
	@JsonProperty("patDob")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date patDob;
	
	@JsonProperty("patDescription")
	private String patDescription;
	
	private String email;
	private String password;

	@Bean
	public static Patient toEntity(PatientDto pdto) {
		Patient entity = new Patient();
		BeanUtils.copyProperties(pdto, entity);
//		entity.setPatId(Integer.parseInt(pdto.getPatId()));
		return entity;
	}
	
	public static PatientDto fromEntity(Patient entity) {
		PatientDto dto = new PatientDto();
		BeanUtils.copyProperties(entity, dto);
//		dto.setPatId(String.valueOf(entity.getPatId()));
		return dto;
	}
	
	
}
