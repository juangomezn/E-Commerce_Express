import express from "express";
import "dotenv/config";
import {categories, payment_methods, users, sales, products} from "./routers/index.js"
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', users)
app.use('/products', products);
app.use('/categories', categories);
app.use('/payment_methods', payment_methods)
app.use('/sales', sales)

app.listen({
    hostname: process.env.APP_HOSTNAME,
    port: process.env.APP_PORT
}, 
() => console.log(`Server is running on http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`))