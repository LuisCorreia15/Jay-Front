package br.jordaoqualho.back.pedido;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface PedidoRepository extends JpaRepository<Pedido, String> {

    /*
    @Query(value ="select p from Produto p where p.descricao like %:termo%")
    List<Produto> encontrarComTermo(String termo);
    */

    // List<Inspecao> findBynomeDoClienteLike(String nomeDoCliente);
    
    Page<Pedido> findBynomeDoClienteLikeIgnoreCase(Pageable pageRequest, String nomeDoCliente);

}