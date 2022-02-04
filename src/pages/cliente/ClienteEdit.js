/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import DeleteConfirm from "components/alert/DeleteConfirm";
import ButtonForm from "components/button/ButtonForm";
import LoadingScreen from "components/loader/Loading";
import Menu from "components/menu/menu";
import {
  deletarClientePeloId,
  buscarClientePeloId,
  editarClientePeloId,
} from "connection/clienteReq";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useHistory, useParams } from "react-router-dom";

const ClienteEdit = () => {
  const history = useHistory();
  const localDoArquivo = "pages/cliente/ClienteEdit.js";
  const { idDoCliente } = useParams();
  const [cliente, setCliente] = useState({
    nomeDoCliente: "",
    celular: "",
    logradouro: "",
  });
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    buscarClientePeloId(idDoCliente, setCliente, localDoArquivo);
  }, []);

  const doExcluirCliente = async (id, nome) => {
    await deletarClientePeloId(id, nome, localDoArquivo);
    setMostrarConfirmacao(false);
    history.push("/cliente");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editarClientePeloId(idDoCliente, cliente, localDoArquivo);
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
      {mostrarConfirmacao && (
        <DeleteConfirm
          setMostrarConfirmacao={setMostrarConfirmacao}
          handleExcluir={doExcluirCliente}
          id={idDoCliente}
          nome={cliente.nomeDoCliente}
        />
      )}
      <div className="container">
        <h2 className="pg-title">Edição de Cliente</h2>
        <button
          className="pg-excluir"
          onClick={() => setMostrarConfirmacao(true)}
        >
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
            />
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
            />
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
          <ButtonForm exitPath="/cliente" />
        </form>
      </div>
    </>
  );
};

export default ClienteEdit;
