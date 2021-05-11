import ProdutoManter from "pages/produto/ProdutoManter";
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import InspecaoManter from "./pages/inspecao/InspecaoManter";
import LandingPage from "./pages/landing/LadingPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage></LandingPage>
            </Route>            
            <Route path="/inspecao" component={InspecaoManter}></Route>
            <Route path="/produto" component={ProdutoManter}></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
