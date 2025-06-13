import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateSaleDto from "../DTO's/sale.dto.js";

const salesRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const salesSchema = new mongoose.Schema({
    reference: String,
    date: Date,
    paymentMethod: {
        type: Types.ObjectId,
        ref: 'payment_methods',
        required: true
    },
    client: {
        type: Types.ObjectId,
        ref: 'users',
        required: true
    },
    seller: {
        type: Types.ObjectId,
        ref: 'users',
        required: true
    },
    saledetails: [{
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }]
});

const Sales = mongoose.model('Sales', salesSchema);

const validations = [
    body('reference')
        .isString().withMessage('La referencia debe ser una cadena de texto')
        .isLength({ min: 3, max: 30 }).withMessage('La referencia debe tener entre 3 y 30 caracteres'),
    body('date')
        .exists().withMessage('La fecha es obligatoria')
        .toDate(),
    body('payment_Method')
        .exists()
        .withMessage('El metodo de pago es obligatorio')
        .isMongoId()
        .withMessage('El metodo de pago debe ser un identificador válido'),
    body('client')
        .exists()
        .withMessage('El cliente es obligatorio')
        .isString()
        .withMessage('El cliente debe ser una cadena de texto')
        .isMongoId()
        .withMessage('El cliente debe ser un identificador válido'),
    body('seller')
        .exists()
        .withMessage('El vendedor es obligatorio')
        .isString()
        .withMessage('El vendedor debe ser una cadena de texto')
        .isMongoId()
        .withMessage('El vendedor debe ser un identificador válido'),
    body("saledetails")
        .isArray({ min: 3 })
        .withMessage("Debe haber al menos un producto en la venta"),
    body("saledetails.*.product")
        .isString()
        .withMessage("Debe ingresar un producto valido"),
    body("saledetails.*.quantity")
        .isInt({ min: 1 })
        .withMessage("La cantidad debe ser un número entero mayor a 0"),
    body("saledetails.*.price")
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número positivo"),
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