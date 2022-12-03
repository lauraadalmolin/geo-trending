export default function handler(req, res) {
  const url = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}`;
  // Retorna o json da resposta para o front-end
  res.status(200).json({ url });
}
