import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import "./Question.css";

const Question001 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo=""></Menu>
      <div className="container">
        <div className="q-title">
          <h1>Como fazer um orçamento?</h1>
        </div>
      </div>
    </>
  );
};

export default Question001;
