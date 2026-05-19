package rva.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rva.model.Artikl;
import rva.service.ArtiklService;

@RestController
@CrossOrigin
public class ArtiklController {

	@Autowired
	private ArtiklService service;
	
	@GetMapping("/artikls")
	public ResponseEntity<?> getArtikls(@RequestParam(required = false) Long id){
		if(id != null) {
			Optional<Artikl> artikl = service.findById(id);
			if(artikl.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(String.format("No artikls found with ID: %s", id));
			
			return ResponseEntity.ok(artikl.get());
		} else {
			List<Artikl> artikls = service.getAll();
			return ResponseEntity.ok(artikls);
		}
	}
	
	@PostMapping("/artikls")
	public ResponseEntity<?> createArtikl(@RequestBody Artikl artikl){
		Artikl createdArtikl = service.create(artikl);
		URI uri = URI.create(String.format("/artikls?id=%s", createdArtikl.getId()));
		return ResponseEntity.created(uri).body(createdArtikl);
	}
	
	@PutMapping("/artikls")
	public ResponseEntity<?> updateArtikl(@RequestBody Artikl artikl, @RequestParam Long id){
		Optional<Artikl> updatedArtikl = service.update(artikl, id);
		if(updatedArtikl.isEmpty())
			return ResponseEntity.status(404)
					.body(String.format("Resource with an ID: %s does not exist", id));
		return ResponseEntity.ok(updatedArtikl.get());
	}
	
	@DeleteMapping("/artikls")
	public ResponseEntity<?> deleteArtikl(@RequestParam Long id){
		if(service.existsById(id)) {
			service.delete(id);
			return ResponseEntity.status(204).body(null);
		}
		return ResponseEntity.status(404)
				.body(String.format("Resource with an ID: %s does not exist", id));
	}
	
	
	
	
	
	
}
