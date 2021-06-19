import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import "./Cliente.css";
import LoadingScreen from "components/loader/Loading";

/* rafc  - comando para criar um component arrow*/

const ClienteNew = () => {
  const history = useHistory();
  const [cliente, setCliente] = useState({
    nomeDoCliente: "",
    preco: 2.2,
    vendidos: 0,
    tipoDoCliente: "Doce",
    vendidoPor: "unidade",
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await axios.post("/api/cliente", cliente);
    tempAlert(`Cliente adicionado com sucesso!`, 5000);
    history.push("/cliente");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoCliente = { ...cliente, [event.target.name]: event.target.value };
    setCliente(novoCliente);
  };

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo='cliente'></Menu>
      <div className="container">
        <h3 className="pg-title">Cadastro de Cliente</h3>
        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome Do Cliente
            <input
              type="text"
              autoFocus
              name="nomeDoCliente"
              className="pg-input"
              required
              onChange={handleChange}
              value={cliente.nomeDoCliente}
            ></input>
          </div>
          <div className="sl-icon flex-column">
            Tipo do Cliente
            <select
              className="pg-select"
              name="tipoDoCliente"
              required
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione o tipo do cliente
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
              defaultValue=""
              className="pg-select"
              name="vendidoPor"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                O cliente será vendido por
              </option>

              <option value="/un">unidade</option>
              <option value="/Kg">kilograma</option>
              <option value="/g">grama</option>
            </select>
          </div>
          <div className="flex-column">
            Preço
            <input
              type="text"
              name="preco"
              required
              className="pg-input"
              onChange={handleChange}
              value={cliente.preco}
            ></input>
          </div>
          <button className="btn-page pg-btn">Enviar</button>
          <button
            className="btn-page bt-lixo pg-btn"
            onClick={() => history.push("/cliente")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};

export default ClienteNew;
