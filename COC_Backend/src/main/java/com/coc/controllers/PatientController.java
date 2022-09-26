package com.coc.controllers;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coc.services.AppointmentService;
import com.coc.services.DoctorService;
import com.coc.services.PatientService;
import com.coc.services.SlotService;
import com.coc.services.SpecialityService;
import com.coc.entities.Appointment;
import com.coc.entities.Doctor;
import com.coc.entities.Patient;
import com.coc.entities.Slot;
import com.coc.entities.Speciality;
import com.coc.models.Response;
import com.coc.models.SlotDto;
import com.coc.models.AppointmentDto;
import com.coc.models.AppointmentOutDto;
import com.coc.models.PatientDto;
@CrossOrigin
@RestController
@RequestMapping("/patient")
public class PatientController {
	
	@Autowired
	private SpecialityService specialityService;

	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private AppointmentService appointService;
	
	@Autowired
	private SlotService slotService;

	@PostMapping("")
	public ResponseEntity<Map<String, Object>> addNewPatient(PatientDto patDto){
		//System.out.println(patDto + " Controller.");
		Patient patient = PatientDto.toEntity(patDto);
		//System.out.println(patient + " Controller.");
		patient = patientService.savePatient(patient);

		PatientDto dto = PatientDto.fromEntity(patient);
		return Response.success(dto);

	}


	@GetMapping("/speciality")
	public ResponseEntity<?> getAllspecialities() {
		List<Speciality> list = specialityService.findAll();
	
		return Response.success(list);
	}
	

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int id) {
		Doctor doctor = doctorService.findById(id);
		return Response.success(doctor);
	}

	@PostMapping("/authenticate")
	public ResponseEntity<Map<String, Object>> authenticatePatient(String email, String password){
		Patient patient = patientService.authenticate(email, password);
		if(patient == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return Response.success(patient);

	}

	@PutMapping("/updatepassword")
	public ResponseEntity<?> updatePasswordById(int pId, String password){
		Boolean updateStatus = patientService.updatePasswordById(pId, password);
		return Response.success(updateStatus);
	}

	
	@PostMapping("/appointment")
	public ResponseEntity<?> addNewAppointment(AppointmentDto appointdto) {
		Appointment appointment = appointService.saveAppointment(appointdto);
		AppointmentOutDto outDto=AppointmentOutDto.fromEntity(appointment);
		return Response.success(outDto);
	}
	
	
	@PostMapping("/getDocList")
	public List<Speciality> findAllDoctors(){
		return specialityService.findAll();
	}
	
	
	@GetMapping("/getallslots")
	public ResponseEntity<?> getAllSlots(){
		List<Slot> list=slotService.getAllSlots();
		Stream<SlotDto> slotList = list.stream().map(slot -> SlotDto.fromEntity(slot));
		return Response.success(slotList);
	}
	
	@PostMapping("/fetchappointmentsbydoctoranddate")
	public ResponseEntity<?> getAppointmentsByDocIdAndDate(String docId,String appdate){
		int docid = Integer.parseInt(docId);
		List<Appointment> appList = appointService.getAppointmentsByDocIdAndDate(appdate,docid);
		Stream<AppointmentOutDto> appOutDto = appList.stream().map(appointment -> AppointmentOutDto.fromEntity(appointment));
		return Response.success(appOutDto);
	}
	
	
	@GetMapping("/getSlotsbydoctor/{docid}")
	public ResponseEntity<?> getSlotsOfDoctorByDocId(@PathVariable("docid") int docId){
		List<Appointment> list = appointService.getSlotsOfDoctorByDocId(docId);
		Stream<AppointmentOutDto> slotList = list.stream().map(slot -> AppointmentOutDto.fromEntity(slot));
		return Response.success(slotList);
	}
	
	@GetMapping("/countonlinedoctors")
	public ResponseEntity<?> countTotalOnlineVerifiedDoctors(){
		int count = doctorService.countTotalOnlineVerifiedDoctors();
		return Response.success(count);
	}
	@GetMapping("/appointments/{pid}")
	public ResponseEntity<?> getAllAppointmentsOfPatient(@PathVariable("pid") int pId){
		List<Appointment> appList = appointService.getAllAppointmentsBypId(pId);
		Stream<AppointmentOutDto> appOutDto = appList.stream().map(appointment -> AppointmentOutDto.fromEntity(appointment));
		return Response.success(appOutDto);
	}
	@PutMapping("/updatedesc/{pid}")
	public ResponseEntity<?> updatePatientDescription(@PathVariable("pid") String pid, String patDesc){
		int pId = Integer.parseInt(pid);
		Patient p = patientService.editPatientDesc(pId,patDesc);
		return Response.success(PatientDto.fromEntity(p));
		
	}
	
}
