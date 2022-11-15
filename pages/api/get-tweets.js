import config from '../../config.json';

export default async function handler(req, res) {
  const { lat, long } = req.query;
  const url = assembleUrl(lat, long);
  const apiRes = await fetch(url, {
    headers: { Authorization: 'Bearer ' + config.twitterBearerToken },
  });
  const response = await apiRes.json();

  res.status(200).json(response);
}

const assembleUrl = (lat, long) => {
  let url = `https://api.twitter.com/1.1/search/tweets.json?`
  url += `count=10&`
  url += `geocode=${lat},${long},25mi`;
  console.log(url);
  return url;
};
