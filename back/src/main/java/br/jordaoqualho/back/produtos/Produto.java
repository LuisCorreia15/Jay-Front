package br.jordaoqualho.back.produtos;

import java.math.BigDecimal;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Produto {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private String nomeDoProduto;    
    @Getter
    @Setter
    @Column(scale = 3)
    private BigDecimal preco;
    @Getter
    @Setter
    private Integer vendidos;
    @Getter
    @Setter
    private String tipoDoProduto;
    @Getter
    @Setter
    private String vendidoPor;

    public Produto() {
        this.id = UUID.randomUUID().toString();
    }

    public Produto(String nomeDoProduto, BigDecimal preco, Integer vendidos, String tipoDoProduto, String vendidoPor) {
        this();
        this.nomeDoProduto = nomeDoProduto;
        this.preco = preco;
        this.vendidos = vendidos;
        this.tipoDoProduto = tipoDoProduto;
        this.vendidoPor = vendidoPor;
    }    
   
    
}