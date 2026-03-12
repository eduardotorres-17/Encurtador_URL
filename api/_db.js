import mongoose from 'mongoose';

let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    console.log("⚡ Usando conexão de banco existente (Cache)");
    return cachedConnection;
  }

  console.log("🔌 Criando nova conexão com o MongoDB...");

  if (!process.env.MONGODB_URI) {
    throw new Error('Por favor, defina a variável MONGODB_URI no .env');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
     
      serverSelectionTimeoutMS: 5000,
    });

    cachedConnection = db;
    console.log("✅ Conectado ao MongoDB!");
    return db;
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    throw error;
  }
}