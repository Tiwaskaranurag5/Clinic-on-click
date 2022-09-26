package com.coc.entities;


import java.util.ArrayList;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter@Setter@ToString@AllArgsConstructor
@Table(name = "speciality")
public class Speciality {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	int spId;
	String spName;
	String spDescription;
	String spIcon;
	//@JsonBackReference
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonIgnore
	@OneToMany(mappedBy = "speciality", cascade = CascadeType.ALL)
	List<Doctor> doctorList;

	
	public Speciality() {
		this.doctorList = new ArrayList<Doctor>();
	}
	




}
