import api from "./index";
import tempAlert from "components/alert/Alert";

export const criarNovoPedido = async (novoPedido, localDoArquivo) => {
  return await api
    .post(`/pedido`, novoPedido)
    .then(() => {
      tempAlert(`Pedido feito com sucesso!`);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => criarNovoPedido()`
      )
    );
};
