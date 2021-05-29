package br.jordaoqualho.back.inspecao;


import java.math.BigDecimal;
import java.time.LocalDate;

import javax.transaction.Transactional;

import com.github.javafaker.Faker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class InspecaoService {
    @Autowired
    private InspecaoRepository repository;
      Faker faker = new Faker();

    public Page<Inspecao> obterTodos(Pageable pageRequest, String termo) {
        if (termo == null || termo.trim().length() == 0) {
             return repository.findAll(pageRequest);            
        }
        return repository.findBynomeDoClienteLikeIgnoreCase(pageRequest, "%" + termo + "%");
    }  

    public Inspecao obterPeloId(String id) {
        return repository.findById(id).orElseGet(Inspecao::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public void excluirTodos() {
        repository.deleteAll();
    }


    public Inspecao salvar(Inspecao Inspecao) {
        return repository.save(Inspecao);
    }    

    public void gerarInspecaos(){             
        for (int i = 0; i < 10; i++) {
            String nome = faker.name().fullName();            
            LocalDate localDate = LocalDate.now();  
           
            int preco = faker.number().numberBetween(100, 1000);
            Inspecao novo = new Inspecao(nome, localDate, new BigDecimal(preco));
            repository.save(novo);            
        }        
    }
   
}