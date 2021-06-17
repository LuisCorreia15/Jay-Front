package br.jordaoqualho.back.item;


import javax.transaction.Transactional;

import com.github.javafaker.Faker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ItemService {
    @Autowired
    private ItemRepository repository;
      Faker faker = new Faker();

    public Page<Item> obterTodos(Pageable pageRequest, String termo) {
        if (termo == null || termo.trim().length() == 0) {
             return repository.findAll(pageRequest);            
        }
        return repository.findBynomeDoItemLikeIgnoreCase(pageRequest, "%" + termo + "%");
    }  

    public Item obterPeloId(String id) {
        return repository.findById(id).orElseGet(Item::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public void excluirTodos() {
        repository.deleteAll();
    }


    public Item salvar(Item Inspecao) {
        return repository.save(Inspecao);
    }    
   
}