import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import "./Landing.css";

export const LandingPage = () => {
  return (
    <>
      <LoadingScreen></LoadingScreen>
      <div className="holder">
        <Menu ativo="home"></Menu>
        <div className="container">
          <div className="text-container">
            <h2 className="h2-lnd">Olá, meu nome é</h2>
            <h1 className="h1-lnd">Jay</h1>
            <p>version 0.15</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
