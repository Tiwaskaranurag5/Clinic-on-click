package com.coc.models;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;

import com.coc.entities.Speciality;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString@AllArgsConstructor@NoArgsConstructor
public class SpecialityDto {

	int spId;
	String spName;
	String spDescription;
	MultipartFile spIcon;
	
	@Bean
	public static Speciality toEntity(SpecialityDto dto) {
		Speciality entity = new Speciality();
		BeanUtils.copyProperties(dto, entity,"spIcon");
		return entity;
	}
	@Bean
	public static SpecialityDto fromEntity(Speciality entity) {
		SpecialityDto dto = new SpecialityDto();
		BeanUtils.copyProperties(entity, dto);
		return dto;
	}
}
