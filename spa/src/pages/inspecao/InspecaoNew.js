import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";

/* rafc  - comando para criar um component arrow*/

const InspecaoNew = () => {
  const history = useHistory();
  const [inspecao, setInspecao] = useState({
    nomeDoCliente: "",
    lancadoEm: new Date(),
    valorTotal: 0.0,
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await axios.post("/api/inspecao", inspecao);
    tempAlert(`Inspecao adicionada com sucesso!`, 5000);
    history.push("/inspecao");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoinspecao = {
      ...inspecao,
      [event.target.name]: event.target.value,
    };
    setInspecao(novoinspecao);
  };

  return (
    <div>
      <h3>Cadastro de inspecao</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Nome Do Cliente
          <input
            type="text"
            required
            name="nomeDoCliente"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Lançado em
          <input
            type="date"
            required
            name="lancadoEm"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Valor Total
          <input
            type="text"
            required
            name="valorTotal"
            onChange={handleChange}
          ></input>
        </div>
        <button className="btn">Enviar</button>
        <button
          className="btn-cancel"
          onClick={() => history.push("/inspecaos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default InspecaoNew;
