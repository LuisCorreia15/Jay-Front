/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";
import Menu from "components/menu/menu";
import DeleteConfirm from "components/alert/DeleteConfirm";
import ButtonForm from "components/button/ButtonForm";

const PedidoEdit = () => {
  const conexao = axios.create({
    baseURL: "http://localhost:3000",
  });
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [pedido, setPedido] = useState({
    nomeDoPedido: "",
    preco: 0.0,
    vendidos: 0,
    tipoDoPedido: "",
    vendidoPor: "",
  });
  const [confirmState, setConfirmState] = useState(false);

  const doGetById = async () => {
    const response = await conexao.get(`/api/pedido/${idParaEditar}`, pedido);
    setPedido(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doExcluirPedido = async (id, name) => {
    await conexao.delete(`/api/pedido/${id}`);
    tempAlert(name + " excluído!", 5000);
    setConfirmState(false);
    history.push("/pedido");
  };

  const handleExcluir = () => {
    setConfirmState(true);
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluir={doExcluirPedido}
        id={idParaEditar}
        nome={pedido.nomeDoPedido}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const doPut = async () => {
    await conexao.put(`/api/pedido/${idParaEditar}`, pedido);
    tempAlert(`${pedido.nomeDoPedido} alterado com sucesso!`, 5000);
    history.push("/pedido");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novoPedido = { ...pedido, [event.target.name]: event.target.value };
    setPedido(novoPedido);
  };

  return (
    <>
      <Menu></Menu>
      {renderConfirmDelete()}
      <div className="container">
        <h2 className="pg-title">Edição de Pedido</h2>
        <button className="pg-excluir" onClick={() => handleExcluir()}>
          excluir pedido
        </button>

        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome
            <input
              type="text"
              className="pg-input"
              name="nomeDoPedido"
              required
              autoFocus
              onChange={handleChange}
              value={pedido.nomeDoPedido}
            ></input>
          </div>
          <div className="sl-icon">
            Tipo do Pedido
            <select
              className="pg-select"
              name="tipoDoPedido"
              required
              defaultValue={pedido.tipoDoPedido}
              onChange={handleChange}
            >
              <option value="Doce">Doce</option>
              <option value="Salgado">Salgado</option>
              <option value="Bolo">Bolo</option>
              <option value="Ingredientes">Ingrediente</option>
            </select>
          </div>
          <div className="sl-icon">
            Medida
            <select
              defaultValue={pedido.vendidoPor}
              className="pg-select"
              name="vendidoPor"
              required
              onChange={handleChange}
            >
              <option value="a unidade">a unidade</option>
              <option value="o Kg">o Kg</option>
              <option value="o grama">o grama</option>
            </select>
          </div>
          <div>
            Preço
            <input
              type="text"
              name="preco"
              required
              onChange={handleChange}
              value={pedido.preco}
              className="pg-input"
            ></input>
          </div>
          <div>
            Vendidos
            <input
              type="text"
              className="pg-input"
              name="vendidos"
              required
              onChange={handleChange}
              value={pedido.vendidos}
            ></input>
          </div>
          <ButtonForm exitPath="/pedido"></ButtonForm>
        </form>
      </div>
    </>
  );
};

export default PedidoEdit;
