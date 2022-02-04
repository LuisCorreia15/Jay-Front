import React from "react";
import "./DeleteConfirm.css";

const DeleteConfirm = (props) => {
  const {
    setMostrarConfirmacao,
    handleExcluirProdutos,
    idDoProduto,
    nomeDoProduto,
  } = props;

  return (
    <>
      <div className="confirm" idDoProduto="box">
        <div className="al-container">
          <div className="al-title">
            Deseja realmente excluir <span>{nomeDoProduto}</span>?
          </div>
          <div className="al-buttons">
            <button
              className="cnf"
              onClick={() => {
                handleExcluirProdutos(idDoProduto, nomeDoProduto);
              }}
            >
              Confirmar
            </button>
            <button
              className="can"
              onClick={() => {
                setMostrarConfirmacao(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
