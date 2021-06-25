import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Pedido.css";

const PedidoNew = () => {
  const history = useHistory();
  const [clientes, setClientes] = useState([{}]);
  const [Pedido, setPedido] = useState({
    nomeDoCliente: "",
    preco: 2.2,
    vendidos: 0,
    tipoDoPedido: "Doce",
    vendidoPor: "unidade",
  });

  const doGetClientes = async () => {
    const response = await axios.get(`/api/cliente`);
    setClientes(response.data.content);
  };

  useEffect(() => {
    doGetClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doPost = async () => {
    await axios.post("/api/pedido", Pedido);
    tempAlert(`Pedido adicionado com sucesso!`, 5000);
    history.push("/pedido");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoPedido = { ...Pedido, [event.target.name]: event.target.value };
    setPedido(novoPedido);
  };

  return (
    <>
      <Menu ativo="pedido"></Menu>
      <div className="container">
        <h3 className="pg-title">Cadastro de Pedido</h3>
        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome Do Cliente
            <Typeahead
              labelKey="nomeDoCliente"
              onChange={handleChange}
              options={clientes}
              placeholder="Digite o nome do cliente"
              // selected={() => ()}
            />
          </div>
          <div className="sl-icon flex-column">
            Tipo do Produto
            <select
              className="pg-select"
              name="tipoDoProduto"
              required
              onChange={handleChange}
              // defaultValue={produto.tipoDoProduto}
            >
              <option value="" disabled>
                Selecione o tipo do produto
              </option>
              <option value="Doce">Doce</option>
              <option value="Salgado">Salgado</option>
              <option value="Bolo">Bolo</option>
              <option value="Ingrediente">Ingrediente</option>
            </select>
          </div>
          <div className="sl-icon flex-column">
            Medida
            <select
              // defaultValue={produto.vendidoPor}
              className="pg-select"
              name="vendidoPor"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                O produto será vendido por
              </option>

              <option value="/un">unidade</option>
              <option value="/Kg">kilograma</option>
              <option value="/g">grama</option>
            </select>
          </div>
          <div className="flex-column">
            Preço Encomenda
            <input
              type="text"
              name="precoEncomenda"
              required
              className="pg-input"
              onChange={handleChange}
              // value={produto.precoEncomenda}
            ></input>
          </div>
          <div className="flex-column">
            Preço Vitrine
            <input
              type="text"
              name="precoVitrine"
              required
              className="pg-input"
              onChange={handleChange}
              // value={produto.precoVitrine}
            ></input>
          </div>
          <button className="btn-page pg-btn">Enviar</button>
          <button
            className="btn-page bt-lixo pg-btn"
            onClick={() => history.push("/pedido")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};

export default PedidoNew;
