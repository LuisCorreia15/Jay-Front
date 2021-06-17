package br.jordaoqualho.back.item;

import java.math.BigDecimal;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.jordaoqualho.back.pedido.Pedido;

import javax.persistence.Column;


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
    private String nomeDoItem;
    @Getter
    @Setter
    private int quantidade;
    @Getter
    @Setter
    @Column(scale = 3)
    private BigDecimal valorUn;

    @Getter
    @Setter
    @ManyToOne
    private Pedido pedido;
    

    public Item() {
        this.id = UUID.randomUUID().toString();
    }

    public Item(String nomeDoItem, int quantidade, BigDecimal valorUn) {
        this();
        this.nomeDoItem = nomeDoItem;
        this.quantidade = quantidade;
        this.valorUn = valorUn;
    }    
   
    
}