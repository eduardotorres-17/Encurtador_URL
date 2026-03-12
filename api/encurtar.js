import { connectToDatabase } from "./_db.js";
import Link from "./model.js";
import { nanoid } from "nanoid";
import validUrl from "valid-url";

export default async function handler(req, res) {

  await connectToDatabase();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  const { url } = req.body;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({
      error: "URL inválida. Certifique-se de incluir http:// ou https://",
    });
  }

  try {
    const code = nanoid(6);

    const novoLink = await Link.create({
      originalUrl: url,
      code: code,
    });

    return res.status(201).json({
      message: "Link encurtado com sucesso!",
      originalUrl: novoLink.originalUrl,
      code: novoLink.code,
      shortUrl: `${process.env.VERCEL_URL || "http://localhost:3000"}/${code}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno ao encurtar link." });
  }
}
