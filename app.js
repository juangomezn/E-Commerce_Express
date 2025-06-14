import express from "express";
import connectDB from "./helpers/db.js";
import "dotenv/config";
import bodyParser from "body-parser";
import { categories, payment_methods, users, sales, products } from "./routers/index.js";
import cors from "cors";

connectDB();

const app = express();

// Configurar CORS para permitir peticiones desde Vite (React)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/users", users);
app.use("/products", products);
app.use("/categories", categories);
app.use("/payment_methods", payment_methods);
app.use("/sales", sales);

// Iniciar el servidor
const HOST = process.env.APP_HOSTNAME || "localhost";
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`✅ Server is running on http://${HOST}:${PORT}`);
});
