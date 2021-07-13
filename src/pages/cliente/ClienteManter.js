import React, { useState } from "react";
import { Route, Switch } from "react-router";
import ClienteEdit from "./ClienteEdit";
import ClienteList from "./ClienteList";
import ClienteNew from "./ClienteNew";

const ClienteManter = () => {
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  return (
    <>
      <Switch>
        <Route exact path="/cliente">
          <ClienteList
            statusPesquisa={statusPesquisa}
            setStatusPesquisa={setStatusPesquisa}
          ></ClienteList>
        </Route>
        <Route path="/cliente/novo" component={ClienteNew}></Route>
        <Route
          path="/cliente/editar/:idParaEditar"
          component={ClienteEdit}
        ></Route>
      </Switch>
    </>
  );
};

export default ClienteManter;
