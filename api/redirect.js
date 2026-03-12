import { connectToDatabase } from "./_db.js";
import Link from "./model.js";

export default async function handler(req, res) {
  await connectToDatabase();

  let code = req.query?.code;

  if (!code || code === "") {
    if (req.url.includes("?code=")) {
      code = req.url.split("?code=")[1].split("&")[0];
    } else {
      const pathCode = req.url.split("?")[0].replace("/", "");
      if (pathCode !== "api/redirect") {
        code = pathCode;
      }
    }
  }

  if (!code || code === "") {
    return res.redirect("/?erro=codigo-vazio");
  }

  try {
    const linkEncontrado = await Link.findOne({ code: code });

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
