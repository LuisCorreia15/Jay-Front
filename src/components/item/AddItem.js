import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddItem.css";

const AddItem = (props) => {
  const conexao = axios.create({ baseURL: process.env.REACT_APP_PORT });
  const { pedido, setPedido, estadoDoModal, setEstadoDoModal } = props;
  const [types, setTypes] = useState({
    typeProdutos: "",
    typeValores: "Vitrine",
  });
  const [produto, setProduto] = useState([{}]);
  const [selectedProduto, setSelectedProduto] = useState({
    nomeDoProduto: "",
    precoEncomenda: 0.0,
    precoVitrine: 0.0,
    vendidos: 0,
    tipoDoProduto: "",
    vendidoPor: "",
  });
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });
  const [selectModal, setSelecttModal] = useState(false);
  const [addInput, setAddInput] = useState({
    valorUnitario: 0,
    quantidade: 0,
  });

  const doGetProduto = async (
    páginaRequerida,
    termoDePesquisa,
    tipoDosProdutos
  ) => {
    const response = await conexao.get(
      `/api/produto?termo=${termoDePesquisa}&page=${páginaRequerida}&tipo=${tipoDosProdutos}`
    );
    setProduto(response.data);
  };

  const doGetById = async (id) => {
    const response = await axios.get(`/api/produto/${id}`);
    setSelectedProduto(response.data);
  };

  useEffect(() => {
    doGetProduto(
      statusPesquisa.páginaAtual,
      statusPesquisa.termoDePesquisa,
      types.typeProdutos
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa, types.typeProdutos, types.typeValores]);

  useEffect(() => {
    if (estadoDoModal) {
      document.getElementById("add-container").style.display = "block ";
      setTimeout(function () {
        document.getElementById("input-search-item").focus();
      }, 500);
    } else {
      document.getElementById("add-container").style.display = "none";
    }
  }, [estadoDoModal]);

  const produtoData =
    produto.length === 0 ? (
      <p className="add-nothing">Nada encontrado!</p>
    ) : (
      produto.map((row) => {
        return (
          <div
            className="add-tb flex"
            key={row.id}
            onClick={() => showSelectModal(row.id)}
          >
            <div className="add-tb-title">
              <h2>{row.nomeDoProduto}</h2>
            </div>
            <div className="add-tb-price flex">
              {types.typeValores === "Vitrine" ? (
                <h2>R$ {row.precoVitrine.toFixed(2)}</h2>
              ) : (
                <h2>R$ {row.precoEncomenda.toFixed(2)}</h2>
              )}
              <p>{row.vendidoPor}</p>
            </div>
          </div>
        );
      })
    );

  const showSelectModal = async (id) => {
    await doGetById(id);
    if (!selectModal) {
      document.getElementById("add-select-container").style.right = "0 ";
      setTimeout(function () {
        document.getElementById("shur").focus();
      }, 1000);

      setSelecttModal(!selectModal);
    } else {
      document.getElementById("add-select-container").style.right = "-100%";
      setSelecttModal(!selectModal);
    }
  };

  const handleSearchInputChange = async (event) => {
    const novoStatusPesquisa = {
      ...statusPesquisa,
      termoDePesquisa: event.target.value,
    };
    setStatusPesquisa(novoStatusPesquisa);
  };

  const handleSearchSelectChange = (event) => {
    const typeChaged = {
      ...types,
      [event.target.name]: event.target.value,
    };
    setTypes(typeChaged);
  };

  const handleChange = (event) => {
    setAddInput({ ...addInput, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setPedido({
      ...pedido,
      valorTotal: addInput.quantidade * addInput.valorUnitario,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInput]);

  return (
    <div className="add-container" id="add-container">
      <div className="add-modal">
        <div className="add-search">
          <form className="pd campo-busca add-modal-campo">
            <div className="sl-search">
              <select
                defaultValue={types.typeValores}
                required
                onChange={handleSearchSelectChange}
                name="typeValores"
              >
                <option value="" disabled>
                  Tipo de valor
                </option>
                <option value="Vitrine">Vitrine</option>
                <option value="Encomenda">Encomenda</option>
              </select>
            </div>
            <div className="sl-search">
              <select
                defaultValue={types.typeProdutos}
                required
                onChange={handleSearchSelectChange}
                name="typeProdutos"
              >
                <option value="">Todos</option>
                <option value="Doce">Doce</option>
                <option value="Salgado">Salgado</option>
                <option value="Bolo">Bolo</option>
                <option value="Ingrediente">Ingrediente</option>
              </select>
            </div>
            <input
              type="text"
              value={statusPesquisa.termoDePesquisa}
              id="input-search-item"
              placeholder="O que deseja buscar?"
              autoFocus
              onChange={handleSearchInputChange}
            />
          </form>
          <div className="add-data">
            <div className="add-tb-cnt">{produtoData}</div>
          </div>
          <div className="add-buttons">
            <button>Concluir</button>
            <button onClick={() => setEstadoDoModal(!estadoDoModal)}>
              Cancelar
            </button>
          </div>
        </div>
        <div className="add-select-container" id="add-select-container">
          <div className="add-select" id="add-select">
            <form className="add-sl-form">
              <h1>{selectedProduto.nomeDoProduto}</h1>
              <div className="flex-column">
                Quantidade
                <input
                  type="number"
                  id="shur"
                  className="add-input"
                  name="quantidade"
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex-column">
                Valor unitário
                <input
                  type="number"
                  className="add-input"
                  name="valorUnitario"
                  required
                  onChange={handleChange}
                  defaultValue={selectedProduto.precoEncomenda}
                ></input>
              </div>
              <div className="flex-column">
                Valor total
                <input
                  type="number"
                  className="add-input"
                  name="valorTotal"
                  readOnly
                  value={pedido.valorTotal}
                ></input>
              </div>
              <div className="add-buttons">
                <button>Adicionar</button>
                <button type="button" onClick={() => showSelectModal()}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
