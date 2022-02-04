import api from "./index";

export const doGetClientes = async (
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
          `Local: ${localDoArquivo} => doGetClientes()`
      )
    );
};
