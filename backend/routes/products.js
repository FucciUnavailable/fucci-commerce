const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add new product (Admin)
router.post('/addProduct', isAdmin, async (req, res) => {
  const { name, price, description, imageUrl, category, stock } = req.body;
  console.log("route")
  try {
    const newProduct = new Product({ name, price, description, imageUrl, category, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');  // Get unique categories
    res.json(categories);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Find product by ID
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);  // Send the product as a response
  } catch (err) {
    res.status(400).send(err);  // Handle errors
  }
});

// DELETE product by ID (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE product by ID (Admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      { ...req.body }, 
      { new: true }  // Return the updated product
    );
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
