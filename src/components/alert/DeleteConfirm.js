import React from "react";
import "./DeleteConfirm.css";

const DeleteConfirm = (props) => {
  const { setMostrarConfirmacao, handleExcluir, id, nome } = props;

  return (
    <>
      <div className="confirm" id="box">
        <div className="al-container">
          <div className="al-title">
            Deseja realmente excluir <span>{nome}</span>?
          </div>
          <div className="al-buttons">
            <button
              className="cnf"
              onClick={() => {
                handleExcluir(id, nome);
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
