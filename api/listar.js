import { connectToDatabase } from "./_db.js";
import Link from "./model.js";

export default async function handler(req, res) {
  // 1. Conecta no banco
  await connectToDatabase();

  // 2. Só aceita requisições GET (buscar dados)
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido. Use GET." });
  }

  try {
    // 3. Busca os 10 links mais recentes criados, ordenando pela data (decrescente)
    const links = await Link.find().sort({ createdAt: -1 }).limit(10);

    // 4. Devolve a lista de links
    return res.status(200).json(links);
  } catch (error) {
    console.error("Erro ao buscar links:", error);
    return res.status(500).json({ error: "Erro interno ao buscar os links." });
  }
}
