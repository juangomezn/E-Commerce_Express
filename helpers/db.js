import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("✅ Conectado a la base de datos");
  } catch (error) {
    console.error(`❌ Error al conectar la base de datos: ${error}`);
    throw error;
  }
};

export default connectDB;
