package br.jordaoqualho.back.produtos;


import java.math.BigDecimal;

import javax.transaction.Transactional;

import com.github.javafaker.Faker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProdutoService {
    @Autowired
    private ProdutoRepository repository;
      Faker faker = new Faker();

    public Page<Produto> obterTodos(Pageable pageRequest, String termo) {
        if (termo == null || termo.trim().length() == 0) {
             return repository.findAll(pageRequest);            
        }
        return repository.findBynomeDoProdutoLikeIgnoreCase(pageRequest, "%" + termo + "%");
    }  

    public Produto obterPeloId(String id) {
        return repository.findById(id).orElseGet(Produto::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public void excluirTodos() {
        repository.deleteAll();
    }


    public Produto salvar(Produto Produto) {
        return repository.save(Produto);
    }    

    public void gerarProdutos(){     
        for (int i = 0; i < 10; i++) {
            String name = faker.food().dish();
            System.out.println(name);
            Double price = faker.number().randomDouble(1, 2, 6);
            int estoque = faker.number().numberBetween(100, 1000);
            Produto novo = new Produto(name, new BigDecimal(price), estoque);
            repository.save(novo);
        }     
    }
   
}