import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import "./Pedido.css";
/* rafc  - comando para criar um component arrow*/

const PedidoNew = () => {
  const history = useHistory();
  const [Pedido, setPedido] = useState({
    nomeDoPedido: "",
    preco: 2.2,
    vendidos: 0,
    tipoDoPedido: "Doce",
    vendidoPor: "unidade",
  });

  // nfn - comando para criar função anonima
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
      <Menu></Menu>
      <div className="container">
        <h3 className="pg-title">Cadastro de Pedido</h3>
        <form onSubmit={handleSubmit} className="pg-form">
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
