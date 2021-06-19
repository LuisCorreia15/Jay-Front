import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = (props) => {
  const { ativo } = props;
  useEffect(() => {
    if (ativo) {
      document.getElementById(ativo).style.color = "#555";
      document.getElementById(ativo).style.fontWeight = "500";
    }
  }, []);

  return (
    <div className="menu-container">
      <div>
        <h1 className="h1-menu">Jay</h1>
      </div>
      <ul className="nav">
        <Link to="/" id="home">
          <li>Home</li>
        </Link>
        <Link to="/produto" id="produto">
          <li>Produtos</li>
        </Link>
        <Link to="/pedido" id="pedido">
          <li>Pedidos</li>
        </Link>
        <Link to="/inspecao" id="inspecao">
          <li>Inspeção</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
