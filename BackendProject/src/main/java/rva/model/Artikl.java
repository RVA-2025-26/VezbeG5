package rva.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Artikl {
	
	@Id
	@SequenceGenerator(name = "artikl_seq", sequenceName = "artikl_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "artikl_seq")
	private Long id;
	private String naziv;
	private String proizvodjac;
	
	@OneToMany(mappedBy="artikl", cascade = CascadeType.ALL)
	@JsonIgnore
	List<StavkaPorudzbine> stavke;
	
	public Artikl() {
	}

	public Artikl(Long id, String naziv, String proizvodjac) {
		this.id = id;
		this.naziv = naziv;
		this.proizvodjac = proizvodjac;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getProizvodjac() {
		return proizvodjac;
	}

	public void setProizvodjac(String proizvodjac) {
		this.proizvodjac = proizvodjac;
	}
	
	

}
