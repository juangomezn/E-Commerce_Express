import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateProductDto from "../DTO's/product.dto.js";
import { ObjectId } from "mongodb";

const productRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const productSchema = new mongoose.Schema({
    code: String,
    name: String,
    description: String,
    images: String,
    price: Number,
    stock: Number,
    category: mongoose.ObjectId,
    brand: String,
    condition: {
        type: String,
        required: true,
        enum: ['new', 'used', 'refurbished']
    },
    vat: Number,
    active: Boolean
});

const Product = mongoose.model('Product', productSchema);

const validations = [
    body('code')
        .exists()
        .withMessage('El código es obligatorio')
        .isString()
        .withMessage('El código debe ser una cadena de texto'),
    body('name')
        .exists()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser una cadena de texto'),
    body('description')
        .isString()
        .withMessage('La URL de la imagen es obligatoria'),
    body('images')
        .exists()
        .withMessage('La URL de la imagen es obligatoria')
        .isString()
        .withMessage('La URL de la imagen debe ser una cadena de texto')
        .isURL()
        .withMessage('Debe ser una URL válida'),
    body('price')
        .exists()
        .withMessage('El precio es obligatorio')
        .isInt({gt:0})
        .withMessage('El precio debe ser un número mayor a 0'),
    body('stock')
        .exists()
        .withMessage('El stock es obligatorio')
        .isInt({min:0})
        .withMessage('El stock debe ser un número entero mayor o igual a 0'),
    body('category')
        .exists()
        .withMessage('El categoryId es obligatorio')
        .isMongoId()
        .withMessage('El categoryId debe ser un ID valido'),
    body('brand')
        .exists()
        .withMessage('La marca es obligatoria')
        .isString()
        .withMessage('La marca debe ser una cadena de texto')
        .isLength({ min: 2, max: 50 })
        .withMessage('La marca debe tener entre 2 y 50 caracteres'),   
    body('condition')
        .exists()
        .withMessage('La condición es obligatoria')
        .isString()
        .withMessage('La condición debe ser una cadena de texto')
        .isIn(['new', 'used', 'refurbished'])
        .withMessage('La condición debe ser: new, used o refurbished'),
    body('vat')
        .exists()
        .withMessage('El VAT es obligatorio')
        .isInt({ min: 0, max: 100 })
        .withMessage('El VAT debe ser un número entre 0 y 100'),
    body('active')
        .exists()
        .withMessage('El campo "active" es obligatorio')
        .isBoolean()
        .withMessage('El campo "active" debe ser un valor booleano (true/false)')
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