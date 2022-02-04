import api from "./index";
import tempAlert from "components/alert/Alert";

export const buscarTodosClientes = async (
  termoDePesquisa,
  setClientes,
  localDoArquivo
) => {
  return await api
    .get(`/cliente/?nomeDoCliente=${termoDePesquisa}`)
    .then((res) => {
      setClientes(res.data.clientes);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => buscarTodosClientes()`
      )
    );
};

export const buscarClientePeloId = async (
  idDoCliente,
  setCliente,
  localDoArquivo
) => {
  return await api
    .get(`/cliente/${idDoCliente}`)
    .then((res) => {
      setCliente(res.data.cliente);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doGetClientePorId()`
      )
    );
};

export const deletarClientePeloId = async (
  idDoCliente,
  nomeDoCliente,
  localDoArquivo
) => {
  return await api
    .delete(`/cliente/${idDoCliente}`)
    .then(() => {
      tempAlert(nomeDoCliente + " excluído!");
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doDeleteClientePeloId()`
      )
    );
};

export const editarClientePeloId = async (
  idDoCliente,
  clienteEditada,
  localDoArquivo
) => {
  return await api
    .put(`/cliente/${idDoCliente}`, clienteEditada)
    .then(() => {
      tempAlert(`${clienteEditada.nomeDoCliente} alterado com sucesso!`);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => editarClientePeloId()`
      )
    );
};

export const criarNovoCliente = async (novoCliente, localDoArquivo) => {
  return await api
    .post(`/cliente`, novoCliente)
    .then(() => {
      tempAlert(`${novoCliente.nomeDoCliente} cadastrado com sucesso!`);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => criarNovoCliente()`
      )
    );
};
