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
    category_name: String,
    bestSeller: Boolean
});

const category_schema = new mongoose.Schema({
    name: String,
    imageBanner: String
});

const song_schema = new mongoose.Schema({
    title: String,
    album_id: String
});

// Namai modelnya dengan 'Product' (tanpa s) agar sesuai dengan panggilan di bawah
const Product = mongoose.model('Product', products_schema, "products");
const Category = mongoose.model('Category', category_schema, "categories");
const Song = mongoose.model('Song', song_schema, "songs");

router.get('/products', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category && category.trim() !== ""){
            query.category_name = category
        }

        if (search){
            query.title = { $regex: search, $options: 'i' }
        }
        //nanti si category yang ada di paramter url akan menjadi query yang kemudian akan di cocokin
        //sama nama category di db, kalau ada nanti dia cariin datanya
        const all_product = await Product.find(query).sort({ bestSeller: -1});
        //biar nanti yang best seller tetap di paling kiri 
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

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({ 
                message: "Gagal mengambil data detail produk" 
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail produk",
            error: error.message
        });
    }
});

router.get('/products/:id/songs', async (req, res) => {
    try {
        const { id } = req.params;
        const lagu_album = await Song.find({ album_id: id});
        res.json(lagu_album);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil list album", 
            error: error.message
        });
    }
});

module.exports = router;