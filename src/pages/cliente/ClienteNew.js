import ButtonForm from "components/button/ButtonForm";
import LoadingScreen from "components/loader/Loading";
import Menu from "components/menu/menu";
import { criarNovoCliente } from "connection/clienteReq";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useHistory } from "react-router-dom";

const ClienteNew = () => {
  const history = useHistory();
  const [cliente, setCliente] = useState({
    nomeDoCliente: "",
    celular: "",
    logradouro: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await criarNovoCliente(cliente);
    history.push("/cliente");
  };

  const handleChange = (event) => {
    const novoCliente = { ...cliente, [event.target.name]: event.target.value };
    setCliente(novoCliente);
  };

  return (
    <>
      <LoadingScreen />
      <Menu ativo="cliente" />
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
            />
          </div>
          <ButtonForm exitPath="/cliente" />
        </form>
      </div>
    </>
  );
};

export default ClienteNew;
