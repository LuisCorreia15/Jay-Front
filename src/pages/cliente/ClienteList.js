import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import SkeletonLoader from "components/loader/SkeletonLoader";

const ClienteList = (props) => {
  const conexao = axios.create({ baseURL: process.env.REACT_APP_PORT });
  const { termoDePesquisa, setTermoDePesquisa } = props;
  const loadingProdutos = new Array(10);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    doGetCliente(termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termoDePesquisa]);

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    doGetCliente(termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doGetCliente = async (termoDePesquisa) => {
    setLoading(true);
    const response = await conexao.get(
      `/cliente/?nomeDoCliente=${termoDePesquisa}`
    );
    setCliente(response.data);
    setLoading(false);
  };

  const handleSearchInputChange = async (event) => {
    setTermoDePesquisa(event.target.value);
    console.log(termoDePesquisa);
  };

  function keydownHandler(e) {
    if (e.keyCode === 115) {
      history.push("/cliente/novo");
    }
  }

  return (
    <>
      <LoadingScreen />
      <Menu ativo="cliente" />
      <div className="container">
        <form className="pd campo-busca">
          <input
            type="text"
            value={termoDePesquisa}
            placeholder="O que deseja buscar?"
            autoFocus
            onChange={handleSearchInputChange}
          />
        </form>

        <button
          className="btn-page novo"
          onClick={() => history.push("/cliente/novo")}
        >
          Novo Cliente (F4)
        </button>

        <div className="tb-cnt">
          {loading ? (
            loadingProdutos.fill(10).map((row, i) => {
              return <SkeletonLoader key={i} onLoad={() => console.log(i)} />;
            })
          ) : (
            <div>
              {cliente.length === 0 ? (
                <p>Nada encontrado!</p>
              ) : (
                cliente.map((row, i) => {
                  return (
                    <div
                      className="tb"
                      key={i}
                      onClick={() => history.push(`/cliente/editar/${row._id}`)}
                    >
                      <div className="tb-title">
                        <p>{row.celular}</p>
                        <h2>{row.nomeDoCliente}</h2>
                      </div>
                      <div className="tb-price">
                        <h2>{row.logradouro}</h2>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClienteList;
