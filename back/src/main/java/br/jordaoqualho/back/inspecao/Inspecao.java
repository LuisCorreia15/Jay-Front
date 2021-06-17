package br.jordaoqualho.back.inspecao;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Inspecao {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private int numeroDaInspecao;
    @Getter
    @Setter
    private LocalDate lancadoEm;
    @Getter
    @Setter
    @Column(scale = 2)
    private BigDecimal valorTotal;
    

    public Inspecao() {
        this.id = UUID.randomUUID().toString();
    }

    public Inspecao(Integer numeroDaInspecao, LocalDate lancadoEm, BigDecimal valorTotal) {
        this();
        this.numeroDaInspecao = numeroDaInspecao;
        this.lancadoEm = lancadoEm;
        this.valorTotal = valorTotal;
    }    
   
    
}