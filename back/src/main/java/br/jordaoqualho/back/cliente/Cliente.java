package br.jordaoqualho.back.cliente;


import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Cliente {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private String nomeDoCliente;
    @Getter
    @Setter
    private String celular;
    @Getter
    @Setter
    private String logradouro;    

    public Cliente() {
        this.id = UUID.randomUUID().toString();
    }

    public Cliente(String nomeDoCliente, String celular, String logradouro) {
        this();
        this.nomeDoCliente = nomeDoCliente;
        this.celular = celular;
        this.logradouro = logradouro;
    }    
   
    
}