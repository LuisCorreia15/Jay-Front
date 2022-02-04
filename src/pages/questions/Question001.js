import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import ButtonBack from "components/button/ButtonBack";
import ge_login from "img/Question003/ge_login.png";
import ge_orc from "img/Question001/ge_orc.jpeg";
import ge_orcDados from "img/Question001/ge_orcDados.jpeg";
import ge_orcData from "img/Question001/ge_orcData.jpeg";
import ge_orcItens from "img/Question001/ge_orcItens.jpeg";
import ge_orcLoca from "img/Question001/ge_orcLoca.jpeg";
import ge_orcNovo from "img/Question001/ge_orcNovo.jpeg";
import ge_orcPrint from "img/Question001/ge_orcPrint.jpeg";
import ge_orcProd from "img/Question001/ge_orcProd.jpeg";
import ge_orcSave from "img/Question001/ge_orcSave.jpeg";

import "./Question.css";

const Question001 = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="help"></Menu>
      <div className="container">
        <ButtonBack></ButtonBack>
        <div className="q-title">
          <h1>Como fazer um orçamento?</h1>
        </div>
        <div className="q-passo">
          <h1>1. Verificar a data!</h1>
          <p>Antes de fazer o orçamento, é necessário verificar se a data:</p>
          <p>Não é domingo ou segunda.</p>
          <p>Verificar se não tem muito pedido para o dia já.</p>
        </div>
        <div className="q-passo">
          <h1>2. Verificar possibilidade do pedido!</h1>
          <p>Para o pedido é necessário verificar:</p>
          <p>
            Se é possivel fazer os doces no dia.
            <span>(como cestinha de flores e doces caramelizados...)</span>
          </p>

          <p>Se é possivel fazer decorados se houver.</p>
          <p>
            Se for pouca quantidade cobrar preço da vitrine.
            <span>(2 de cada por exemplo)</span>
          </p>
        </div>
        <div className="q-passo">
          <h1>3. Entrar no sistema Solução Empresarial</h1>
          <p>Usuário: lorena</p>
          <p>Senha: chocolate</p>
          <img src={ge_login} alt="" />
        </div>

        <div className="q-passo">
          <h1>4. Criar orçamento</h1>
          <p>Clique na aba "Movimentações" e depois "Orçamento"</p>
          <img src={ge_orc} alt="" />
          <p>Clique no papelzinho a perte "F7" para criar um novo orçamento </p>
          <img src={ge_orcNovo} alt="" />
          <p>Insira os dados no orçamento:</p>
          <p>
            Nº Orç. Vendedor = (Data de hoje + horas)
            <span>Por exemplo: 11/08/2021 11:30 = 110820211130</span>
          </p>
          <p>
            Para adicionar o nome do cliente clique na caixinha "Código" e
            aperte "F2"
            <a href="/help/question/003">
              (Como adicionar o cliente no Sistema?)
            </a>
          </p>
          <p>Após isso clique em "laçamento de produtos"</p>
          <img src={ge_orcDados} alt="" />
        </div>
        <div className="q-passo">
          <h1>5. Adicionar produtos ao orçamento</h1>
          <p>Clique "Adicionar"</p>
          <img src={ge_orcItens} alt="" />
          <p>Clique no quadrado código e aperte "F2"</p>
          <img src={ge_orcProd} alt="" />
          <p>
            Procure o produto que você deseja adicionar e repita o processo para
            adicionar mais produtos
          </p>
          <img src={ge_orcLoca} alt="" />
        </div>
        <div className="q-passo">
          <h1>6. Finalizar Pedido</h1>
          <p>
            Clique no botão "Observações" no orçamento e adicione a data de
            Entrega do pedido
          </p>
          <img src={ge_orcData} alt="" />
          <p>Clique na impressora para salvar o arquivo</p>
          <img src={ge_orcPrint} alt="" />
          <p>
            Clique nos botões na odem para salvar o orçamento na pasta
            "Documentos"
          </p>
          <img src={ge_orcSave} alt="" />
        </div>
      </div>
    </>
  );
};

export default Question001;
