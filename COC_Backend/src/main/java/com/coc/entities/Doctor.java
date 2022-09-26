package com.coc.entities;



import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity 
@Getter@Setter@ToString@AllArgsConstructor
@Table(name = "doctor")
public class Doctor {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int docId;
//	@JoinColumn(name = "sp_id",insertable = false,updatable = false)
//	private int sp_id;//Foreign key 
	
	private int docExperience;
	
	private String docPhone,docCity,docDescription,docRegistrationNo;
	private String docVerificationDoc,docProfilePic,docName;
	private float docFees;
	private Boolean docIsOnline = false ,docIsVerified = false;
	private String email;
	private String password;
	
	@ManyToOne
//	(fetch = FetchType.LAZY)
	@JoinColumn(name = "spId")
	private Speciality speciality;

	
//	@JsonBackReference
	@JsonIgnore
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
	List<Appointment> appointments;


	public Doctor() {
		this.appointments = new ArrayList<Appointment>();
	}
	

}
