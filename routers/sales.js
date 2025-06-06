import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateSaleDto from "../DTO's/sale.dto.js";

const salesRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const salesSchema = new mongoose.Schema({
    code: String,
    name: String,
    active: Boolean
});

const Sales = mongoose.model('Sales', salesSchema);

const validations = [
    body('code').exists().withMessage('El código es obligatorio').isString().withMessage('El código debe ser una cadena de texto'),
    body('name').exists().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser una cadena de texto'),
    body('active').exists().withMessage('El campo "active" es obligatorio').isBoolean().withMessage('El campo "active" debe ser un valor booleano (true/false)')
]

salesRouter.post("/", validations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    Sales.insertOne({ ...new CreateSaleDto(req.body), active: true })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err));
});

salesRouter.get('/', (req, res) => {
    Sales.find({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

salesRouter.put('/:_id', (req, res) => {
    Sales.updateOne(req.params, { $set: req.body })
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

salesRouter.delete('/', (req, res) => {
    Sales.deleteOne({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

export default salesRouter;