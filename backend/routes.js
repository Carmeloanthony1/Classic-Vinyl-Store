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

const category_schema = new mongoose.Schema({
    name: String,
    imageBanner: String
});

// Namai modelnya dengan 'Product' (tanpa s) agar sesuai dengan panggilan di bawah
const Product = mongoose.model('Product', products_schema, "products");
const Category = mongoose.model('Category', category_schema, "categories");

router.get('/products', async (req, res) => {
    try {
        const all_product = await Product.find();
        res.json(all_product);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data album", error : error.message });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const all_genre = await Category.find();
        res.json(all_genre);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error : error.message});
    }
});
module.exports = router;