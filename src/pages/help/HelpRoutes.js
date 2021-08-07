import HelpPage from "pages/help/HelpPage";
import Question001 from "pages/questions/Question001";
import Question002 from "pages/questions/Question002";
import Question003 from "pages/questions/Question003";
import Question004 from "pages/questions/Question004";
import Question005 from "pages/questions/Question005";
import Question006 from "pages/questions/Question006";
import Question007 from "pages/questions/Question007";
import Question008 from "pages/questions/Question008";
import Question009 from "pages/questions/Question009";
import React from "react";
import { Route, Switch } from "react-router";

const HelpRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/help">
          <HelpPage></HelpPage>
        </Route>
        <Route path="/help/question/001" component={Question001}></Route>
        <Route path="/help/question/002" component={Question002}></Route>
        <Route path="/help/question/003" component={Question003}></Route>
        <Route path="/help/question/004" component={Question004}></Route>
        <Route path="/help/question/005" component={Question005}></Route>
        <Route path="/help/question/006" component={Question006}></Route>
        <Route path="/help/question/007" component={Question007}></Route>
        <Route path="/help/question/008" component={Question008}></Route>
        <Route path="/help/question/009" component={Question009}></Route>
      </Switch>
    </>
  );
};

export default HelpRoutes;
