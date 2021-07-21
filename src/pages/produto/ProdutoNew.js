import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import "./Produto.css";
import LoadingScreen from "components/loader/Loading";
import ButtonForm from "components/button/ButtonForm";

/* rafc  - comando para criar um component arrow*/

const ProdutoNew = () => {
  const conexao = axios.create({
    baseURL: "http://localhost:8080",
  });
  const history = useHistory();
  const [produto, setProduto] = useState({
    nomeDoProduto: "",
    precoEncomenda: 4.0,
    precoVitrine: 1.0,
    vendidos: 0,
    tipoDoProduto: "Doce",
    vendidoPor: "/un",
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await conexao.post("/produto", produto);
    tempAlert(`Produto adicionado com sucesso!`, 5000);
    history.push("/produto");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoProduto = { ...produto, [event.target.name]: event.target.value };
    setProduto(novoProduto);
  };

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="produto"></Menu>
      <div className="container">
        <h3 className="pg-title">Cadastro de Produto</h3>
        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome Do Produto
            <input
              type="text"
              autoFocus
              name="nomeDoProduto"
              className="pg-input"
              required
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
              onChange={handleChange}
              defaultValue={produto.tipoDoProduto}
            >
              <option value="" disabled>
                Selecione o tipo do produto
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
              defaultValue={produto.vendidoPor}
              className="pg-select"
              name="vendidoPor"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                O produto será vendido por
              </option>

              <option value="/un">unidade</option>
              <option value="/Kg">kilograma</option>
              <option value="/g">grama</option>
            </select>
          </div>
          <div className="flex-column">
            Preço Encomenda
            <input
              type="text"
              name="precoEncomenda"
              required
              className="pg-input"
              onChange={handleChange}
              value={produto.precoEncomenda}
            ></input>
          </div>
          <div className="flex-column">
            Preço Vitrine
            <input
              type="text"
              name="precoVitrine"
              required
              className="pg-input"
              onChange={handleChange}
              value={produto.precoVitrine}
            ></input>
          </div>
          <ButtonForm exitPath="/produto"></ButtonForm>
        </form>
      </div>
    </>
  );
};

export default ProdutoNew;
