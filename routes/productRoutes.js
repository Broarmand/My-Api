const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.use(authenticate);
router.use(authorize('admin'));

// Create a new product (POST /api/products)
router.post('/', async (req, res) => {
    const products = new Product({
        productName: req.body.productName,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
    });

    try {
        const newProduct = await products.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// // Get all products (GET /api/products)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get a single product by ID (GET /api/products/:id)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a product (PATCH /api/products/:id)
router.patch('/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product (DELETE /api/products/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
