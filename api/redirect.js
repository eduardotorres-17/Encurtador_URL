import { connectToDatabase } from "./_db.js";
import Link from "./model.js";

export default async function handler(req, res) {
  await connectToDatabase();
  const code = req.query.code;

  console.log("👉 Iniciando redirecionamento na Nuvem...");
  console.log("👉 Código extraído pela Vercel:", code);

  if (!code) {
    return res.redirect("/?erro=codigo-vazio");
  }

  try {
    const linkEncontrado = await Link.findOne({ code: code });

    console.log(
      "📦 Achou no Banco de Dados?",
      linkEncontrado ? "SIM!" : "NÃO!",
    );

    if (linkEncontrado) {
      linkEncontrado.clicks += 1;
      await linkEncontrado.save();

      return res.redirect(linkEncontrado.originalUrl);
    } else {
      return res.redirect("/?erro=nao-encontrado");
    }
  } catch (error) {
    console.error("Erro no redirecionamento:", error);
    return res.status(500).json({ error: "Erro interno ao redirecionar" });
  }
}
