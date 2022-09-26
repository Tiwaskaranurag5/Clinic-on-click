package com.coc.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Getter@Setter@ToString@AllArgsConstructor@NoArgsConstructor
@Table(name = "admin")
public class Admin {
	
	@Id
	int a_id;
	String a_name;
	String email;
	String password;
}
