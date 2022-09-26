package com.coc.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Getter@Setter@ToString@AllArgsConstructor@NoArgsConstructor
@Table(name = "appointment")
public class Appointment implements java.io.Serializable  {

	private static final long serialVersionUID = 2241087442821405258L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appId;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date appDate;
	
//	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name = "docId")
	private Doctor doctor;
	
	@ManyToOne
	@JoinColumn(name = "patId")
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "slotId")
	private Slot slot;

}
