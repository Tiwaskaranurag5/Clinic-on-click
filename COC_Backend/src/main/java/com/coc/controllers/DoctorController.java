package com.coc.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coc.services.AppointmentService;
import com.coc.services.DoctorService;
import com.coc.services.SpecialityService;
import com.coc.entities.Appointment;
import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.entities.Speciality;
import com.coc.models.AppointmentOutDto;
import com.coc.models.DoctorInDto;
import com.coc.models.DoctorOutDto;
import com.coc.models.PatientDto;
import com.coc.models.Response;
@CrossOrigin
@RestController
@RequestMapping("/doctor")
public class DoctorController {
	@Autowired
	DoctorService doctorService;

	@Autowired
	SpecialityService specialityService;
	
	@Autowired
	private AppointmentService appointService;

	@PostMapping("")
	public ResponseEntity<Map<String, Object>> addNewDoctor(DoctorInDto docDto) {
		Doctor doctor = DoctorInDto.toEntity(docDto);
//		System.out.println(doctor +"controller first");
		doctor = doctorService.saveDoctor(doctor, docDto.getDocVerificationDoc(), docDto.getDocProfilePic());
//		System.out.println(doctor+"controller second");
		DoctorOutDto resposeDto = DoctorOutDto.fromEntity(doctor);
		return Response.success(resposeDto);
	}
		
	@PutMapping("/editprofile")
	public ResponseEntity<?> editDoctor(DoctorInDto docDto){
		DoctorOutDto updatedDoc=doctorService.editDoctor(docDto);
		return Response.success(updatedDoc);
	}
	
	@PostMapping("/auth")
	public ResponseEntity<?> authenticateDoctor(String email, String password){
		Doctor authDoctor = doctorService.authenticate(email, password);
		if(authDoctor == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		if(!authDoctor.getDocIsOnline())
			authDoctor = doctorService.toggleOnlineStatus(authDoctor.getDocId());
		return Response.success(authDoctor);

	}
	
	@GetMapping("/logout/{id}")
	public ResponseEntity<?> logoutDoctor(@PathVariable("id") int docId){
		Doctor d = doctorService.toggleOnlineStatus(docId);
		if(d.getDocIsOnline())
			return Response.error(false);
		return Response.success(true);
	}
	
	@PutMapping("/editpassword")
	public ResponseEntity<?> changePassword(String id, String oldPassword,String newPassword){
		int docId = Integer.parseInt(id);
		Boolean changePassStatus = doctorService.changePassword(docId,oldPassword, newPassword);
		return Response.success(changePassStatus);
	}

	@GetMapping("/findSpecialities")
	public ResponseEntity<HashMap<String, Object>> GetAllSpeciality(){
		List<Speciality> list = specialityService.findAll();
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("status", "success");
		result.put("data", list);
		return ResponseEntity.ok(result);
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int id) {
		Doctor b = doctorService.findById(id);
		return Response.success(DoctorOutDto.fromEntity(b));
	}
	

	@GetMapping("/appointmentsofdoctor/{docid}")
	public ResponseEntity<?> getAppointmentsByDocId(@PathVariable("docid") int id){
		List<Appointment> list = appointService.getAppointmentsByDocId(id);
		Stream<AppointmentOutDto> result = list.stream().map(appointment -> AppointmentOutDto.fromEntity(appointment));
		return Response.success(result);
	}
	@GetMapping("/searchname")
	public ResponseEntity<?> searchDoctorsByNameKeyword(@RequestParam(name = "q",required = false) String keyword){
		List<Doctor> list = doctorService.searchDoctorsByNameKeyword(keyword);
		Stream<DoctorOutDto> result = list.stream().map(doctor -> DoctorOutDto.fromEntity(doctor));
		return Response.success(result);
	}
	
	@GetMapping("/doctorsbyspeciality/{spid}")
	public ResponseEntity<?> getAllDoctorsBySpId(@PathVariable("spid") int spId){
		List<Doctor> list = doctorService.getAllDoctorsBySpId(spId);
		Stream<DoctorOutDto> result = list.stream().map(doctor -> DoctorOutDto.fromEntity(doctor));
		return Response.success(result);
	}
	
	
	@GetMapping("/verifieddoctors")
	public ResponseEntity<?> getAllVerifiedDoctors(){
		List<Doctor> list = doctorService.showAllVerifiedDoctors(true);
		Stream<DoctorOutDto> result = list.stream().map(doctor -> DoctorOutDto.fromEntity(doctor));
		return Response.success(result);
	}
	
	@GetMapping("/verifieddoctorsbyspeciality/{spid}")
	public ResponseEntity<?> getVerifiedDoctorsBySpId(@PathVariable("spid") int spId){
		List<Doctor> list = doctorService.showVerifiedDoctorsBySpId(spId);
		Stream<DoctorOutDto> result = list.stream().map(doctor -> DoctorOutDto.fromEntity(doctor));
		return Response.success(result);
	}
	@PutMapping("/updatedesc/{did}")
	public ResponseEntity<?> updateDoctorDescription(@PathVariable("did") String did, String docDesc){
		int dId = Integer.parseInt(did);
		Doctor d = doctorService.editDoctorDesc(dId,docDesc);
		return Response.success(DoctorOutDto.fromEntity(d));
		
	}
}
