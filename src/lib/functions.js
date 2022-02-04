export const procurarPosicaoPeloId = (array, idDoObjeto) => {
  let res = array.find((o) => o.id === idDoObjeto);
  let res2 = array.indexOf(res);
  return res2;
};

export const getDataAtualFormatada = () => {
  const dataAtual = formatarData(new Date());
  return padronizarData(dataAtual);
};

const formatarData = (data) => {
  const date = ("0" + data.getDate()).slice(-2);
  const month = ("0" + (data.getMonth() + 1)).slice(-2);
  const year = data.getFullYear();
  const hoursAndMinutes =
    (data.getHours() < 10 ? "0" : "") +
    data.getHours() +
    ":" +
    (data.getMinutes() < 10 ? "0" : "") +
    data.getMinutes();
  return `${month}/${date}/${year} ${hoursAndMinutes}`;
};

const padronizarData = (data) => {
  const diaMesAno = data.slice(0, 10).toString();
  const dia = diaMesAno.slice(0, 2);
  const mes = diaMesAno.slice(3, 5);
  const ano = diaMesAno.slice(6, 10);
  const mesDiaAno = `${mes}/${dia}/${ano}`;

  return mesDiaAno;
};
