import config from '../../config.json';

export default async function handler(req, res) {
  const search = req.query.search;
  const url = assembleUrl(search);
  const apiRes = await fetch(url);
  const response = await apiRes.json();
  
  res.status(200).json(response);
}

const assembleUrl = (query) => {
  let url = `${config.positionStackBaseURL}/forward?`;
  url += `access_key=${config.positionStackAPIKey}`;
  url += `&query=${query}&limit=1`;
  return url;
}
