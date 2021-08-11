import React from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import back from "img/Icons/back.png";
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
