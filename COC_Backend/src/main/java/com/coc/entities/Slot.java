package com.coc.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity@Table(name = "slot")
@Getter@Setter@NoArgsConstructor@ToString
public class Slot {
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)
	int slotId;
	
	String slotTime;
	
	@OneToMany(mappedBy = "slot")
	List<Appointment> appointments;
}
