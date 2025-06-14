import express from 'express';
import { body, validationResult } from "express-validator";
import CreateCategoryDto from '../DTO\'s/categories.dto.js';
import Category from '../models/Category.js';

const categoriesRouter = express.Router();

const validations = [
  body('code').exists().withMessage('El código es obligatorio').isString(),
  body('name').exists().withMessage('El nombre es obligatorio').isString(),
  body('active').exists().withMessage('El campo "active" es obligatorio').isBoolean()
];

categoriesRouter.post("/", validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newCategory = new Category(new CreateCategoryDto(req.body));
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

categoriesRouter.get('/:_id', async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

categoriesRouter.put('/:_id', async (req, res) => {
  try {
    const updated = await Category.updateOne({ _id: req.params._id }, { $set: req.body });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

categoriesRouter.delete('/:_id', async (req, res) => {
  try {
    const deleted = await Category.deleteOne({ _id: req.params._id });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default categoriesRouter;
