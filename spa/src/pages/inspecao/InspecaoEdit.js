/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../../components/alert/Alert";

const InspecaoEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [Inspecao, setInspecao] = useState({
    nomeDoCliente: "",
    lancadoEm: new Date(),
    valorTotal: 0.0,
  });


  const doGetById = async () => {
    const response = await axios.get(`/api/inspecao/${idParaEditar}`, Inspecao);
    setInspecao(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doPut = async () => {
    await axios.put(`/api/inspecao/${idParaEditar}`, Inspecao);
    tempAlert(`${Inspecao.nomeDoCliente} alterado com sucesso!`, 5000);
    history.push("/inspecao");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novoInspecao = { ...Inspecao, [event.target.name]: event.target.value };
    setInspecao(novoInspecao);
  };

  return (
    <div>
      <h2>Edição de Inspecao</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Nome Do Cliente
          <input
            type="text"
            name="nomeDoCliente"
            required
            onChange={handleChange}
            value={Inspecao.nomeDoCliente}
          ></input>
        </div>
        <div>
          Lançado em
          <input
            type="date"
            name="lancadoEm"
            required
            onChange={handleChange}
            value={Inspecao.lancadoEm}
          ></input>
        </div>
        <div>
          Valor Total
          <input
            type="text"
            name="valorTotal"
            required
            onChange={handleChange}
            value={Inspecao.valorTotal}
          ></input>
        </div>
        <button className="btn">Enviar</button>
        <button className="btn-cancel" onClick={() => history.push("/Inspecao")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default InspecaoEdit;
