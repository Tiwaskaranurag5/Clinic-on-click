package com.coc.controllers;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coc.services.AdminService;
import com.coc.services.DoctorService;
import com.coc.services.PatientService;
import com.coc.services.SlotService;
import com.coc.services.SpecialityService;
import com.coc.daos.SlotDao;
import com.coc.entities.Admin;

import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.entities.Slot;
import com.coc.entities.Speciality;
import com.coc.models.PatientDto;
import com.coc.models.Response;
import com.coc.models.SlotDto;
import com.coc.models.SpecialityDto;
import com.sun.net.httpserver.Authenticator.Result;
@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	AdminService adminService;
	
	@PostMapping("/auth")
	public ResponseEntity<Map<String, Object>> authenticateAdmin(String email, String password){
		Admin admin = adminService.authenticate(email, password);
		if(admin == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return Response.success(admin);
	}


	@Autowired
	DoctorService docService;

	@PutMapping("/verifydoc/{id}")
	public ResponseEntity<?> updateVerificationStatus(@PathVariable("id") String docId){
		int d_id = Integer.parseInt(docId);
		Doctor updatedDoctor;
		updatedDoctor = docService.updateVerificationStatus(d_id);
		return Response.success(updatedDoctor);
	}

	@GetMapping("/doctors/{id}")
	public ResponseEntity<?> getDoctorById(@PathVariable("id") int id){
		List<Doctor> list = docService.findAll();
		return Response.success(list);
	}
	
	@DeleteMapping("/deletedoc/{id}")
	public ResponseEntity<?> deleteByDoctorId(@PathVariable("id") int id){
		boolean delete = docService.deleteDoctor(id);
		return Response.success(delete);
	}


	@Autowired
	SpecialityService specialityService;



	@PostMapping("/speciality")
	public ResponseEntity<?> AddNewSpeciality(SpecialityDto specDto){
		Speciality spec = SpecialityDto.toEntity(specDto); //Non File Fields are added to entity
		spec = specialityService.addNewSpeciality(spec, specDto.getSpIcon()); //Files Fields are added to entity
		return Response.success(spec);		
	}
	
	@GetMapping("/findSpecialities")//("/speciality")
	public ResponseEntity<?> GetAllSpeciality(){
		List<Speciality> list = specialityService.findAll();
//		System.out.println("find speciality: "+list);
		return Response.success(list);
	}
	
	@GetMapping("/doctors")
	public ResponseEntity<?> getAllDoctors() {
		List<Doctor> allDoctorslist = docService.findAll();
		return Response.success(allDoctorslist);
	}


	@DeleteMapping("/speciality/{spid}")
	public ResponseEntity<?> deleteSpeciality(@PathVariable("spid") String spId) {
		int sp_id = Integer.parseInt(spId);
		boolean deletionStatus = specialityService.deleteSpeciality(sp_id);
		return Response.success(deletionStatus);
	}


	@Autowired
	PatientService patService;
	
	@GetMapping("/patients")
	public ResponseEntity<?> getAllPatients() {
		List<Patient> list = patService.findAll();
//		System.out.println("Patient List" + list);
		Stream<PatientDto> result = list.stream().map(patient -> PatientDto.fromEntity(patient));
		return Response.success(result);
	}

	
	@DeleteMapping("/patients/{p_id}")
	public ResponseEntity<?> deletePatient(@PathVariable("p_id") String pid) {
		int p_id = Integer.parseInt(pid); 
		boolean deleteStatus = patService.deletePatient(p_id);
		return Response.success(deleteStatus);
	}
	
	@PutMapping("/speciality")
	public ResponseEntity<?> updateSpeciality(SpecialityDto specDto){
		Speciality spec = SpecialityDto.toEntity(specDto); //Non File Fields are added to entity
		spec = specialityService.addNewSpeciality(spec, specDto.getSpIcon()); //Files Fields are added to entity
		return Response.success(spec);		
	}
	
	@Autowired
	SlotService slotService;
	
	@PostMapping("/slot")
	public ResponseEntity<?> addNewSlot(@RequestBody SlotDto dto){
		SlotDto addedSlot = slotService.addNewSlot(dto);
		return Response.success(addedSlot);
	}
	
	@GetMapping("/slots")
	public ResponseEntity<?> getAllSlots(){
		List<Slot> list = slotService.getAllSlots();
		Stream<SlotDto> slotList = list.stream().map(slot -> SlotDto.fromEntity(slot));
		return Response.success(slotList);	
	}
	@DeleteMapping("/slot/{slotid}")
	public ResponseEntity<?> deleteSlot(@PathVariable("slotid") String id){
		int slotid = Integer.parseInt(id); 
		boolean deleteStatus = slotService.deleteSlot(slotid);
		return Response.success(deleteStatus);
	}

}

