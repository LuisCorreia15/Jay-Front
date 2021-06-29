/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";
import Menu from "components/menu/menu";
import DeleteConfirm from "components/alert/DeleteConfirm";
import LoadingScreen from "components/loader/Loading";
import InputMask from "react-input-mask";
import ButtonForm from "components/button/ButtonForm";

const ClienteEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [cliente, setCliente] = useState({
    nomeDoCliente: "",
    celular: "",
    logradouro: "",
  });
  const [confirmState, setConfirmState] = useState(false);

  const doGetById = async () => {
    const response = await axios.get(`/api/cliente/${idParaEditar}`, cliente);
    setCliente(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doExcluirCliente = async (id, name) => {
    await axios.delete(`/api/cliente/${id}`);
    tempAlert(name + " excluído!", 5000);
    setConfirmState(false);
    history.push("/cliente");
  };

  const handleExcluir = () => {
    setConfirmState(true);
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluir={doExcluirCliente}
        id={idParaEditar}
        nome={cliente.nomeDoCliente}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const doPut = async () => {
    await axios.put(`/api/cliente/${idParaEditar}`, cliente);
    tempAlert(`${cliente.nomeDoCliente} alterado com sucesso!`, 5000);
    history.push("/cliente");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novoCliente = { ...cliente, [event.target.name]: event.target.value };
    setCliente(novoCliente);
  };

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="cliente"></Menu>
      {renderConfirmDelete()}
      <div className="container">
        <h2 className="pg-title">Edição de Cliente</h2>
        <button className="pg-excluir" onClick={() => handleExcluir()}>
          excluir cliente
        </button>
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
              value={cliente.nomeDoCliente}
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
              value={cliente.celular}
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
              value={cliente.logradouro}
            ></input>
          </div>
          <ButtonForm exitPath="/cliente"></ButtonForm>
        </form>
      </div>
    </>
  );
};

export default ClienteEdit;
