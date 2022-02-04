import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";

const Question007 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="help"></Menu>
      <div className="container">
        <div className="q-passo">
          <h1>Em Criação</h1>
        </div>
      </div>
    </>
  );
};

export default Question007;
