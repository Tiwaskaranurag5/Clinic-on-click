package com.coc.models;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {
	public static ResponseEntity<Map<String, Object>> success(Object obj){
		if(obj == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", "success");
		result.put("data", obj);
		return ResponseEntity.ok(result);// Response.successs()
	}
	
	public static ResponseEntity<?> error(Object err) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "error");
		if(err != null)
			map.put("error", err);
		return ResponseEntity.ok(map);
	}
}
