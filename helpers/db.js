const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ Conectado a la base de datos");
        return client.db(process.env.DB_URL)
    } catch (error) {
        console.log(`❌ Error al conectar la base de datos: ${error}`);
        throw error
    }
};

export default connectDB;