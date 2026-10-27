require("dotenv").config({path: '../.env'});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;


//biar bisa baca .env
const app = express();
const products_schema = new mongoose.Schema({
    id: String, 
    artist: String,
    title: String,
    cover: String,
    price: Number,
    hot: Boolean,
    bestSeller: Boolean
})

const product = mongoose.model('Product', products_schema, "products");

app.use(cors());
app.use(express.json());

//connect to database
mongoose.connect((process.env.MONGO_URL))
 .then(() => console.log("Terhubung ke MongoDB"))
 .catch((err) => console.log("Gagal terhubung ke MongoDB"));

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});