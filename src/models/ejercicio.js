const mongoose = require('mongoose');

const ejercicioSchema = mongoose.Schema({

id_estilo: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
},

Ejercicio: {
    type: String,
    required: true,
},
});

module.exports = mongoose.model('Ejercicio', ejercicioSchema);