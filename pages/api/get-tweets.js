import config from '../../config.json';

//nessa função assincrona é feita a requisição, onde o usuario passa as informações
//o metodo de chamada da api e evocado, e se autorizado devolve status 200 de sucesso
//e as informações referentes aos tweets proximos
export default async function handler(req, res) {
  const { lat, long } = req.query;
  const url = assembleUrl(lat, long);
  const apiRes = await fetch(url, {
    headers: { Authorization: 'Bearer ' + config.twitterBearerToken },
  });
  const response = await apiRes.json();

  res.status(200).json(response);
}

//essa função é responsavel por passar as informações da api, passando o endereço da url
//limitando a 10 tweets e passando as informações de latitude e longitude de acordo com
//a localização desejada
const assembleUrl = (lat, long) => {
  let url = `https://api.twitter.com/1.1/search/tweets.json?`
  url += `count=10&`
  url += `geocode=${lat},${long},25mi`;
  console.log(url);
  return url;
};
