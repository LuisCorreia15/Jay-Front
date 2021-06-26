/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";
import Menu from "components/menu/menu";
import DeleteConfirm from "components/alert/DeleteConfirm";
import LoadingScreen from "components/loader/Loading";
import ButtonForm from "components/button/ButtonForm";

const ProdutoEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [produto, setProduto] = useState({
    nomeDoProduto: "",
    precoEncomenda: 0.0,
    precoVitrine: 0.0,
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
        doExlcuir={doExcluirProduto}
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
      <Menu ativo="produto"></Menu>
      {renderConfirmDelete()}
      <div className="container">
        <h2 className="pg-title">Edição de Produto</h2>
        <button className="pg-excluir" onClick={() => handleExcluir()}>
          excluir produto
        </button>
        <form onSubmit={handleSubmit} className="pg-form">
          <div className="flex-column">
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
          <div className="sl-icon flex-column">
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
          <div className="sl-icon flex-column">
            Medida
            <select
              defaultValue={produto.medida}
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
              name="precoEncomenda"
              required
              onChange={handleChange}
              value={produto.precoEncomenda}
              className="pg-input"
            ></input>
          </div>
          <div className="flex-column">
            Preço
            <input
              type="text"
              name="precoVitrine"
              required
              onChange={handleChange}
              value={produto.precoVitrine}
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
              value={produto.vendidos}
            ></input>
          </div>
          <ButtonForm exitPath="/produto"></ButtonForm>
        </form>
      </div>
    </>
  );
};

export default ProdutoEdit;
