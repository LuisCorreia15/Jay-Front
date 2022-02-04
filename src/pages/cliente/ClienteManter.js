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
          />
        </Route>
        <Route path="/cliente/novo" component={ClienteNew} />
        <Route path="/cliente/editar/:idDoCliente" component={ClienteEdit} />
      </Switch>
    </>
  );
};

export default ClienteManter;
