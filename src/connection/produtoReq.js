import api from "./index";
import tempAlert from "components/alert/Alert";

export const doGetProduto = async (
  termoDePesquisa,
  tipoDosProdutos,
  setProduto,
  setLoading,
  localDoArquivo
) => {
  return await api
    .get(
      `/produto/?nomeDoProduto=${termoDePesquisa}&tipoDoProduto=${tipoDosProdutos}`
    )
    .then((res) => {
      setProduto(res.data.produtos);
      setLoading(false);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doGetProduto()`
      )
    );
};

export const doGetProdutoById = async (
  idDoProduto,
  setProduto,
  localDoArquivo
) => {
  return await api
    .get(`/produto/${idDoProduto}`)
    .then((res) => {
      setProduto(res.data.produto);
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doGetProdutoById()`
      )
    );
};

export const doPutProduto = async (
  idDoProduto,
  produto,
  history,
  localDoArquivo
) => {
  return await api
    .put(`/produto/${idDoProduto}`, produto)
    .then(() => {
      tempAlert(`${produto.nomeDoProduto} alterado com sucesso!`, 5000);
      history.push("/produto");
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doPutProduto()`
      )
    );
};

export const doExcluirProduto = async (
  idDoProduto,
  nomeDoProduto,
  history,
  localDoArquivo
) => {
  return await api
    .delete(`/produto/${idDoProduto}`)
    .then(() => {
      tempAlert(nomeDoProduto + " excluído!", 5000);
      history.push("/produto");
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doExcluirProduto()`
      )
    );
};

export const doPostNovoProduto = async (
  novoProduto,
  history,
  localDoArquivo
) => {
  return await api
    .post(`/produto`, novoProduto)
    .then(() => {
      tempAlert(`Produto adicionado com sucesso!`, 5000);
      history.push("/produto");
    })
    .catch((error) =>
      console.log(
        "Error: " +
          error.message +
          "\n" +
          `Local: ${localDoArquivo} => doPostNovoProduto()`
      )
    );
};
