import express from 'express';
import { body, validationResult } from "express-validator";
import CreatePaymentMethodDto from "../DTO's/payment.method.dto.js";
import PaymentMethod from '../models/PaymentMethod.js';

const router = express.Router();

const validations = [
  body('code').exists().isString(),
  body('name').exists().isString(),
  body('active').exists().isBoolean()
];

router.post("/", validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(402).json({ errors: errors.array() });

  try {
    const nuevo = new PaymentMethod({ ...new CreatePaymentMethodDto(req.body), active: true });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (_req, res) => {
  const datos = await PaymentMethod.find();
  res.json(datos);
});

router.put("/:_id", async (req, res) => {
  await PaymentMethod.updateOne({ _id: req.params._id }, { $set: req.body });
  res.sendStatus(204);
});

router.delete("/:_id", async (req, res) => {
  await PaymentMethod.deleteOne({ _id: req.params._id });
  res.sendStatus(204);
});

export default router;
