package com.coc.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity@Table(name = "bloodbank")
@Getter@Setter@NoArgsConstructor@ToString
public class BloodBank {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	int bbId;
	String bbName, bbAddress, bbCity, bbPhone, bbEmail;
}
