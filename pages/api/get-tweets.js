import config from '../../config.json';

// Handler da rota: quando chamar localhost:3000/get-tweets
// essa função será executada
export default async function handler(req, res) {
  // Recupera os parâmetros lat e long da query
  const { lat, long } = req.query;

  // Monta a URL do request
  const url = assembleUrl(lat, long);

  // Faz a requisição passando também o bearer token através dos headers
  // armazena a resposta em apiRes
  const apiRes = await fetch(url, {
    headers: { Authorization: 'Bearer ' + config.twitterBearerToken },
  });

  // Faz um parse da resposta para json
  const response = await apiRes.json();

  // Retorna o json da resposta para o front-end
  res.status(200).json(response);
}

//essa função é responsavel por montar a URL com as informações corretas
const assembleUrl = (lat, long) => {
  let url = `https://api.twitter.com/1.1/search/tweets.json?`
  url += `geocode=${lat},${long},25mi`;
  console.log(url);
  return url;
};
