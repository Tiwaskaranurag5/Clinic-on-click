package com.coc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coc.services.BloodBankService;
import com.coc.entities.BloodBank;
import com.coc.models.Response;

import lombok.Getter;
@CrossOrigin
@RestController
@RequestMapping("/bloodbank")
public class BloodBankController {
	
	@Autowired
	BloodBankService bloodBankService;
	
	@GetMapping("")
	public ResponseEntity<?> getAllBloodBanks(){
		List<BloodBank> list = bloodBankService.getAllBloodBanks();
		return Response.success(list);
	}
	
	@PostMapping("")
	public ResponseEntity<?> addNewBloodBank(BloodBank b){
		BloodBank newBloodBank = bloodBankService.addNewBloodBank(b);
		return Response.success(newBloodBank);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBloodBank(@PathVariable("id") int bbId){
		boolean deletionStatus = bloodBankService.deleteBloodBank(bbId);
		return Response.success(deletionStatus);
	}
	@GetMapping("/search")
	public ResponseEntity<?> searchBloodBankByCity(@RequestParam(name = "q",required = false) String cityKeyword){
		List<BloodBank> searchResult = bloodBankService.searchBloodBankByCity(cityKeyword);
		return Response.success(searchResult);
	}
}
