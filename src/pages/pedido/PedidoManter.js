import React, { useState } from "react";
import { Route, Switch } from "react-router";
import PedidoEdit from "./PedidoEdit";
import PedidoList from "./PedidoList";
import PedidoNew from "./PedidoNew";

const PedidoManter = () => {
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  return (
    <>
      <Switch>
        <Route exact path="/pedido">
          <PedidoList
            statusPesquisa={statusPesquisa}
            setStatusPesquisa={setStatusPesquisa}
          ></PedidoList>
        </Route>
        <Route path="/pedido/novo" component={PedidoNew}></Route>
        <Route
          path="/pedido/editar/:idParaEditar"
          component={PedidoEdit}
        ></Route>
      </Switch>
    </>
  );
};

export default PedidoManter;
