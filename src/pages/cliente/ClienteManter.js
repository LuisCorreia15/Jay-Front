import React, { useState } from "react";
import { Route, Switch } from "react-router";
import ClienteEdit from "./ClienteEdit";
import ClienteList from "./ClienteList";
import ClienteNew from "./ClienteNew";

const ClienteManter = () => {
  const [termoDePesquisa, setTermoDePesquisa] = useState("");

  return (
    <>
      <Switch>
        <Route exact path="/cliente">
          <ClienteList
            termoDePesquisa={termoDePesquisa}
            setTermoDePesquisa={setTermoDePesquisa}
          ></ClienteList>
        </Route>
        <Route path="/cliente/novo" component={ClienteNew}></Route>
        <Route path="/cliente/editar/:idParaEditar" component={ClienteEdit} />
      </Switch>
    </>
  );
};

export default ClienteManter;
