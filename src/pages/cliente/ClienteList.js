import LoadingScreen from "components/loader/Loading";
import SkeletonLoader from "components/loader/SkeletonLoader";
import Menu from "components/menu/menu";
import { doGetClientes } from "connection/clienteReq";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

const ClienteList = (props) => {
  const { termoDePesquisa, setTermoDePesquisa } = props;
  const loadingProdutos = new Array(10);
  const history = useHistory();
  const localDoArquivo = "pages/cliente/ClienteList.js";
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setLoading(true);
    doGetClientes(termoDePesquisa, setClientes, localDoArquivo).then(() => {
      setLoading(false);
    });
  }, [termoDePesquisa]);

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInputChange = async (event) => {
    setTermoDePesquisa(event.target.value);
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
          <DebounceInput
            type="text"
            value={termoDePesquisa}
            debounceTimeout={500}
            autoComplete="off"
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
              {clientes.length === 0 ? (
                <p>Nada encontrado!</p>
              ) : (
                clientes
                  .sort((a, b) => (a.nomeDoCliente > b.nomeDoCliente ? 1 : -1))
                  .map((row, i) => {
                    return (
                      <div
                        className="tb"
                        key={i}
                        onClick={() =>
                          history.push(`/cliente/editar/${row._id}`)
                        }
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
