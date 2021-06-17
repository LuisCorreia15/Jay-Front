package br.jordaoqualho.back.inspecao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InspecaoRepository extends JpaRepository<Inspecao, String> {
    
    Page<Inspecao> findBynumeroDaInspecaoLike(Pageable pageRequest, String nomeDoCliente);

}