const express = require("express");
const app = express.app();
const product = require();
const mongoose = require("mongoose");

const products_schema = new mongoose.Schema({
    id: String, 
    artist: String,
    title: String,
    cover: String,
    price: Number,
    hot: Boolean,
    bestSeller: Boolean
});

const product = mongoose.model('Product', products_schema, "products");

app.get('/api/products', async (req, res) => {
    try {
        const all_product = await product.find();

        res.json(all_product);
    } catch (error) {
        res.json(500).json({ message: "Gagal mengambil data", error : error.message });
    }
});

app.listen(port, () => {
    console.log("Server berjalan")
})