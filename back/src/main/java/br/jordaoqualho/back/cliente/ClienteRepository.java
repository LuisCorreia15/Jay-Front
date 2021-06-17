package br.jordaoqualho.back.cliente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Page<Cliente> findBynomeDoClienteLikeIgnoreCase(Pageable pageRequest, String nomeDoCliente);

}