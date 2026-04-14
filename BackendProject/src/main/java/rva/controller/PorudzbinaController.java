package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import rva.model.Porudzbina;
import rva.service.PorudzbinaService;

@RestController
public class PorudzbinaController {
	
	@Autowired
	private PorudzbinaService service;
	
	@GetMapping("/porudzbinas")
	public ResponseEntity<?> getPorudzbinas() {
		List<Porudzbina> porudzbinas = service.getAll();
		if(porudzbinas.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No porudzbinas found");
		else 
			return ResponseEntity.ok(porudzbinas);
	}

}
