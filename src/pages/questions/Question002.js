import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import ButtonBack from "components/button/ButtonBack";

const Question002 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo=""></Menu>
      <div className="container">
        <ButtonBack></ButtonBack>
        <div className="q-title">
          <h1>Como fazer uma venda?</h1>
        </div>
        <div className="q-passo">
          <h1>1. Abrir o PDV</h1>
          <p>Antes de fazer o orçamento, é necessário verificar se a data:</p>
          <p>- Não é domingo ou segunda.</p>
          <p>- Verificar se não tem muito pedido para o dia já.</p>
        </div>
        <div className="q-passo">
          <h1>2. Verificar possibilidade do pedido!</h1>
          <p>Para o pedido é necessário verificar:</p>
          <p>
            - Se é possivel fazer os doces no dia.
            <span>(como cestinha de flores e doces caramelizados...)</span>
          </p>

          <p>- Se é possivel fazer decorados se houver.</p>
          <p>
            - Se for pouca quantidade cobrar preço da vitrine.
            <span>(2 de cada por exemplo)</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Question002;
