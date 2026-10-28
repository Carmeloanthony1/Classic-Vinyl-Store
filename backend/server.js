require("dotenv").config({path: '../.env'});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;

const product = require('./routes');
//biar bisa baca .env
const app = express();

app.use(cors());
app.use(express.json());

//connect to database
mongoose.connect((process.env.MONGO_URL))
 .then(() => console.log("Terhubung ke MongoDB"))
 .catch((err) => console.log("Gagal terhubung ke MongoDB", err.message));

app.use('/api', product);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});