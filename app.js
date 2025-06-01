import express from "express";
import "dotenv/config";
import {
    categories,
    cities,
    countries,
    payment_methods,
    users,
    sales,
    sales_details,
    products,
} from "./routers/index.js"

const app = express();

app.use('/categories', categories);
app.use('/cities', cities);
app.use('/countries', countries)
app.use('/payment_methods', payment_methods)
app.use('/users', users)
app.use('/sales', sales)
app.use('/sales_details', sales_details)
app.use('/products', products);

app.listen({
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT
}, 
() => console.log(`Server is running on http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`))