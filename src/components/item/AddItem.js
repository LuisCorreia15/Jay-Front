import React, { useState, useEffect } from "react";
import "./AddItem.css";
import {
  buscarProdutoPeloId,
  buscarTodosProdutos,
} from "connection/produtoReq";

const AddItem = (props) => {
  const { pedido, setPedido, estadoDoModal, setEstadoDoModal } = props;
  const localDoArquivo = "components/item/AddItem.js";

  const [types, setTypes] = useState({
    typeProdutos: "",
    typeValores: "Vitrine",
  });
  const [produtos, setProdutos] = useState([{}]);
  const [produtoSelecionado, setProdutoSelecionado] = useState({
    nomeDoProduto: "",
    precoEncomenda: 0.0,
    precoVitrine: 0.0,
    vendidos: 0,
    tipoDoProduto: "",
    vendidoPor: "",
  });
  const [termoDePesquisa, setTermoDePesquisa] = useState("");
  const [selectModal, setSelecttModal] = useState(false);
  const [addInput, setAddInput] = useState({
    valorUnitario: 0,
    quantidade: 0,
  });

  useEffect(() => {
    buscarTodosProdutos(
      termoDePesquisa,
      types.typeProdutos,
      setProdutos,
      localDoArquivo
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termoDePesquisa, types.typeProdutos, types.typeValores]);

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
    produtos.length === 0 ? (
      <p className="add-nothing">Nada encontrado!</p>
    ) : (
      produtos.map((row, i) => {
        return (
          <div
            className="add-tb flex"
            key={i}
            onClick={() => showSelectModal(row._id)}
          >
            <div className="add-tb-title">
              <h2>{row.nomeDoProduto}</h2>
            </div>
            <div className="add-tb-price flex">
              {types.typeValores === "Vitrine" ? (
                <h2>
                  R${" "}
                  {row.precoVitrine
                    ? row.precoVitrine.toFixed(2)
                    : row.precoVitrine}
                </h2>
              ) : (
                <h2>
                  R${" "}
                  {row.precoEncomenda
                    ? row.precoEncomenda.toFixed(2)
                    : row.precoEncomenda}
                </h2>
              )}
              <p>{row.vendidoPor}</p>
            </div>
          </div>
        );
      })
    );

  const showSelectModal = async (id) => {
    await buscarProdutoPeloId(id, setProdutoSelecionado, localDoArquivo);
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
    setTermoDePesquisa(event.target.value);
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
              value={termoDePesquisa}
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
              <h1>{produtoSelecionado.nomeDoProduto}</h1>
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
                  defaultValue={produtoSelecionado.precoEncomenda}
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
