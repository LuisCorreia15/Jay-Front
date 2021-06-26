import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import { Typeahead } from "react-bootstrap-typeahead";
import InputMask from "react-input-mask";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Pedido.css";

const PedidoNew = () => {
  const history = useHistory();
  const [clientes, setClientes] = useState([{}]);
  const [pedido, setPedido] = useState({
    nomeDoCliente: "",
    valorTotal: 0,
    clienteId: 0,
    situaçãoPedido: "Aberto",
    dataEntrega: "",
  });

  const doGetClientes = async () => {
    const response = await axios.get(`/api/cliente`);
    setClientes(response.data.content);
  };

  useEffect(() => {
    doGetClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(pedido);
  }, [pedido]);

  const doPost = async () => {
    await axios.post("/api/pedido", pedido);
    tempAlert(`Pedido adicionado com sucesso!`, 5000);
    history.push("/pedido");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoPedido = { ...pedido, [event.target.name]: event.target.value };
    setPedido(novoPedido);
  };

  const handleChangeTh = (event) => {
    const novoPedido = { ...pedido, clienteId: event[0].id };
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
              id="select-nome-cliente"
              name="nomeDoCliente"
              className="th-input"
              // @ts-ignore
              labelKey="nomeDoCliente"
              // onChange={handleChange}
              options={clientes}
              onChange={handleChangeTh}
              placeholder="Digite o nome do cliente"
              // selected={() => ()}
            />
          </div>
          <div>
            Data e Hora de Entrega
            <InputMask
              mask="99/99/9999  99:99"
              placeholder="__/__/____ __:__"
              onChange={handleChange}
              required
              type="text"
              name="dataEntrega"
              className="pg-input"
            ></InputMask>
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
