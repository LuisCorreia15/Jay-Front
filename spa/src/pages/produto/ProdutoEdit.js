/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";
import Menu from "components/menu/menu";

const ProdutoEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [Produto, setProduto] = useState({
    nomeDoProduto: "",
    preco: 0.0,
    estoque: 0,
  });

  const doGetById = async () => {
    const response = await axios.get(`/api/produto/${idParaEditar}`, Produto);
    setProduto(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doPut = async () => {
    await axios.put(`/api/produto/${idParaEditar}`, Produto);
    tempAlert(`${Produto.nomeDoProduto} alterado com sucesso!`, 5000);
    history.push("/produto");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novoProduto = { ...Produto, [event.target.name]: event.target.value };
    setProduto(novoProduto);
  };

  return (
    <>
      <Menu></Menu>
      <div className="container">
        <h2 className="pg-title">Edição de Produto</h2>
        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome
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
          <button className="btn-page pg-btn ">Enviar</button>
          <button
            className="btn-page lixo pg-btn"
            onClick={() => history.push("/Produto")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};

export default ProdutoEdit;
