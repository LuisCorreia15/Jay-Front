package br.jordaoqualho.back.cliente;


import javax.transaction.Transactional;

import com.github.javafaker.Faker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ClienteService {
    @Autowired
    private ClienteRepository repository;
      Faker faker = new Faker();

    public Page<Cliente> obterTodos(Pageable pageRequest, String termo) {
        if (termo == null || termo.trim().length() == 0) {
             return repository.findAll(pageRequest);            
        }
        return repository.findBynomeDoClienteLikeIgnoreCase(pageRequest, "%" + termo + "%");
    }  

    public Cliente obterPeloId(String id) {
        return repository.findById(id).orElseGet(Cliente::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public void excluirTodos() {
        repository.deleteAll();
    }


    public Cliente salvar(Cliente Cliente) {
        return repository.save(Cliente);
    }   
    
     public void gerarCliente(){     
        for (int i = 0; i < 10; i++) {            
            repository.save(new Cliente(faker.name().fullName(), faker.phoneNumber().cellPhone(), faker.address().fullAddress()));
        }     
    }
   
}