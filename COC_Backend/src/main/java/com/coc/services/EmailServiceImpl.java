package com.coc.services;

import java.util.function.Supplier;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.coc.entities.Speciality;
import com.coc.models.SpecialityDto;
@Service
@Transactional
public class EmailServiceImpl implements EmailService {
	
	/**
	 * @param toAddress
	 * @param subject
	 * @param message
	 */
	@Autowired
	private JavaMailSender emailSender;
	
//	@Bean
//	public static Speciality toEntity(SpecialityDto dto) {
//		Speciality entity = new Speciality();
//		BeanUtils.copyProperties(dto, entity,"spIcon");
//		return entity;
//	}
	@Override
	public String generateFourDigitOtp() {
		String otp = "";
		for(int i=0; i<4; i++) {
			otp = otp + (int)(Math.random()*10);
		}
		return otp;
	}
	@Override
	public void sendSimpleEmail(String toAddress, String subject, String message) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		  simpleMailMessage.setTo(toAddress);
		  simpleMailMessage.setSubject(subject);
		  simpleMailMessage.setText(message);
		  emailSender.send(simpleMailMessage);

	}


}
