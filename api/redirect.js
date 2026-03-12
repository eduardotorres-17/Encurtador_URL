import { connectToDatabase } from "./_db.js";
import Link from "./model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  let code = req.query?.code;

  if (!code || code === "") {

    code = req.url.split("?")[0].replace("/", "");
  }

  console.log("👉 URL completa que chegou:", req.url);
  console.log("🎯 Código extraído com sucesso:", code);

  if (!code || code === "") {
    return res.redirect("/?erro=codigo-vazio");
  }

  try {
    const linkEncontrado = await Link.findOne({ code: code });

    console.log("📦 Banco encontrou o link?", linkEncontrado ? "SIM!" : "NÃO");

    if (linkEncontrado) {
      linkEncontrado.clicks += 1;
      await linkEncontrado.save();

      console.log(`🚀 Teleportando para: ${linkEncontrado.originalUrl}`);
      return res.redirect(linkEncontrado.originalUrl);
    } else {
      return res.redirect("/?erro=nao-encontrado");
    }
  } catch (error) {
    console.error("Erro no redirecionamento:", error);
    return res.status(500).json({ error: "Erro interno ao redirecionar" });
  }
}
