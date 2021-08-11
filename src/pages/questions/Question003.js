import React from "react";
import Menu from "components/menu/menu";
import ButtonBack from "components/button/ButtonBack";
import LoadingScreen from "components/loader/Loading";
import ge_cliente from "img/Question003/ge_cliente.jpeg";
import ge_cadastro from "img/Question003/ge_cadastro.jpeg";
import ge_dados from "img/Question003/ge_dados.jpeg";
import ge_login from "img/Question003/ge_login.png";
import ge_dadosC from "img/Question003/ge_dadosC.jpeg";

const Question003 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo=""></Menu>
      <div className="container">
        <ButtonBack></ButtonBack>
        <div className="q-title">
          <h1>Como adicionar um cliente?</h1>
        </div>
        <div className="q-passo">
          <h1>1. Entrar no sistema Solução Empresarial</h1>
          <p>Usuário: lorena</p>
          <p>Senha: chocolate</p>
          <img src={ge_login} alt="" />
        </div>
        <div className="q-passo">
          <h1>2. Adicionar cliente</h1>
          <p>Clique na aba de cadastros e depois clientes</p>
          <img src={ge_cliente} alt="" />
          <p>
            Clique no papelzinho (ou aperte "F7") para criar novo cliente e
            depois "Avançar"
          </p>
          <img src={ge_cadastro} alt="" />
          <p>
            Insira os dados indicados em vermelho e clique na aba "Dados
            Complementares"
          </p>
          <img src={ge_dados} alt="" />
          <p>
            Insira os dados indicados em vermelho e clique no simbolo da NIKE
            para salvar
          </p>
          <img src={ge_dadosC} alt="" />
        </div>
      </div>
    </>
  );
};

export default Question003;
