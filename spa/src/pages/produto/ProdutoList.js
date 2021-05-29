import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Menu from "components/menu/menu";
import tempAlert from "components/alert/Alert";
import DeleteConfirm from "components/alert/DeleteConfirm";

const ProdutoList = (props) => {
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [Produto, setProduto] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [confirmState, setConfirmState] = useState(false);
  const [tempNome, setTempNome] = useState("");
  const [tempId, setTempId] = useState("");

  const doGetProduto = async (páginaRequerida, termoDePesquisa) => {
    const response = await axios.get(
      `/api/produto?termo=${termoDePesquisa}&page=${páginaRequerida}`
    );
    setProduto(response.data);
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    doGetProduto(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
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
    doGetProduto(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa]);

  const doGerarProduto = async () => {
    await axios.post(`/api/produto/gerar-produto`);
    tempAlert("10 Produto gerados!", 5000);
    doGetProduto(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarProduto();
  };

  const doExcluirProduto = async (id, name) => {
    await axios.delete(`/api/produto/${id}`);
    if (Produto.content.length === 1) {
      doGetProduto(
        statusPesquisa.páginaAtual - 1,
        statusPesquisa.termoDePesquisa
      );
    } else {
      doGetProduto(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    }
    tempAlert("Produto de " + name + " excluído!", 5000);
    setConfirmState(false);
  };

  const handleExcluir = (id, name) => {
    setConfirmState(true);
    setTempId(id);
    setTempNome(name);
  };

  const doExcluirTodosProduto = async () => {
    await axios.delete(`/api/produto/excluir-todos`);
    tempAlert("Todos Produtos excluídos!", 5000);
    doGetProduto(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleExcluirTodos = () => {
    doExcluirTodosProduto();
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluirProduto={doExcluirProduto}
        id={tempId}
        nome={tempNome}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const tableData =
    Produto.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      Produto.content.map((row) => {
        return (
          <div
            className="tb"
            key={row.id}
            onClick={() => history.push(`/produto/editar/${row.id}`)}
          >
            <div className="tb-title">
              <h2>{row.nomeDoProduto}</h2>
            </div>
            <div className="tb-price">
              <h2>R$ {row.preco.toFixed(2)}</h2>
            </div>
          </div>
        );
      })
    );

    const pgControl = Produto.totalPages === 0 ? (<div></div>) : ( ()
      
    )

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= Produto.totalPages) {
      requestedPage = Produto.totalPages - 1;
    }
    doGetProduto(requestedPage, statusPesquisa.termoDePesquisa);
  };

  function keydownHandler(e) {
    if (e.keyCode === 115) {
      history.push("/produto/novo");
    }
    if (e.keyCode === 27) {
      history.goBack();
    }
  }

  return (
    <>
      <Menu></Menu>
      <div className="container">
        {renderConfirmDelete()}
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
          Gerar 10 Produtos
        </button>
        <button
          className="btn-page novo"
          onClick={() => history.push("/produto/novo")}
        >
          Novo Produto
        </button>
        <button className="btn-page lixo" onClick={handleExcluirTodos}>
          Excluir Todos
        </button>

        <div className="tb-cnt">{tableData}</div>
        <div className="page-control"> 

        {pgControl}
        </div>
      </div>
    </>
  );
};

export default ProdutoList;
