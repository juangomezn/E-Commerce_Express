import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreatePaymentMethodDto from "../DTO's/payment.method.dto";

const payment_methodsRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const payment_methodsSchema = new mongoose.Schema({
    code: String,
    name: String,
    active: Boolean
});

const payment_methods = mongoose.model('payment_methods', payment_methodsSchema);

const validations = [
    body('code').exists().withMessage('El código es obligatorio').isString().withMessage('El código debe ser una cadena de texto'),
    body('name').exists().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser una cadena de texto'),
    body('active').exists().withMessage('El campo "active" es obligatorio').isBoolean().withMessage('El campo "active" debe ser un valor booleano (true/false)')
]

payment_methodsRouter.post("/", validations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    payment_methods.insertOne({ ...new CreatePaymentMethodDto(req.body), active: true })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err));
});

payment_methodsRouter.get('/', (req, res) => {
    payment_methods.find({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

payment_methodsRouter.put('/:_id', (req, res) => {
    payment_methods.updateOne(req.params, { $set: req.body })
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

payment_methodsRouter.delete('/', (req, res) => {
    payment_methods.deleteOne({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

export default payment_methodsRouter;