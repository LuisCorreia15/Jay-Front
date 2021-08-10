import React from "react";
import Menu from "components/menu/menu";
import { Topper } from "components/topper/Topper";
import LoadingScreen from "components/loader/Loading";
import ButtonBack from "components/button/ButtonBack";
import pdv_open from "img/pdv_open.jpeg";
import pdv_login from "img/pdv_login.jpeg";
import pdv_entrada from "img/pdv_entrada.jpeg";
import pdv_createVenda from "img/pdv_createVenda.jpeg";
import pdv_venda from "img/pdv_venda.jpeg";
import pdv_produtos from "img/pdv_produtos.jpeg";
import pdv_produtoValue from "img/pdv_produtoValue.jpeg";
import pdv_produtoEdit from "img/pdv_produtoEdit.jpeg";
import pdv_finalizando from "img/pdv_finalizando.jpeg";
import pdv_nota from "img/pdv_nota.jpeg";
import pdv_dav from "img/pdv_dav.jpeg";

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
        </div>
        <div className="q-passo">
          <h1>3. Adicionando Produto a venda</h1>
          <p>Para adicionar um item na venda clique aqui ou aperte "F2"</p>
          <img src={pdv_venda} alt="" />
          <p>Digite o nome do produto, selecione ele e aperte "Enter"</p>
          <img src={pdv_produtos} alt="" />
          <p>
            Aperte o "9" do lado direito do teclado, depois "Enter" e digite a
            quantidade que você deseja e clique em "Confirmar"
          </p>
          <img src={pdv_produtoValue} alt="" />
        </div>
        <div className="q-passo">
          <h1>4. Editando Produto a venda</h1>
          <p>Para editar um item basta clicar duas vezes nele</p>
          <img src={pdv_produtoEdit} alt="" />
        </div>
        <div className="q-passo">
          <h1>5. Finalizando a venda</h1>
          <p>
            Aperte "F8" para finalizar a venda, depois aperte "F3" para cartão
            ou "F4" no dinheiro
          </p>
          <p>
            Caso o cliente peça no cartão, basta selecionar credito ou debito e
            aperta enter
          </p>
          <img src={pdv_finalizando} alt="" />
          <p>Caso o cliente não peça nota fiscal é so clicar "não"</p>
          <img src={pdv_nota} alt="" />
          <p>So clicar "não" denovo</p>
          <img src={pdv_dav} alt="" />
          <h1>PRONTO! VENDA FINALIZADA!</h1>
        </div>
      </div>
    </>
  );
};

export default Question002;
