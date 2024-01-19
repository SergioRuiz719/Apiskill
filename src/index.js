const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const userRoutes = require('./routes/user');
const consejoRoutes = require('./routes/consejo');
const estrategiaRoutes = require('./routes/estrategia');
const userdifestyleRoutes = require('./routes/userdifest');

const app = express();
const port = process.env.PORT;


//middleware
app.use(express.json());
app.use('/api', userRoutes, consejoRoutes, estrategiaRoutes, userdifestyleRoutes);

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
  });

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected to Mongoose Atlas"))
.catch((error)=> console.error(error));

app.listen(port, () => console.log('listening on port ', port))
