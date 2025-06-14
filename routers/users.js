import express from 'express';
import { body, validationResult } from "express-validator";
import CreateUserDto from "../DTO's/user.dto.js";
import User from "../models/User.js";

const router = express.Router();

const validations = [
  body('name').exists().isString(),
  body('email').exists().isEmail(),
  body('password').exists().isString(),
  body('document_type').exists().isIn(['cc', 'ce', 'pe']),
  body('document_number').exists().isInt(),
  body('phone').exists().isInt(),
  body('place').exists().isArray({ min: 1 }),
  body('place.*.city').exists().isString(),
  body('place.*.country').exists().isString(),
  body('place.*.address').exists().isString(),
  body('place.*.zip_code').exists().isString(),
  body('user_type').exists().isIn(['Comprador', 'Vendedor', 'Admin']),
  body('register_date').exists().toDate(),
  body('active').exists().isBoolean()
];

router.post("/", validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(402).json({ errors: errors.array() });

  try {
    const nuevo = new User({ ...new CreateUserDto(req.body), active: true });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put('/:_id', async (req, res) => {
  await User.updateOne({ _id: req.params._id }, { $set: req.body });
  res.sendStatus(204);
});

router.delete('/:_id', async (req, res) => {
  await User.deleteOne({ _id: req.params._id });
  res.sendStatus(204);
});

export default router;
