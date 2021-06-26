package br.jordaoqualho.back.pedido;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
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
    private String lancadoEm;
    @Getter
    @Setter
    private String dataEntrega;
    @Getter
    @Setter
    private String situaçãoPedido;
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ENGLISH);
        LocalDate date = LocalDate.now();
        this.lancadoEm = formatter.format(date);
    }

    public Pedido( BigDecimal valorTotal, String nomeDoCliente) {
        this();
        this.valorTotal = valorTotal;
        this.clienteId = nomeDoCliente;
    }    
   
    
}