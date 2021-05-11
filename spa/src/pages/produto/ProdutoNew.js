import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "App.css";
import tempAlert from "components/alert/Alert";

/* rafc  - comando para criar um component arrow*/

const ProdutoNew = () => {
  const history = useHistory();
  const [Produto, setProduto] = useState({
    nomeDoProduto: "",
    preco: 0.0,
    estoque: 1000,
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
    <div>
      <h3>Cadastro de Produto</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Nome Do Produto
          <input
            type="text"
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
        <div>
          Estoque
          <input
            type="text"
            name="estoque"
            required
            onChange={handleChange}
            value={Produto.estoque}
          ></input>
        </div>
        <button className="btn">Enviar</button>
        <button className="btn-cancel" onClick={() => history.push("/Produto")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProdutoNew;
