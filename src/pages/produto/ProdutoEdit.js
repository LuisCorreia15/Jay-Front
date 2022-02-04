/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Menu from "components/menu/menu";
import DeleteConfirm from "components/alert/DeleteConfirm";
import LoadingScreen from "components/loader/Loading";
import ButtonForm from "components/button/ButtonForm";
import {
  doGetProdutoById,
  doPutProduto,
  doExcluirProduto,
} from "connection/produtoReq";

const ProdutoEdit = () => {
  const history = useHistory();
  const { idDoProduto } = useParams();
  const localDoArquivo = "/pages/produto/ProdutoEdit.js";
  const [produto, setProduto] = useState({
    nomeDoProduto: "",
    precoEncomenda: 0.0,
    precoVitrine: 0.0,
    vendidos: 0,
    tipoDoProduto: "",
    vendidoPor: "",
  });
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    doGetProdutoById(idDoProduto, setProduto, localDoArquivo);
  }, []);

  const handleExcluirProdutos = async (idDoProduto, nomeDoProduto) => {
    doExcluirProduto(idDoProduto, nomeDoProduto, history, localDoArquivo);
    setMostrarConfirmacao(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPutProduto(idDoProduto, produto, history, localDoArquivo);
  };

  const handleChange = (event) => {
    const novoProduto = { ...produto, [event.target.name]: event.target.value };
    setProduto(novoProduto);
  };

  return (
    <>
      <LoadingScreen />
      <Menu ativo="produto" />
      {mostrarConfirmacao && (
        <DeleteConfirm
          setMostrarConfirmacao={setMostrarConfirmacao}
          handleExcluirProdutos={handleExcluirProdutos}
          nomeDoProduto={produto.nomeDoProduto}
          idDoProduto={idDoProduto}
        />
      )}
      <div className="container">
        <h2 className="pg-title">Edição de Produto</h2>
        <button
          className="pg-excluir"
          onClick={() => setMostrarConfirmacao(true)}
        >
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
            />
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
            Preço de Encomenda
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
            Preço da Vitrine
            <input
              type="text"
              name="precoVitrine"
              required
              onChange={handleChange}
              value={produto.precoVitrine}
              className="pg-input"
            />
          </div>
          <div className="flex-column">
            Quantidade vendida
            <input
              type="text"
              className="pg-input"
              name="vendidos"
              required
              onChange={handleChange}
              value={produto.vendidos}
            />
          </div>
          <ButtonForm exitPath="/produto" />
        </form>
      </div>
    </>
  );
};

export default ProdutoEdit;
