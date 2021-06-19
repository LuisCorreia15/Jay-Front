package br.jordaoqualho.back.pedido;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface PedidoRepository extends JpaRepository<Pedido, String> {

    Page<Pedido> findByIdLike(Pageable pageRequest, String nomeDoCliente);

}