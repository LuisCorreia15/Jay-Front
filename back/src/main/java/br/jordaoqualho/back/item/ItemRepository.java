package br.jordaoqualho.back.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item, String> {

    Page<Item> findBynomeDoItemLikeIgnoreCase(Pageable pageRequest, String nomeDoCliente);

}