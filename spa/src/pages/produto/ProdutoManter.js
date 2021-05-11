import React, { useState } from "react";
import { Route, Switch } from "react-router";
import ProdutoEdit from "./ProdutoEdit";
import ProdutoList from "./ProdutoList";
import ProdutoNew from "./ProdutoNew";

const ProdutoManter = () => {
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  return (
    <>
      <Switch>
        <Route exact path="/produto">
          <ProdutoList
            statusPesquisa={statusPesquisa}
            setStatusPesquisa={setStatusPesquisa}
          ></ProdutoList>
        </Route>
        <Route path="/produto/novo" component={ProdutoNew}></Route>
        <Route
          path="/produto/editar/:idParaEditar"
          component={ProdutoEdit}
        ></Route>
      </Switch>
    </>
  );
};

export default ProdutoManter;
