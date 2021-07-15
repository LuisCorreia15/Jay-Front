import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";

const PedidoList = (props) => {
  const conexao = axios.create({
    baseURL: "http://localhost:3000",
  });
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [pedido, setPedido] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [types, setTypes] = useState({
    typePedidos: "Cliente",
    typeStatus: "",
  });

  const doGetPedido = async (páginaRequerida, termoDePesquisa) => {
    const response = await conexao.get(
      `/api/pedido?termo=${termoDePesquisa}&page=${páginaRequerida}`
    );
    setPedido(response.data);
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    doGetPedido(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInputChange = async (event) => {
    const novoStatusPesquisa = {
      ...statusPesquisa,
      termoDePesquisa: event.target.value,
    };
    setStatusPesquisa(novoStatusPesquisa);
  };

  useEffect(() => {
    doGetPedido(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa]);

  const tableData =
    pedido.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      pedido.content.map((row) => {
        return (
          <div
            className="tb"
            key={row.id}
            onClick={() => history.push(`/pedido/editar/${row.id}`)}
          >
            <div className="tb-title">
              <p>{row.tipoDoPedido}</p>
              <h2>{row.nomeDoPedido}</h2>
            </div>
            <div className="tb-price">
              <h2>R$ {row.preco.toFixed(2)}</h2>
              <p>{row.vendidoPor}</p>
            </div>
          </div>
        );
      })
    );

  function keydownHandler(e) {
    if (e.keyCode === 115) {
      history.push("/pedido/novo");
    }
  }

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= pedido.totalPages) {
      requestedPage = pedido.totalPages - 1;
    }
    doGetPedido(requestedPage, statusPesquisa.termoDePesquisa);
  };

  const handleSearchSelectChange = (event) => {
    const typeChaged = {
      ...types,
      [event.target.name]: event.target.value,
    };
    setTypes(typeChaged);
  };

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="pedido"></Menu>
      <div className="container">
        <form className="pd campo-busca">
          <div className="sl-search">
            <select
              name="typeStatus"
              defaultValue={types.typeStatus}
              onChange={handleSearchSelectChange}
            >
              <option value="">Todos</option>
              <option value="Aberto">Em Aberto</option>
              <option value="Quitados">Quitados</option>
              <option value="Fechados">Fechados</option>
            </select>
          </div>
          <div className="sl-search">
            <select
              name="typePedidos"
              defaultValue={types.typePedidos}
              onChange={handleSearchSelectChange}
            >
              <option value="">Todos</option>
              <option value="Cliente">Clientes</option>
              <option value="Data">Data</option>
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
          className="btn-page novo nw-pl"
          onClick={() => history.push("/pedido/novo")}
        >
          Novo Pedido
        </button>
        <div className="tb-cnt">{tableData}</div>

        {pedido.totalPages > 1 ? (
          <div className="page-control">
            <button
              className="btn-page"
              onClick={() => requestPage(pedido.pageable.pageNumber - 1)}
            >
              {"<"}
            </button>
            <span>
              Página{" "}
              {pedido.totalPages > 0 ? pedido.pageable.pageNumber + 1 : 0} de{" "}
              {pedido.totalPages}
            </span>
            <button
              className="btn-page"
              onClick={() => requestPage(pedido.pageable.pageNumber + 1)}
            >
              {">"}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default PedidoList;
