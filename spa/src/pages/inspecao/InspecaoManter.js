import React, { useState } from "react";
import { Route, Switch } from "react-router";
import InspecaoEdit from "./InspecaoEdit";
import InspecaoList from "./InspecaoList";
import InspecaoNew from "./InspecaoNew";

const InspecaoManter = () => {
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  return (
    <>
      <Switch>
        <Route exact path="/inspecao">
          <InspecaoList
            statusPesquisa={statusPesquisa}
            setStatusPesquisa={setStatusPesquisa}
          ></InspecaoList>
        </Route>
        <Route path="/inspecao/novo" component={InspecaoNew}></Route>
        <Route
          path="/inspecao/editar/:idParaEditar"
          component={InspecaoEdit}
        ></Route>
      </Switch>
    </>
  );
};

export default InspecaoManter;
