import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import "./Cliente.css";
import LoadingScreen from "components/loader/Loading";
import InputMask from "react-input-mask";

/* rafc  - comando para criar um component arrow*/

const ClienteNew = () => {
  const history = useHistory();
  const [cliente, setCliente] = useState({
    nomeDoCliente: "",
    celular: "",
    logradouro: "",
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
      <Menu ativo="cliente"></Menu>
      <div className="container">
        <h3 className="pg-title">Cadastro de Cliente</h3>
        <form onSubmit={handleSubmit} className="pg-form">
          <div className="flex-column">
            Nome
            <input
              type="text"
              autoFocus
              name="nomeDoCliente"
              className="pg-input"
              required
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex-column">
            Celular
            <InputMask
              mask="(99) 9.9999-9999"
              placeholder="(__) _.____-____"
              onChange={handleChange}
              required
              type="text"
              name="celular"
              className="pg-input"
            ></InputMask>
          </div>
          <div className="flex-column">
            Logradouro
            <input
              type="text"
              name="logradouro"
              className="pg-input"
              required
              onChange={handleChange}
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
