import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Menu from "components/menu/menu";
import tempAlert from "components/alert/Alert";
import LoadingScreen from "components/loader/Loading";

const ClienteList = (props) => {
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [cliente, setCliente] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });

  const doGetCliente = async (páginaRequerida, termoDePesquisa) => {
    const response = await axios.get(
      `/api/cliente?termo=${termoDePesquisa}&page=${páginaRequerida}`
    );
    setCliente(response.data);
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    doGetCliente(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
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
    doGetCliente(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa]);

  const doGerarCliente = async () => {
    await axios.post(`/api/cliente/gerar`);
    tempAlert("10 Clientes gerados!", 5000);
    doGetCliente(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarCliente();
  };

  const doExcluirTodosCliente = async () => {
    await axios.delete(`/api/cliente/excluir-todos`);
    tempAlert("Todos Clientes excluídos!", 5000);
    doGetCliente(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleExcluirTodos = () => {
    doExcluirTodosCliente();
  };

  const tableData =
    cliente.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      cliente.content.map((row) => {
        return (
          <div
            className="tb"
            key={row.id}
            onClick={() => history.push(`/cliente/editar/${row.id}`)}
          >
            <div className="tb-title">
              <p>{row.celular}</p>
              <h2>{row.nomeDoCliente}</h2>
            </div>
          </div>
        );
      })
    );

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= cliente.totalPages) {
      requestedPage = cliente.totalPages - 1;
    }
    doGetCliente(requestedPage, statusPesquisa.termoDePesquisa);
  };

  function keydownHandler(e) {
    if (e.keyCode === 115) {
      history.push("/cliente/novo");
    }
  }

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="cliente"></Menu>
      <div className="container">
        <form className="pd campo-busca">
          <input
            type="text"
            value={statusPesquisa.termoDePesquisa}
            placeholder="O que deseja buscar?"
            autoFocus
            onChange={handleSearchInputChange}
          />
        </form>
        <button className="btn-page" onClick={handleGerar}>
          Gerar 10 Clientes
        </button>
        <button
          className="btn-page novo"
          onClick={() => history.push("/cliente/novo")}
        >
          Novo Cliente
        </button>
        <button className="btn-page lixo" onClick={handleExcluirTodos}>
          Excluir Todos
        </button>

        <div className="tb-cnt">{tableData}</div>
        {cliente.totalPages > 1 ? (
          <div className="page-control">
            <button
              className="btn-page"
              onClick={() => requestPage(cliente.pageable.pageNumber - 1)}
            >
              {"<"}
            </button>
            <span>
              Página{" "}
              {cliente.totalPages > 0 ? cliente.pageable.pageNumber + 1 : 0} de{" "}
              {cliente.totalPages}
            </span>
            <button
              className="btn-page"
              onClick={() => requestPage(cliente.pageable.pageNumber + 1)}
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

export default ClienteList;
