import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import SkeletonLoader from "components/loader/SkeletonLoader";

const ProdutoList = (props) => {
  const conexao = axios.create({
    // baseURL: "https://jay-assistant-api.herokuapp.com/",
    baseURL: "http://localhost:8080",
  });
  const { statusPesquisa, setStatusPesquisa } = props;
  const loadingProdutos = new Array(10);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [types, setTypes] = useState({
    typeProdutos: "",
    typeValores: "Vitrine",
  });
  const [produto, setProduto] = useState([{}]);

  const firstDoGetProduto = async () => {
    setLoading(true);
    setTimeout(async () => {
      doGetProduto(statusPesquisa.termoDePesquisa, types.typeProdutos);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    firstDoGetProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doGetProduto = async (termoDePesquisa, tipoDosProdutos) => {
    const response = await conexao.get(
      `/produto/?nomeDoProduto=${termoDePesquisa}&tipoDoProduto=${tipoDosProdutos}`
    );
    setProduto(response.data);
  };

  const handleSearchInputChange = async (event) => {
    const novoStatusPesquisa = {
      ...statusPesquisa,
      termoDePesquisa: event.target.value,
    };
    setStatusPesquisa(novoStatusPesquisa);
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    doGetProduto(statusPesquisa.termoDePesquisa, types.typeProdutos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa, types.typeProdutos, types.typeValores]);

  const handleSearchSelectChange = (event) => {
    const typeChaged = {
      ...types,
      [event.target.name]: event.target.value,
    };
    setTypes(typeChaged);
  };

  const tableData =
    produto.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      produto.map((row, i) => {
        return (
          <div
            className="tb"
            key={i}
            onClick={() => history.push(`/produto/editar/${row._id}`)}
          >
            <div className="tb-title">
              <p>{row.tipoDoProduto}</p>
              <h2>{row.nomeDoProduto}</h2>
            </div>
            <div className="tb-price">
              {types.typeValores === "Vitrine" ? (
                <h2>R$ {row.precoVitrine ? row.precoVitrine.toFixed(2) : 0}</h2>
              ) : (
                <h2>
                  R$ {row.precoEncomenda ? row.precoEncomenda.toFixed(2) : 0}
                </h2>
              )}
              <p>{row.vendidoPor}</p>
            </div>
          </div>
        );
      })
    );

  // const requestPage = (requestedPage) => {
  //   if (requestedPage <= 0) {
  //     requestedPage = 0;
  //   }
  //   if (requestedPage >= produto.totalPages) {
  //     requestedPage = produto.totalPages - 1;
  //   }
  //   doGetProduto(requestedPage, statusPesquisa.termoDePesquisa);
  // };

  function keydownHandler(e) {
    if (e.keyCode === 115) {
      history.push("/produto/novo");
    }
    // Arrumar o go back do history
    // if (e.keyCode === 27) {
    //   history.goBack();
    // }
  }

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="produto"></Menu>
      <div className="container">
        <form className="pd campo-busca">
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

        <button
          className="btn-page novo"
          onClick={() => history.push("/produto/novo")}
        >
          Novo Produto (F4)
        </button>

        <div className="tb-cnt">
          {loading ? (
            loadingProdutos.fill(10).map((row, i) => {
              return (
                <SkeletonLoader
                  key={i}
                  onLoad={() => console.log(i)}
                ></SkeletonLoader>
              );
            })
          ) : (
            <div>{tableData}</div>
          )}
        </div>

        {/* {produto.totalPages > 1 ? (
          <div className="page-control">
            <button
              className="btn-page"
              onClick={() => requestPage(produto.pageable.pageNumber - 1)}
            >
              {"<"}
            </button>
            <span>
              Página{" "}
              {produto.totalPages > 0 ? produto.pageable.pageNumber + 1 : 0} de{" "}
              {produto.totalPages}
            </span>
            <button
              className="btn-page"
              onClick={() => requestPage(produto.pageable.pageNumber + 1)}
            >
              {">"}
            </button>
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
    </>
  );
};

export default ProdutoList;
