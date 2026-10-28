const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 1. Schema & Model
const products_schema = new mongoose.Schema({
    id: String, 
    artist: String,
    title: String,
    cover: String,
    price: Number,
    hot: Boolean,
    bestSeller: Boolean
});

// Namai modelnya dengan 'Product' (tanpa s) agar sesuai dengan panggilan di bawah
const Product = mongoose.model('Product', products_schema, "products");

router.get('/', async (req, res) => {
    try {
        const all_product = await Product.find();
        res.json(all_product);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error : error.message });
    }
});

module.exports = router;