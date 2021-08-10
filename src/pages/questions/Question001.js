import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import ButtonBack from "components/button/ButtonBack";
import solucao from "img/solucao.png";
import "./Question.css";

const Question001 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo=""></Menu>
      <div className="container">
        <ButtonBack></ButtonBack>
        <div className="q-title">
          <h1>Como fazer um orçamento?</h1>
        </div>
        <div className="q-passo">
          <h1>1. Verificar a data!</h1>
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
        <div className="q-passo">
          <h1>3. Entrar no sistema Solução Empresarial</h1>
          <p>
            - <img src={solucao} alt="" />
          </p>
          <p>- Usuário: lorena</p>
          <p>- Senha: chocolate</p>
        </div>
        <div className="q-passo">
         
          <h1>Em Criação</h1>
        </div>
      </div>
    </>
  );
};

export default Question001;
