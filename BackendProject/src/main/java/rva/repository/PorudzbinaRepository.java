package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.model.Dobavljac;
import rva.model.Porudzbina;

public interface PorudzbinaRepository extends JpaRepository<Porudzbina, Long>{
	
	//pretraga po boolean
	List<Porudzbina> findByPlacenoEquals(boolean placeno);
	
	//pretraga po decimalni vrednostima
	List<Porudzbina> findByIznosLessThan(double iznos);

	//pretraga po stranom ključu
	List<Porudzbina> findByDobavljac(Dobavljac dobavljac);
	
}
