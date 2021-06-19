package br.jordaoqualho.back.item;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Item {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private int quantidade;
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String pedidoId;
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String produtoId;
    

    public Item() {
        this.id = UUID.randomUUID().toString();
    }

    public Item(int quantidade) {
        this();
        this.quantidade = quantidade;
    }    
   
    
}