package com.coc.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coc.services.AdminService;
import com.coc.services.DoctorService;
import com.coc.services.EmailService;
import com.coc.services.PatientService;
import com.coc.daos.DoctorDao;
import com.coc.entities.Admin;
import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.models.EmailDto;
import com.coc.models.Response;
import com.fasterxml.jackson.databind.ObjectMapper;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/email")
public class EmailController {
	private static final Logger LOG = LoggerFactory.getLogger(EmailController.class);
//	private static String otp = "";
    @Autowired
    EmailService emailService;
    @Autowired
    AdminService adminService;
    @Autowired
    DoctorService doctorService;
    
    @Autowired
    PatientService patientService;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody EmailDto ed) {
//    	String email ="";
//    	ObjectMapper mapper = new ObjectMapper();
//    	try {
//    		email = mapper.writeValueAsString(useremail);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
    	String emailTo="";
    	System.out.println(ed.getEmail());
    	Patient p = patientService.findByEmail(ed.getEmail());
    	Doctor d = doctorService.findDoctorByEmail(ed.getEmail());
    	Admin  a = adminService.findByEmail(ed.getEmail());
    	
    	if(p == null && d == null && a==null)
    		return Response.error(ed.getEmail() + " is not found");
    	
    	if(p != null) {
    		emailTo = p.getEmail();
    	}else if(d != null) {
    		emailTo = d.getEmail();
    	}
    	else if(a!= null) {
    		emailTo=a.getEmail();
    	}
    	
    	String otp = emailService.generateFourDigitOtp();
        try {
            emailService.sendSimpleEmail(emailTo, "coc verification", "Your OTP to reset password is: "+otp);
        } catch (MailException mailException) {
            LOG.error("Error while sending out email to {"+emailTo+"}", mailException.getStackTrace());
            return Response.error("Unable to send email to: "+ emailTo);
//            return new ResponseEntity<>("Unable to send email", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        int encryptedOtp = (Integer.parseInt(otp)*31) - 31;//encryption logic
        return Response.success(encryptedOtp);
    }
    
    @PostMapping("/verifyotp")
    public ResponseEntity<?> verifyOtp(String email, String newPassword){
    	Patient p = patientService.findByEmail(email);
    	Doctor d = doctorService.findDoctorByEmail(email);
    	Admin  a = adminService.findByEmail(email);
    	if(p == null && d == null && a==null)
    		return Response.error(email + " is not found");
    	
    	if(p!= null)
    		return Response.success(patientService.updatePasswordById(p.getPatId(), newPassword));
    	else if(d !=null) {
    		return Response.success(doctorService.updatePasswordById(d.getDocId(), newPassword));    		
    	}
    	else if(a!=null)
    		return Response.success(adminService.updatePasswordById(a.getA_id(), newPassword));
    		
    	
    	return Response.error("Some problem occurred during verification.. contact Admin ");
    }
}
