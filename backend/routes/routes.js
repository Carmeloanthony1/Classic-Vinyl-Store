const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verify_token } = require("../middleware/auth");
//buat jadi object, soalnya kita akan pakai di banyak fungsi nantinya

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

const user_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    refresh_token: String
});

const Product = mongoose.model('Product', products_schema, "products");
const Category = mongoose.model('Category', category_schema, "categories");
const Song = mongoose.model('Song', song_schema, "songs");
const User = mongoose.model('User', user_schema, "users");

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

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        const new_user = new User({ name, email, password: hashed_password });
        await new_user.save();
        res.status(201).json({ message: "Pendaftaran Berhasil" });
    } catch (error) {
        res.status(500).json({ message: "Gagal mendaftar", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "email belum terdaftar" });
        }
        
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(400).json({ message: "Password belum sesuai"});
        }

        const access_token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m"}   
        );

        const refresh_token = jwt.sign(
          { id: user._id },
          process.env.JWT_REFRESH_SECRET, 
          { expiresIn: "7d"}
        );

        user.refresh_token = refresh_token;
        await user.save();
        //buat update ke db
        
        res.status(200).json({ 
            message: "Login Berhasil", 
            refresh_token: refresh_token,
            access_token: access_token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal login", error: error.message });
    }
    
});


router.post('/refresh-token', async (req, res) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) return res.status(401).json({ message: "Refresh token tidak ada"});
        
        const user = await User.findOne({ refresh_token: refresh_token});
        if(!user) return res.status(403).json({message: "Refresh token tidak valid, silahkan login"});

        jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Refresh token kadarluasa" });

            const newaccesstoken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIN: "15m" }
            );

            res.status(200).json({ access_token: newaccesstoken });
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal refresh token", error: error.message });
    }
});
module.exports = router;