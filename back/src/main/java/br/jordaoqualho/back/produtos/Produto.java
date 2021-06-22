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
    private BigDecimal precoEncomenda;
    @Getter
    @Setter
    @Column(scale = 3)
    private BigDecimal precoVitrine;
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

    public Produto(String nomeDoProduto, BigDecimal precoEncomenda, BigDecimal precoVitrine, Integer vendidos, String tipoDoProduto, String vendidoPor) {
        this();
        this.nomeDoProduto = nomeDoProduto;
        this.precoEncomenda = precoEncomenda;
        this.precoVitrine = precoVitrine;
        this.vendidos = vendidos;
        this.tipoDoProduto = tipoDoProduto;
        this.vendidoPor = vendidoPor;
    }    
   
    
}