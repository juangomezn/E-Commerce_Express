import express from 'express';
import { body, validationResult } from "express-validator";
import CreateSaleDto from "../DTO's/sale.dto.js";
import Sale from "../models/Sale.js";

const router = express.Router();

const validations = [
  body('reference').isString().isLength({ min: 3, max: 30 }),
  body('date').exists().toDate(),
  body('paymentMethod').exists().isMongoId(),
  body('client').exists().isMongoId(),
  body('seller').exists().isMongoId(),
  body('saledetails').isArray({ min: 1 }),
  body("saledetails.*.product").isString(),
  body("saledetails.*.quantity").isInt({ min: 1 }),
  body("saledetails.*.price").isFloat({ min: 0 })
];

router.post("/", validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(402).json({ errors: errors.array() });

  try {
    const nuevaVenta = new Sale(new CreateSaleDto(req.body));
    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (_req, res) => {
  const ventas = await Sale.find();
  res.json(ventas);
});

router.put("/:_id", async (req, res) => {
  await Sale.updateOne({ _id: req.params._id }, { $set: req.body });
  res.sendStatus(204);
});

router.delete("/:_id", async (req, res) => {
  await Sale.deleteOne({ _id: req.params._id });
  res.sendStatus(204);
});

export default router;
