package br.jordaoqualho.back.pedido;

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
public class Pedido {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private LocalDate lancadoEm;
    @Getter
    @Setter
    @Column(scale = 2)
    private BigDecimal valorTotal;
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String clienteId;

    public Pedido() {
        this.id = UUID.randomUUID().toString();
    }

    public Pedido( LocalDate lancadoEm, BigDecimal valorTotal, String nomeDoCliente) {
        this();
        this.lancadoEm = lancadoEm;
        this.valorTotal = valorTotal;
        this.clienteId = nomeDoCliente;
    }    
   
    
}