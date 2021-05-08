import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  return (
    <div className="menu-container">
      <div>
        <h1 className="h1-menu">Jay</h1>
      </div>
      <ul className="nav">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/pratos">
          <li>Produtos</li>
        </Link>
        <Link to="/pedidos">
          <li>Inspeção</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
