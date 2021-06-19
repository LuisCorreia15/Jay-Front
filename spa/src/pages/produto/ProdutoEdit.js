/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";
import Menu from "components/menu/menu";
import DeleteConfirm from "components/alert/DeleteConfirm";
import LoadingScreen from "components/loading/Loading";

const ProdutoEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [produto, setProduto] = useState({
    nomeDoProduto: "",
    preco: 0.0,
    vendidos: 0,
    tipoDoProduto: "",
    vendidoPor: "",
  });
  const [confirmState, setConfirmState] = useState(false);

  const doGetById = async () => {
    const response = await axios.get(`/api/produto/${idParaEditar}`, produto);
    setProduto(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doExcluirProduto = async (id, name) => {
    await axios.delete(`/api/produto/${id}`);
    tempAlert(name + " excluído!", 5000);
    setConfirmState(false);
    history.push("/produto");
  };

  const handleExcluir = () => {
    setConfirmState(true);
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluirProduto={doExcluirProduto}
        id={idParaEditar}
        nome={produto.nomeDoProduto}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const doPut = async () => {
    await axios.put(`/api/produto/${idParaEditar}`, produto);
    tempAlert(`${produto.nomeDoProduto} alterado com sucesso!`, 5000);
    history.push("/produto");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novoProduto = { ...produto, [event.target.name]: event.target.value };
    setProduto(novoProduto);
  };

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu></Menu>
      {renderConfirmDelete()}
      <div className="container">
        <h2 className="pg-title">Edição de Produto</h2>
        <button className="pg-excluir" onClick={() => handleExcluir()}>
          excluir produto
        </button>

        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome
            <input
              type="text"
              className="pg-input"
              name="nomeDoProduto"
              required
              autoFocus
              onChange={handleChange}
              value={produto.nomeDoProduto}
            ></input>
          </div>
          <div className="sl-icon">
            Tipo do Produto
            <select
              className="pg-select"
              name="tipoDoProduto"
              required
              defaultValue={produto.tipoDoProduto}
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
              defaultValue={produto.vendidoPor}
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
              value={produto.preco}
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
              value={produto.vendidos}
            ></input>
          </div>
          <button className="btn-page pg-btn ">Concluir </button>
          <button
            className="btn-page bt-lixo pg-btn"
            onClick={() => history.push("/produto")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};

export default ProdutoEdit;
