import React from "react";
import { useHistory } from "react-router-dom";
import Menu from "../menu/menu";
import "./landing.css";

export const LandingPage = () => {
    const history = useHistory();
  return (
    <div>
      <Menu></Menu>
      <h2 className="h2-lnd">Olá, meu nome é</h2>
      <h1 className="h1-lnd">
        Jay
      </h1>
    </div>
  );
};

export default LandingPage;
