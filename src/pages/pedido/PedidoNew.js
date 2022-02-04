import ButtonForm from "components/button/ButtonForm";
import AddItem from "components/item/AddItem";
import LoadingScreen from "components/loader/Loading";
import Menu from "components/menu/menu";
import { buscarTodosClientes } from "connection/clienteReq";
import { criarNovoPedido } from "connection/pedidoReq";
import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import InputMask from "react-input-mask";
import { useHistory } from "react-router-dom";
import { procurarPosicaoPeloId, getDataAtualFormatada } from "lib/functions";
import "./Pedido.css";

const PedidoNew = () => {
  const history = useHistory();
  const localDoArquivo = "/pages/pedido/PedidoNew.js";
  const [clientes, setClientes] = useState([{}]);
  const [pedido, setPedido] = useState({
    nomeDoCliente: "",
    valorTotal: 0,
    clienteId: 0,
    situaçãoPedido: "Aberto",
    enderecoDeEntrega: "",
    dataEntrega: "",
  });
  const [productList, setProductList] = useState([{}]);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    buscarTodosClientes("", setClientes, localDoArquivo);
    setProductList([{}]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await criarNovoPedido(pedido, localDoArquivo);
    history.push("/pedido");
  };

  const handleChange = (event) => {
    const novoPedido = { ...pedido, [event.target.name]: event.target.value };
    console.log(event.target.value);
    setPedido(novoPedido);
  };

  const handleChangeTh = (event) => {
    const novoPedido = {
      ...pedido,
      clienteId: event[0] ? event[0].id : "",
      enderecoDeEntrega: event[0]
        ? clientes[procurarPosicaoPeloId(clientes, event[0].id)].logradouro
        : "",
    };
    setPedido(novoPedido);
  };

  const productListData =
    productList.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      productList.map((row, i) => {
        return (
          <div
            className="pd-tb"
            key={i}
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
      <LoadingScreen />
      <Menu ativo="pedido" />
      {/* <AddItem
        estadoDoModal={addModal}
        setEstadoDoModal={setAddModal}
        pedido={pedido}
        setPedido={setPedido}
      /> */}
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
            Endereço de Entrega
            <input
              type="text"
              name="enderecoDeEntrega"
              className="pg-input"
              placeholder="Digite o endereço de entrega"
              required
              onChange={handleChange}
              value={pedido.enderecoDeEntrega}
            />
          </div>
          <div>
            Data e Hora de Entrega
            <InputMask
              mask="99/99/9999  99:99"
              placeholder="__/__/____ __:__"
              onChange={handleChange}
              // PROBLEMA ESTÁ NESSE INPUT!
              required
              type="text"
              name="dataEntrega"
              className="pg-input"
              value={
                pedido.dataEntrega
                  ? pedido.dataEntrega
                  : getDataAtualFormatada()
              }
            />
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
          <ButtonForm exitPath="/pedido" />
        </form>
      </div>
    </>
  );
};

export default PedidoNew;
