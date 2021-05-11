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
  const [Inspecao, setInspecao] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [confirmState, setConfirmState] = useState(false);
  const [tempNome, setTempNome] = useState("");
  const [tempId, setTempId] = useState("");

  const doGetInspecao = async (páginaRequerida, termoDePesquisa) => {
    const response = await axios.get(
      `/api/inspecao?termo=${termoDePesquisa}&page=${páginaRequerida}`
    );
    setInspecao(response.data);
  };

  useEffect(() => {
    doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doExcluirInspecao = async (id, name) => {
    await axios.delete(`/api/inspecao/${id}`);
    if (Inspecao.content.length === 1) {
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
    await axios.post(`/api/Inspecao/gerar-Inspecao`);
    tempAlert("10 Inspecao gerados!", 5000);
    doGetInspecao(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarInspecao();
  };

  const doExcluirTodosInspecao = async () => {
    await axios.delete(`/api/Inspecao/excluir-todos`);
    tempAlert("Todos Inspecao excluídos!", 5000);
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
    Inspecao.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      Inspecao.content.map((row) => {
        return (
          <div className="tb" key={row.id}>
            <div className="tb-title">
              <p>{row.id}</p>
              <h2>{row.nomeDoCliente}</h2> <p>{row.lancadoEm}</p>
            </div>
            <div className="tb-price">
              <button
                onClick={() => history.push(`/Inspecao/editar/${row.id}`)}
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
    if (requestedPage >= Inspecao.totalPages) {
      requestedPage = Inspecao.totalPages - 1;
    }
    doGetInspecao(requestedPage, statusPesquisa.termoDePesquisa);
  };

  return (
    <>
      <Menu></Menu>
      {renderConfirmDelete()}
      <h2>Inspecao Feitos</h2>
      <button className="btn-page" onClick={handleGerar}>
        Gerar Inspecao
      </button>
      <button className="btn-page lixo" onClick={handleExcluirTodos}>
        Excluir Todos
      </button>
      <form className="pd">
        <input
          className="cb"
          type="text"
          value={statusPesquisa.termoDePesquisa}
          placeholder="O que deseja buscar?"
          onChange={handleSearchInputChange}
        />
        <button className="bb">Pesquisar</button>
      </form>
      <div className="tb-cnt">{tableData}</div>
      <button className="btn" onClick={() => history.push("/Inspecao/novo")}>
        Criar Novo Inspecao
      </button>
      <button
        className="btn-page"
        onClick={() => requestPage(Inspecao.pageable.pageNumber - 1)}
      >
        {"<"}
      </button>
      <span>
        Página {Inspecao.totalPages > 0 ? Inspecao.pageable.pageNumber + 1 : 0}{" "}
        de {Inspecao.totalPages}
      </span>
      <button
        className="btn-page"
        onClick={() => requestPage(Inspecao.pageable.pageNumber + 1)}
      >
        {">"}
      </button>
    </>
  );
};

export default InspecaoList;
