import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import "./Produto.css";

/* rafc  - comando para criar um component arrow*/

const ProdutoNew = () => {
  const history = useHistory();
  const [Produto, setProduto] = useState({
    nomeDoProduto: "",
    preco: 2.2,
    vendidos: 0,
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
              required
              onChange={handleChange}
              value={Produto.nomeDoProduto}
            ></input>
          </div>
          <div>
            Preço
            <input
              type="text"
              name="preco"
              required
              onChange={handleChange}
              value={Produto.preco}
            ></input>
          </div>
          <button className="btn-page pg-btn">Enviar</button>
          <button
            className="btn-page lixo pg-btn"
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
