import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testarConexao() {
  console.log("⏳ Tentando conectar ao MongoDB...");

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ ERRO: A variável MONGODB_URI não foi encontrada no .env");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ SUCESSO! Conexão estabelecida com o MongoDB Atlas.");
    console.log("🚀 Seu banco está pronto para receber dados.");
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ FALHA NA CONEXÃO:");
    console.error(error.message);

    if (error.codeName === "BadAuth") {
      console.log(
        "💡 Dica: Verifique se o usuário e a senha no .env estão corretos.",
      );
    } else if (
      error.code === "ECONNREFUSED" ||
      error.name === "MongoServerSelectionError"
    ) {
      console.log(
        "💡 Dica: Verifique se você liberou o IP '0.0.0.0/0' lá no site do MongoDB (Network Access).",
      );
    }
  }
}

testarConexao();
