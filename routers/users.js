import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateUserDto from "../DTO's/user.dto.js";

const usersRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    document_type: String,
    document_number: Number,
    phone: Number,
    place: [{
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zip_code: {
            type: String,
            required: true
        }
    }],
    user_type: {
        type: String,
        required: true,
        enum: ['Comprador', 'Vendedor', 'Admin']
    },
    register_date: Date,
    active: Boolean 
});

const Users = mongoose.model('Users', userSchema);

const validations = [
    body('name')
        .exists()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser una cadena de texto'),
    body('email')
        .exists()
        .withMessage('El campo "email" es obligatorio')
        .isEmail()
        .withMessage('El campo "email" debe ser un email válido'),
    body('password')
        .exists()
        .withMessage('El campo "password" es obligatorio')
        .isString()
        .withMessage('El campo "password" debe ser una cadena de texto'),
    body('document_type')
        .exists()
        .withMessage('El campo "document_type" es obligatorio')
        .isIn(['cc', 'ce', 'pe'])
        .withMessage('El tipo de documento debe ser: cc, ce o pe'),
    body('document_number')
        .exists()
        .isInt()
        .withMessage('El numero de documento es obligatorio'),   
    body('phone')
        .exists()
        .isInt()
        .withMessage("El número de teléfono debe contener entre 7 y 15 dígitos"),   
    body('place')
        .exists()
        .isArray({ min: 4 })
        .withMessage("Debe ingresar una direccion"),
    body("place.*.city")
        .exists()
        .isString()
        .withMessage("Debe ingresaar una ciudad valida"),
    body("place.*.country")
        .exists()
        .isString()
        .withMessage("Debe ingresar un pais valido"),
    body("place.*.address")
        .exists()
        .isString()
        .withMessage("Debe ingresar una ciudad valida"),
    body("place.*.zip_code")
        .exists()
        .isString()
        .withMessage("Debe ingresar un zip code valido"),
    body("user_type")
        .exists()
        .isString()
        .isIn(['Comprador', 'Vendedor', 'Admin'])
        .withMessage('El tipo de documento debe ser: Comprador, Vendedor o Admin'),
    body('register_date')
        .exists()
        .withMessage('El campo "register_date" es obligatorio')
        .toDate(),
    body('active')
        .exists()
        .withMessage('El campo "active" es obligatorio')
        .isBoolean()
        .withMessage('El campo "active" debe ser un valor booleano (true/false)')
]

usersRouter.post("/", validations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    Users.insertOne({ ...new CreateUserDto(req.body), active: true })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err));
});

usersRouter.get('/', (req, res) => {
    Users.find({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

usersRouter.put('/:_id', (req, res) => {
    Users.updateOne(req.params, { $set: req.body })
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

usersRouter.delete('/', (req, res) => {
    Users.deleteOne({})
        .then((docs) => { res.send(docs) })
        .catch(err => res.send('error'));
});

export default usersRouter;