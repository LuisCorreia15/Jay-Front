import React from "react";
import Menu from "components/menu/menu";
import LoadingScreen from "components/loader/Loading";
import { useHistory } from "react-router-dom";
import "./HelpPage.css";

const HelpPage = () => {
  const history = useHistory();

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <div className="holder">
        <Menu ativo="home"></Menu>
        <div className="container">
          <h1>Help Page</h1>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
