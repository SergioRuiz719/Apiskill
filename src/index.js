const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/user');
const consejoRoutes = require('./routes/consejo');
const estrategiaRoutes = require('./routes/estrategia');
const userdifestyleRoutes = require('./routes/userdifest');
const ejercicioRoutes = require('./routes/ejercicio');
const tareaRoutes = require('./routes/tarea.js');

const app = express();
const port = process.env.PORT;


//middleware
app.use(express.json());
app.use(cors());


// Rutas
app.use('api/', userRoutes);
app.use('api/', consejoRoutes);
app.use('api/', estrategiaRoutes);
app.use('api/', userdifestyleRoutes);
app.use('api/', ejercicioRoutes);
app.use('api/', tareaRoutes);

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected to Mongoose Atlas"))
.catch((error)=> console.error(error));

app.listen(port, () => console.log('listening on port ', port))
