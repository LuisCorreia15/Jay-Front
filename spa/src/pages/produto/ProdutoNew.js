import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import "./Produto.css";
import LoadingScreen from "components/loading/Loading";

/* rafc  - comando para criar um component arrow*/

const ProdutoNew = () => {
  const history = useHistory();
  const [Produto, setProduto] = useState({
    nomeDoProduto: "",
    preco: 2.2,
    vendidos: 0,
    tipoDoProduto: "Doce",
    vendidoPor: "unidade",
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await axios.post("/api/produto", Produto);
    tempAlert(`Produto adicionado com sucesso!`, 5000);
    history.push("/produto");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoProduto = { ...Produto, [event.target.name]: event.target.value };
    setProduto(novoProduto);
  };

  return (
    <>
    <LoadingScreen></LoadingScreen>
      <Menu></Menu>
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
              value={Produto.nomeDoProduto}
            ></input>
          </div>
          <div className="sl-icon">
            Tipo do Produto
            <select
              className="pg-select"
              name="tipoDoProduto"
              required
              onChange={handleChange}
              defaultValue=""
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
          <div className="sl-icon">
            Medida
            <select
              defaultValue=""
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
          <div>
            Preço
            <input
              type="text"
              name="preco"
              required
              className="pg-input"
              onChange={handleChange}
              value={Produto.preco}
            ></input>
          </div>
          <button className="btn-page pg-btn">Enviar</button>
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

export default ProdutoNew;
