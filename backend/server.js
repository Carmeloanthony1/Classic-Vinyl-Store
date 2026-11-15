require("dotenv").config({path: '../.env'});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const passport = require("passport");
require("./config/passport"); 

const port = process.env.PORT;

const productRoutes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize()); 

//connect to database
mongoose.connect((process.env.MONGO_URL))
 .then(() => console.log("Terhubung ke MongoDB"))
 .catch((err) => console.log("Gagal terhubung ke MongoDB", err.message));

app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});