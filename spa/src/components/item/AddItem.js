import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddItem.css";

const AddItem = (props) => {
  const { pedido, estadoDoModal, setEstadoDoModal } = props;
  const [types, setTypes] = useState({
    typeProdutos: "",
    typeValores: "Vitrine",
  });
  const [produto, setProduto] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  const doGetProduto = async (
    páginaRequerida,
    termoDePesquisa,
    tipoDosProdutos
  ) => {
    const response = await axios.get(
      `/api/produto?termo=${termoDePesquisa}&page=${páginaRequerida}&tipo=${tipoDosProdutos}`
    );
    setProduto(response.data);
  };

  useEffect(() => {
    doGetProduto(
      statusPesquisa.páginaAtual,
      statusPesquisa.termoDePesquisa,
      types.typeProdutos
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa, types.typeProdutos, types.typeValores, ]);

  useEffect(() => {
    if (estadoDoModal) {
      document.getElementById("add-container").style.display = "block ";
    } else {
      document.getElementById("add-container").style.display = "none";
    }
  }, [estadoDoModal]);

  const produtoData =
    produto.content.length === 0 ? (
      <p className='add-nothing'>Nada encontrado!</p>
    ) : (
      produto.content.map((row) => {
        return (
          <div className="add-tb flex" key={row.id}>
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

  return (
    <div className="add-container" id="add-container">
      <div className="add-modal">
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
            placeholder="O que deseja buscar?"
            autoFocus
            onChange={handleSearchInputChange}
          />
        </form>
        <div className="add-data">
          <div className="add-tb-cnt">{produtoData}</div>
        </div>
        <div className="add-buttons">
          <button>Adicionar</button>
          <button>Concluir</button>
          <button onClick={() => setEstadoDoModal(!estadoDoModal)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
