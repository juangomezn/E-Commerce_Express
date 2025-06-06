import express from "express";
import "dotenv/config";
import {categories, payment_methods, users, sales, products} from "./routers/index.js"

const app = express();

app.use('/users', users)
app.use('/products', products);
app.use('/categories', categories);
app.use('/payment_methods', payment_methods)
app.use('/sales', sales)

app.listen({
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT
}, 
() => console.log(`Server is running on http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`))