import React from "react";
import Menu from "components/menu/menu";
import ButtonBack from "components/button/ButtonBack";
import LoadingScreen from "components/loader/Loading";
import ctr_01 from "img/Question004/ctr_01.jpeg";
import ctr_02 from "img/Question004/ctr_02.jpeg";
import ctr_03 from "img/Question004/ctr_03.jpeg";
import ctr_04 from "img/Question004/ctr_04.jpeg";
import ctr_05 from "img/Question004/ctr_05.jpeg";
import ctr_06 from "img/Question004/ctr_06.jpeg";
import ctr_07 from "img/Question004/ctr_07.jpeg";
import ctr_08 from "img/Question004/ctr_08.jpeg";

const Question004 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo=""></Menu>
      <div className="container">
        <ButtonBack></ButtonBack>
        <div className="q-title">
          <h1>Como fazer um contrato?</h1>
        </div>

        <div className="q-passo">
          <h1>1. Transformar o pedido em contrato</h1>
          <p>Clique para transformar o pedido em contrato</p>
          <img src={ctr_01} alt="" />
          <img src={ctr_02} alt="" />
          <p>Ir para abas de contratos</p>
          <img src={ctr_03} alt="" />
          <p>Copie o codigo do contrato gerado</p>
          <img src={ctr_04} alt="" />
          <p>Vá para aba de relatórios</p>
          <img src={ctr_05} alt="" />
          <p>
            Selecione contratos e clique em video e cole o codigo copiado no
            campo
          </p>
          <img src={ctr_06} alt="" />
          <p>Clique para imprimir e salve o arquivo na pasta</p>
          <img src={ctr_07} alt="" />
          <p>O arquivo será salvo na pasta documentos com nome "report"</p>
          <img src={ctr_08} alt="" />
        </div>
      </div>
    </>
  );
};

export default Question004;
