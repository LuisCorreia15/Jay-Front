/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";
import Menu from "components/menu/menu";
import DeleteConfirm from "components/alert/DeleteConfirm";
import LoadingScreen from "components/loader/Loading";

const ClienteEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [cliente, setCliente] = useState({
    nomeDoCliente: "",
    preco: 0.0,
    vendidos: 0,
    tipoDoCliente: "",
    vendidoPor: "",
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
        doExcluirCliente={doExcluirCliente}
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
              className="pg-input"
              name="nomeDoCliente"
              required
              autoFocus
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
              defaultValue={cliente.tipoDoCliente}
              onChange={handleChange}
            >
              <option value="Doce">Doce</option>
              <option value="Salgado">Salgado</option>
              <option value="Bolo">Bolo</option>
              <option value="Ingredientes">Ingrediente</option>
            </select>
          </div>
          <div className="sl-icon flex-column">
            Medida
            <select
              defaultValue={cliente.medida}
              className="pg-select"
              name="vendidoPor"
              required
              onChange={handleChange}
            >
              <option value="/un">a unidade</option>
              <option value="/Kg">o kilo</option>
              <option value="/g">o grama</option>
            </select>
          </div>
          <div className="flex-column">
            Preço
            <input
              type="text"
              name="preco"
              required
              onChange={handleChange}
              value={cliente.preco}
              className="pg-input"
            ></input>
          </div>
          <div className="flex-column">
            Vendidos
            <input
              type="text"
              className="pg-input"
              name="vendidos"
              required
              onChange={handleChange}
              value={cliente.vendidos}
            ></input>
          </div>
          <button className="btn-page pg-btn ">Concluir </button>
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

export default ClienteEdit;