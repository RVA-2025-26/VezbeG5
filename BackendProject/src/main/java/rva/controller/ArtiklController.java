package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import rva.implementation.ArtiklServiceImpl;
import rva.model.Artikl;

@RestController
public class ArtiklController {
	
	@Autowired
	private ArtiklServiceImpl service;
	
	@GetMapping("/artikls")
	public ResponseEntity<?> getArtikls() {
		List<Artikl> artikls = service.getAll();
		if(artikls.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No artikls found");
		else
			return ResponseEntity.ok(artikls);
	}
	
	

}
