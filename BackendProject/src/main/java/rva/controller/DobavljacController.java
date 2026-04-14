package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import rva.model.Dobavljac;
import rva.service.DobavljacService;

@RestController
public class DobavljacController {
	
	@Autowired
	private DobavljacService service;
	
	@GetMapping("/dobavljacs")
	public ResponseEntity<?> getDobavljacs() {
		List<Dobavljac> dobavljacs = service.getAll();
		if(dobavljacs.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No dobavljacs found");
		else 
			return ResponseEntity.ok(dobavljacs);
	}

}
