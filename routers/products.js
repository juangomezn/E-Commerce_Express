import express from 'express';
import { body, validationResult } from "express-validator";
import CreateProductDto from "../DTO's/product.dto.js";
import Product from "../models/Product.js";

const productRouter = express.Router();

const validations = [
  body('code').exists().isString(),
  body('name').exists().isString(),
  body('description').optional().isString(),
  body('images').exists().isString().isURL(),
  body('price').exists().isInt({ gt: 0 }),
  body('stock').exists().isInt({ min: 0 }),
  body('category').exists().isMongoId(),
  body('brand').exists().isString().isLength({ min: 2, max: 50 }),
  body('condition').exists().isIn(['new', 'used', 'refurbished']),
  body('vat').exists().isInt({ min: 0, max: 100 }),
  body('active').exists().isBoolean()
];

// GET all products
productRouter.get('/', async (req, res) => {
  console.log("📦 GET /products recibido");
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST product
productRouter.post('/', validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ errors: errors.array() });
  }

  try {
    const newProduct = new Product({ ...new CreateProductDto(req.body), active: true });
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

// PUT product by ID
productRouter.put('/:_id', async (req, res) => {
  try {
    const updated = await Product.updateOne({ _id: req.params._id }, { $set: req.body });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// DELETE product by ID
productRouter.delete('/:_id', async (req, res) => {
  try {
    const deleted = await Product.deleteOne({ _id: req.params._id });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

export default productRouter;
