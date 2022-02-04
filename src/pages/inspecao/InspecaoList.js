import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Menu from "components/menu/menu";
import tempAlert from "components/alert/Alert";
import DeleteConfirm from "components/alert/DeleteConfirm";

const InspecaoList = (props) => {
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [inspecao, setInspecao] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [confirmState, setConfirmState] = useState(false);
  const [tempNome, setTempNome] = useState("");
  const [tempId, setTempId] = useState("");

  const doGetInspecao = async (páginaRequerida, termoDePesquisa) => {
    setInspecao("");
  };

  useEffect(() => {
    doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doExcluirInspecao = async (id, name) => {
    await axios.delete(`/api/inspecao/${id}`);
    if (inspecao.content.length === 1) {
      doGetInspecao(
        statusPesquisa.páginaAtual - 1,
        statusPesquisa.termoDePesquisa
      );
    } else {
      doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    }
    tempAlert("Inspecao de " + name + " excluído!", 5000);
    setConfirmState(false);
  };

  const handleExcluir = (id, name) => {
    setConfirmState(true);
    setTempId(id);
    setTempNome(name);
  };

  const handleSearchInputChange = async (event) => {
    const novoStatusPesquisa = {
      ...statusPesquisa,
      termoDePesquisa: event.target.value,
    };
    setStatusPesquisa(novoStatusPesquisa);
  };

  useEffect(() => {
    doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa]);

  const doGerarInspecao = async () => {
    await axios.post(`/api/inspecao/gerar-inspecao`);
    tempAlert("10 Inspecões geradas!", 5000);
    doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarInspecao();
  };

  const doExcluirTodosInspecao = async () => {
    await axios.delete(`/api/inspecao/excluir-todos`);
    tempAlert("Todas Inspecões excluídas!", 5000);
    doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleExcluirTodos = () => {
    doExcluirTodosInspecao();
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluirPratos={doExcluirInspecao}
        id={tempId}
        nome={tempNome}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const tableData =
    inspecao.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      inspecao.content.map((row) => {
        return (
          <div className="tb" key={row.id}>
            <div className="tb-title">
              <p>{row.id}</p>
              <h2>{row.nomeDoCliente}</h2> <p>{row.lancadoEm}</p>
            </div>
            <div className="tb-price">
              <button
                onClick={() => history.push(`/inspecao/editar/${row.id}`)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="i-lixo"
                onClick={() => handleExcluir(row.id, row.nomeDoCliente)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <h2>R$ {row.valorTotal},00</h2>
            </div>
          </div>
        );
      })
    );

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= inspecao.totalPages) {
      requestedPage = inspecao.totalPages - 1;
    }
    doGetInspecao(requestedPage, statusPesquisa.termoDePesquisa);
  };

  return (
    <>
      <Menu ativo="inspecao"></Menu>
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
          Gerar 10 Inspecões
        </button>
        <button
          className="btn-page novo"
          onClick={() => history.push("/inspecao/novo")}
        >
          Nova Inspecão
        </button>
        <button className="btn-page lixo" onClick={handleExcluirTodos}>
          Excluir Todas
        </button>
        <div className="tb-cnt">{tableData}</div>
        {inspecao.totalPages > 1 ? (
          <div className="page-control">
            <button
              className="btn-page"
              onClick={() => requestPage(inspecao.pageable.pageNumber - 1)}
            >
              {"<"}
            </button>
            <span>
              Página{" "}
              {inspecao.totalPages > 0 ? inspecao.pageable.pageNumber + 1 : 0}{" "}
              de {inspecao.totalPages}
            </span>
            <button
              className="btn-page"
              onClick={() => requestPage(inspecao.pageable.pageNumber + 1)}
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

export default InspecaoList;
