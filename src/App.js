import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import InspecaoManter from "./pages/inspecao/InspecaoManter";
import PedidoManter from "pages/pedido/PedidoManter";
import ProdutoManter from "pages/produto/ProdutoManter";
import LandingPage from "./pages/landing/LadingPage";
import ClienteManter from "pages/cliente/ClienteManter";
import HelpRoutes from "pages/help/HelpRoutes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/inspecao" component={InspecaoManter} />
            <Route path="/produto" component={ProdutoManter} />
            <Route path="/pedido" component={PedidoManter} />
            <Route path="/cliente" component={ClienteManter} />
            <Route path="/help" component={HelpRoutes} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
