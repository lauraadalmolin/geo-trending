// Handler da rota: quando chamar localhost:3000/forward-geocoding
// essa função será executada
export default async function handler(req, res) {
  // Pega o parâmetro search da query
  const search = req.query.search;

  // Monta a URL do request
  const url = assembleUrl(search);

  // Faz a chamada da API e armazena em apiRes
  const apiRes = await fetch(url);

  // Faz um parse da resposta para json
  const response = await apiRes.json();
  
  // Retorna o json da resposta para o front-end
  res.status(200).json(response);
}

// Função para montar a URL do request
const assembleUrl = (query) => {
  let url = 'http://api.positionstack.com/v1/forward?';
  url += `access_key=${process.env.POSITION_STACK_API_KEY}`;
  url += `&query=${query}&limit=1`;
  return url;
}
