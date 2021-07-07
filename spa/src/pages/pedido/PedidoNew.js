import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tempAlert from "components/alert/Alert";
import Menu from "components/menu/menu";
import { Typeahead } from "react-bootstrap-typeahead";
import InputMask from "react-input-mask";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Pedido.css";
import ButtonForm from "components/button/ButtonForm";
import AddItem from "components/item/AddItem";
import LoadingScreen from "components/loader/Loading";

const PedidoNew = () => {
  const history = useHistory();
  const [clientes, setClientes] = useState([{}]);
  const [pedido, setPedido] = useState({
    nomeDoCliente: "",
    valorTotal: 0,
    clienteId: 0,
    situaçãoPedido: "Aberto",
    dataEntrega: "",
  });
  const [productList, setProductList] = useState([{}]);
  const [addModal, setAddModal] = useState(false);

  const doGetClientes = async () => {
    const response = await axios.get(`/api/cliente`);
    setClientes(response.data.content);
  };

  useEffect(() => {
    doGetClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doPost = async () => {
    await axios.post("/api/pedido", pedido);
    tempAlert(`Pedido adicionado com sucesso!`, 5000);
    history.push("/pedido");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoPedido = { ...pedido, [event.target.name]: event.target.value };
    setPedido(novoPedido);
  };

  const handleChangeTh = (event) => {
    const novoPedido = { ...pedido, clienteId: event[0].id };
    setPedido(novoPedido);
  };

  const productListData =
    productList.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      productList.map((row) => {
        return (
          <div
            className="pd-tb"
            key={row.id}
            // onClick={() => history.push(`/produto/editar/${row.id}`)}
          >
            <div className="pd-tb-name">
              <p>18</p>
              <p>Coxinha de morango</p>
              <span>(3.20)</span>
            </div>
            <div className="pd-tb-price">
              <p>R$ 57.60</p>
            </div>
          </div>
        );
      })
    );

  return (
    <>
      <LoadingScreen></LoadingScreen>
      <Menu ativo="pedido"></Menu>
      <AddItem
        estadoDoModal={addModal}
        setEstadoDoModal={setAddModal}
        pedido={pedido}
        setPedido={setPedido}
      ></AddItem>
      <div className="container">
        <h3 className="pg-title">Cadastro de Pedido</h3>
        <form onSubmit={handleSubmit} className="pg-form">
          <div>
            Nome Do Cliente
            <Typeahead
              id="select-nome-cliente"
              name="nomeDoCliente"
              className="th-input"
              required
              autoFocus
              minLength={1}
              // @ts-ignore
              labelKey="nomeDoCliente"
              options={clientes}
              onChange={handleChangeTh}
              placeholder="Digite o nome do cliente"
            />
          </div>
          <div>
            Data e Hora de Entrega
            <InputMask
              mask="99/99/9999  99:99"
              placeholder="__/__/____ __:__"
              onChange={handleChange}
              required
              type="text"
              name="dataEntrega"
              className="pg-input"
            ></InputMask>
          </div>
          <div className="lp-container">
            Lista de Produtos
            <div className="pn-itens">{productListData}</div>
            <div className="lp-buttons">
              <button onClick={() => setAddModal(!addModal)} type="button">
                Adicionar item
              </button>
              <button>Excluir item</button>
            </div>
          </div>
          <ButtonForm exitPath="/pedido"></ButtonForm>
        </form>
      </div>
    </>
  );
};

export default PedidoNew;
