package rva.primeri;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	
	@GetMapping("/zbir")
	public String sabiranje() {
		return String.valueOf(Math.random()*100 + Math.random());
	}
	
	@GetMapping("/zbir-dva-broja/{prviBroj}/{drugiBroj}")
	public String sabiranjeDvaBroja(@PathVariable double prviBroj, @PathVariable double drugiBroj) {
		return String.valueOf(prviBroj + drugiBroj);
	}

}
