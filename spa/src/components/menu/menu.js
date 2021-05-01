import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Menu = () => {
  return (
    <div>
      <div>
        <h1 className="h1-menu">Jay</h1>
      </div>
      <ul className="nav">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/pratos">
          <li>Pratos</li>
        </Link>
        <Link to="/pedidos">
          <li>Pedidos</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
