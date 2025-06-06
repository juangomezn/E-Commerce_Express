import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateProductDto from "../DTO's/product.dto.js";

const productRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const productSchema = new mongoose.Schema({
    code: String,
    name: String,
    active: Boolean
});

const Product = mongoose.model('Product', productSchema);

const validations = [
    body('code').exists().withMessage('El código es obligatorio').isString().withMessage('El código debe ser una cadena de texto'),
    body('name').exists().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser una cadena de texto'),
    body('active').exists().withMessage('El campo "active" es obligatorio').isBoolean().withMessage('El campo "active" debe ser un valor booleano (true/false)')
]

productRouter.post("/", validations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    Product.insertOne({ ...new CreateProductDto(req.body), active: true })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err));
});

productRouter.get('/', (req, res) => {
    Product.find({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

productRouter.put('/:_id', (req, res) => {
    Product.updateOne(req.params, { $set: req.body })
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

productRouter.delete('/', (req, res) => {
    Product.deleteOne({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

export default productRouter;