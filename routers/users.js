import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import CreateUserDto from "../DTO's/user.dto.js";

const usersRouter = express.Router();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const userSchema = new mongoose.Schema({
    code: String,
    name: String,
    active: Boolean
});

const Users = mongoose.model('Users', userSchema);

const validations = [
    body('code').exists().withMessage('El código es obligatorio').isString().withMessage('El código debe ser una cadena de texto'),
    body('name').exists().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser una cadena de texto'),
    body('active').exists().withMessage('El campo "active" es obligatorio').isBoolean().withMessage('El campo "active" debe ser un valor booleano (true/false)')
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