// @ts-nocheck
import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import ButtonBack from "components/button/ButtonBack";
import pdv_open from "img/pdv_open.jpeg";
import pdv_login from "img/pdv_login.jpeg";
import pdv_entrada from "img/pdv_entrada.jpeg";
import pdv_createVenda from "img/pdv_createVenda.jpeg";
import pdv_venda from "img/pdv_venda.jpeg";
import pdv_produtos from "img/pdv_produtos.jpeg";
import { Topper } from "components/topper/Topper";

const Question002 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo=""></Menu>
      <Topper></Topper>
      <div className="container">
        <ButtonBack></ButtonBack>
        <div className="q-title">
          <h1>Como fazer uma venda?</h1>
        </div>
        <div className="q-passo">
          <h1>1. Abrir o PDV</h1>
          <p>Acesse pelo icone no menu iniciar</p>
          <img src={pdv_open} alt="" />
          <p>Faça o login no sistema</p>
          <img src={pdv_login} alt="" />
          <p>Ao entrar, aperte "seta para baixo" e depois "Enter"</p>
          <img src={pdv_entrada} alt="" />
        </div>
        <div className="q-passo">
          <h1>2. Criando uma venda</h1>
          <p>Clique aqui pra criar uma venda ou aperte "F5"</p>
          <img src={pdv_createVenda} alt="" />
          <p>Para adicionar um item na venda clique aqui ou aperte "F2"</p>
          <img src={pdv_venda} alt="" />
          <p>Digite o nome do produto que deseja procurar e aperte "Enter"</p>
          <img src={pdv_produtos} alt="" />
        </div>
      </div>
    </>
  );
};

export default Question002;
