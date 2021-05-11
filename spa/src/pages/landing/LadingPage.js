import React from "react";
import Menu from "../../components/menu/menu";
import "./Landing.css";

export const LandingPage = () => {
  return (
    <>
      <div className="holder">
        <Menu></Menu>
        <div className="text-container">
          <h2 className="h2-lnd">Olá, meu nome é</h2>
          <h1 className="h1-lnd">Jay</h1>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
