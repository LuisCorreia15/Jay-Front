package br.jordaoqualho.back.produtos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface ProdutoRepository extends JpaRepository<Produto, String> {   
    
    Page<Produto> findBynomeDoProdutoLikeIgnoreCase(Pageable pageRequest, String nomeDoProduto);
    Page<Produto> findBytipoDoProdutoLikeIgnoreCase(Pageable pageRequest, String tipoDoProduto);
    Page<Produto> findBytipoDoProdutoLikeAndNomeDoProdutoLikeIgnoreCase(Pageable pageRequest, String tipoDoProduto, String nomeDoProduto);

}