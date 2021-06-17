import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Menu from "components/menu/menu";
import tempAlert from "components/alert/Alert";

const PedidoList = (props) => {
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [Pedido, setPedido] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  

  const doGetPedido = async (páginaRequerida, termoDePesquisa) => {
    const response = await axios.get(
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

  const doGerarPedido = async () => {
    await axios.post(`/api/pedido/gerar-pedido`);
    tempAlert("10 Pedido gerados!", 5000);
    doGetPedido(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarPedido();
  };

  const doExcluirTodosPedido = async () => {
    await axios.delete(`/api/pedido/excluir-todos`);
    tempAlert("Todos Pedidos excluídos!", 5000);
    doGetPedido(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleExcluirTodos = () => {
    doExcluirTodosPedido();
  };


  const tableData =
    Pedido.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      Pedido.content.map((row) => {
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

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= Pedido.totalPages) {
      requestedPage = Pedido.totalPages - 1;
    }
    doGetPedido(requestedPage, statusPesquisa.termoDePesquisa);
  };

  function keydownHandler(e) {
    if (e.keyCode === 115) {
      history.push("/pedido/novo");
    }
    if (e.keyCode === 27) {
      history.goBack();
    }
  }

  return (
    <>
      <Menu></Menu>
      <div className="container">
        <form className="pd">
          <input
            className="cb"
            type="text"
            value={statusPesquisa.termoDePesquisa}
            placeholder="O que deseja buscar?"
            autoFocus
            onChange={handleSearchInputChange}
          />
          <button className="bb">Pesquisar</button>
        </form>
        <button className="btn-page" onClick={handleGerar}>
          Gerar 10 Pedidos
        </button>
        <button
          className="btn-page novo"
          onClick={() => history.push("/pedido/novo")}
        >
          Novo Pedido
        </button>
        <button className="btn-page lixo" onClick={handleExcluirTodos}>
          Excluir Todos
        </button>

        <div className="tb-cnt">{tableData}</div>
        <div className="page-control">
          <button
            className="btn-page"
            onClick={() => requestPage(Pedido.pageable.pageNumber - 1)}
          >
            {"<"}
          </button>
          <span>
            Página{" "}
            {Pedido.totalPages > 0 ? Pedido.pageable.pageNumber + 1 : 0} de{" "}
            {Pedido.totalPages}
          </span>
          <button
            className="btn-page"
            onClick={() => requestPage(Pedido.pageable.pageNumber + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PedidoList;
