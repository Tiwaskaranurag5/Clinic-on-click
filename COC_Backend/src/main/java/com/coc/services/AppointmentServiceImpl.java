package com.coc.services;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coc.daos.AppointmentDao;
import com.coc.entities.Appointment;
import com.coc.entities.Slot;
import com.coc.models.AppointmentDto;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	AppointmentDao appointDao;
	
	@Override
	public Appointment saveAppointment(AppointmentDto appointdto) {
		Appointment appointment = new Appointment();
		appointment = AppointmentDto.toEntity(appointdto);
		return appointDao.save(appointment);
	}

	@Override
	public List<Appointment> getAppointmentsByDocId(int id) {
		return appointDao.findBydoctorDocId(id);
	}

	@Override
	public List<Appointment> findAllAppointment() {
		return appointDao.findAll();
	}

	@Override
	public List<Appointment> getAppointmentsByDocIdAndDate(String appdate,int docId) {
		return appointDao.findByDoctorDocIdAndAppDateLike( docId,appdate).orElse(null);
	}

	@Override
	public List<Appointment> getSlotsOfDoctorByDocId(int docId) {
		return appointDao.findSlotsByDoctorDocId(docId).orElse(null);
	}

	@Override
	public List<Appointment> getAllAppointmentsBypId(int pId) {
		return appointDao.findByPatientPatId(pId).orElse(null);
	}
	

	
}
