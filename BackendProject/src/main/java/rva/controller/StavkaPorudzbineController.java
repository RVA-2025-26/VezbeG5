package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import rva.model.StavkaPorudzbine;
import rva.service.StavkaPorudzbineService;

@RestController
public class StavkaPorudzbineController {

	@Autowired
	private StavkaPorudzbineService service;
	
	@GetMapping("/stavkaPorudzbines")
	public ResponseEntity<?> getStavkas() {
		List<StavkaPorudzbine> stavkas = service.getAll();
		if(stavkas.isEmpty()) 
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No stavkas found");
		else
			return ResponseEntity.ok(stavkas);
	}
	
}
