package com.coc.services;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.coc.entities.Appointment;
import com.coc.entities.Slot;
import com.coc.models.AppointmentDto;

public interface AppointmentService {


	List<Appointment> getAppointmentsByDocId(int id);

	Appointment saveAppointment(AppointmentDto appointdto);
	List<Appointment> findAllAppointment();

	List<Appointment> getAppointmentsByDocIdAndDate(String appointmentdate,int docId);

	List<Appointment> getSlotsOfDoctorByDocId(int docId);

	List<Appointment> getAllAppointmentsBypId(int pId);

}
