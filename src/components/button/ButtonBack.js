import React from "react";
import { useHistory } from "react-router-dom";
import back from "img/back.png";
import "./ButtonBack.css";

const ButtonBack = () => {
  const history = useHistory();

  return (
    <div className="q-back">
      <button onClick={() => history.push("/help")}>
        <img src={back} alt="" />
        <p>voltar</p>
      </button>
    </div>
  );
};

export default ButtonBack;
