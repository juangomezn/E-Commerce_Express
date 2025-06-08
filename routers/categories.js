import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateCategoryDto from '../DTO\'s/categories.dto.js';

const categoriesRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const categorySchema = new mongoose.Schema({
    code: String,
    name: String,
    active: Boolean
});

const Category = mongoose.model('category', categorySchema);

const validations = [
    body('code').exists().withMessage('El código es obligatorio').isString().withMessage('El código debe ser una cadena de texto'),
    body('name').exists().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser una cadena de texto'),
    body('active').exists().withMessage('El campo "active" es obligatorio').isBoolean().withMessage('El campo "active" debe ser un valor booleano (true/false)')
]

categoriesRouter.post("/", validations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    Category.insertOne({ ...(new CreateCategoryDto(req.body)), active: true })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err));
});

categoriesRouter.get('/', (req, res) => {
    Category.find({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

categoriesRouter.put('/:_id', (req, res) => {
    Category.updateOne(req.params, { $set: req.body })
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

categoriesRouter.delete('/', (req, res) => {
    Category.deleteOne({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

export default categoriesRouter;