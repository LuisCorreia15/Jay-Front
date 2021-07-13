import React from "react";
import { useHistory } from "react-router-dom";
import "./ButtonForm.css";

const ButtonForm = (props) => {
  const { exitPath } = props;
  const history = useHistory();

  return (
    <div className="btn-form">
      <button className="btn-send">Enviar</button>
      <button
        className="btn-cancel"
        onClick={() => history.push(exitPath)}
      >
        Cancelar
      </button>
    </div>
  );
};

export default ButtonForm;
