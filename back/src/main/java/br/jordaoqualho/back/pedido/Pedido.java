package br.jordaoqualho.back.pedido;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.jordaoqualho.back.cliente.Cliente;
import br.jordaoqualho.back.item.Item;
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
    @ManyToOne
    private Cliente cliente;
    @Getter
    @Setter
    @OneToMany
    private List<Item> itemList;
    @Getter
    @Setter
    private String nomeDoCliente;

    public Pedido() {
        this.id = UUID.randomUUID().toString();
    }

    public Pedido( LocalDate lancadoEm, BigDecimal valorTotal, String nomeDoCliente) {
        this();
        this.lancadoEm = lancadoEm;
        this.valorTotal = valorTotal;
        this.nomeDoCliente = nomeDoCliente;
    }    
   
    
}